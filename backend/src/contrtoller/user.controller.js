require('dotenv').config();
const User = require('../database/models/').user
const Event = require('../database/models/').event
const Users_events = require('../database/models/').users_events
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { validationMail, passRecovery } = require('../contrtoller/mail.controller');
const { Op, and, where } = require('sequelize');
const formidable = require('formidable');

// List all users
const showAll = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role'],
            where: {
                active: true
            }
        })
        return res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

};

// List users which validation === 2 (pendign status)
const pendingValidationUser = async (req, res) => {
    try {
        let users = await User.findAll({
            where: {
                validated: 2
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
        })
        return res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// List one user
const show = async (req, res) => {
    try {
        const id = req.params.id
        let user = await User.findOne({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            where: {
                id: id
            }
        });
        if (user) {
            return res.status(200).json({
                user
            })
        } else {
            return res.status(404).json({
                'msg': 'usuario no encontrado'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// Sign up new user
const register = async (req, res) => {
    let params = req.body;

    try {
        let validationCode = (Math.random() + 1).toString(36)
        params.password = await bcrypt.hash(req.body.password, 10);
        photo = 'https://thumbsnap.com/s/WeDacXjq.jpg'
        let user = await User.create({
            name: params.name,
            email: params.email,
            password: params.password,
            validationCode: validationCode,
            photo: photo
        })
        if (user) {
            try {
                await validationMail(user)
            } catch (error) {
                console.log(error)
            }
            return res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                validated: user.validated,
                'msg': 'Se creó correctamente'
            })
        } else {
            return res.status(404).json({
                'msg': 'No pudo crear el usuario'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

};

// Update user photo
const uploadPhoto = async (req, res) => {
    
console.log(req.body);
    try {
        let photo= process.env.PHOTO+req.file.path.substr(req.file.path.lastIndexOf('images'))
        const id = req.userId
        const user = await User.findOne({
            where: {
                id: id
            }
        })
        if (!user) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
        await user.update({
            photo
        })
        return res.status(200).json({msg:'Foto agregada correctamente'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// Validate user via email
const validationUser = async (req, res) => {
    const validationCode = req.params.code   
    console.log(validationCode);
    try {
        const user = await User.findOne({
            where: {
                validationCode: validationCode
            }
        })
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            })
        } else {
            user.update({
                active: true,
                validationCode: ""
            }).then(user => {
                return res.redirect(process.env.FRONTEND)
            })
        } 
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// Log in
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        //Check email in DB
        User.findOne({
                where: {
                    email: email,
                    active: true
                }
            })
            .then(user => {
                if (!user) {
                    //Invalid email
                    res.status(404).json({
                        msg: 'Usuario y/o contraseña incorrecta'
                    })
                } else if (bcrypt.compareSync(password, user.password)) {
                    //Set a Token
                    let token = jwt.sign({
                        id: user.id,
                        role: user.role
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "8h"
                    })
                    return res.status(200).json({
                        token
                    })
                } else {
                    //Access denied - Invalid login and/or password
                    return res.status(404).json({
                        msg: 'Usuario y/o contraseña incorrecta'
                    })
                }
            }).catch(err => {
                //Failed to search for the email in the database
                return res.status(400).json(err.message)
            })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}

// User joins an event
const userjoinevent = async (req, res) => {
    const userId = req.userId;
    const eventId = req.body.idEvent

    try {
        const join = await Users_events.create({
            userId,
            eventId
        })
        if (join) {
            return res.status(200).json({
                msg: "usuario anotado al evento"
            })
        } else {
            return res.status(404).json({
                msg: "error, no se completó la operación"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// User left an event
const userleftevent = async (req, res) => {
    const userId = req.userId;
    const eventId = req.params.idEvent
    try {
        const userEvent = await Users_events.findOne({
            where: {
                userId: userId,
                eventId: eventId
            }
        })
        if (!userEvent) {
            return res.status(404).json({
                msg: "Relación entre evento y usuario no encontrada"
            })
        } else {
            userEvent.destroy().then(userEvent => {
                res.status(200).json({
                    msg: "Usuario salió del evento"
                })
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// User update password
const updatePass = async (req, res) => {
    const oldPass = req.body.oldPassword

    try {
        const password = await bcrypt.hash(req.body.newPassword, 10)
        const id = req.userId;
        let user = await User.findOne({
            where: {
                id: id,
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            })
        } else {
            await user.update({
                password
            }).then(user => {
                res.status(200).json({
                    user,
                    'msg': 'Contraseña actualizada correctamente'
                })
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}

// User update name
const updateUser = async (req, res) => {
    const { name, active, validated } = req.body;
    const id = req.userId;

    try {
        let user = await User.findOne( {where: { id: id }});
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" })
        } else {
            user.update({ name, active, validated }).then(user => {
                res.status(200).json({ user, 'msg': 'Se actualizó correctamente'})
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}

// Admin updates verify status for user
const updateUserVerify = async (req, res) => {
    const { idUser, validated } = req.body;

    try {
        let user = await User.findOne( {where: { id: idUser }});
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" })
        } else {
            user.update({ idUser, validated }).then(user => {
                res.status(200).json({ user, 'msg': 'Se actualizó correctamente'})
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}

// user delete its own account (this method doesnt delete the registed... it only "desactivate" it)
const downUser = async (req, res) => {
    const id = req.userId;
    const active = req.body.active;
    
    try {
        let user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" })
        } else {
            Event.update({ cancelled: true }, { where: { idUser_admin: id }})
            user.update({ active })
            .then(user => {
                res.status(200).json({ 'msg': 'Se actualizó correctamente' })
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}
// user delete its own account (this method doesnt delete the registed... it only "desactivate" it)
const downUserByAdmin = async (req, res) => {
    const id = req.params.id;
    const active = req.body.active;
    
    try {
        let user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" })
        } else {
            Event.update({ cancelled: true }, { where: { idUser_admin: id }}).then(
                Users_events.destroy({where: {userId: id}})
                    .then(user.update({ active })
                        .then(user => { res.status(200).json({ 'msg': 'Se desactivó el usuario' })
                    })
                )
            )
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// User log ut --> deprecated
const logOut = async (req, res, next) => {
    try {
        //Eliminar cookie jwt
        res.clearCookie('jwt')
        res.status(200).json({
            msg: 'sesion terminada'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// Event owner indicates to fav an user
const favouriteUser = async (req, res) => {
    const idEvent = req.body.idEvent
    const idUser = req.body.idUser
    const idUser_admin = req.userId
    const favourite = req.body.favourite

    try {
        const event = await Event.findOne({ where: { id: idEvent } })
        if (!event) {
            return res.status(404).json({ msg: 'Evento no encontrado'})
        }
        if (event.idUser_admin != idUser_admin) {
            return res.status(401).json({ msg: 'Solo el creador del evento puede realizar esta acción'})
        }
    
        const users_events = await Users_events.findOne({
            where: { userId: idUser, eventId: idEvent }
        })
        if (!users_events) {
            return res.status(405).json({ msg: 'No se encontró relacion entre el usuario y el evento' })
        }
        await users_events.update({ favourite })
        return res.status(200).json({ 'msg': 'Añadido a favoritos'})
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}

// Get information about looged user
const showLogged = async (req, res) => {
    const id = req.userId

    try {
        let user = await User.findOne({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            },
            where: {
                id: id
            },
        });
        if (user) {
            return res.status(200).json({
                user
            })
        } else {
            return res.status(404).json({
                'msg': 'usuario no encontrado'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// Send email when a user forgot his password
const forgot = async (req, res) => {
    const email = req.body.email
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) { 
            return res.status(404).json({ msg: 'Email no encontrado' }) 
        }
        // Generate new random password
        const newPass = user.name.toUpperCase() + (Math.random() + 1).toString(36)
        const password = await bcrypt.hash(newPass, 10);
        await user.update({ password })
        try { 
            await passRecovery(user, newPass)
        } catch (error) {
            console.log(error)
        }
        return res.status(200).json({
            msg: 'Email sent'
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: error
        })
    }
}


module.exports = {
    showAll,
    pendingValidationUser,
    show,
    register,
    uploadPhoto,
    login,
    userjoinevent,
    userleftevent,
    validationUser,
    updatePass,
    updateUser,
    updateUserVerify,
    downUser,
    downUserByAdmin,
    logOut,
    favouriteUser,
    showLogged,
    forgot
};