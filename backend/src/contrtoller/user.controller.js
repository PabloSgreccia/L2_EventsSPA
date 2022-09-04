require('dotenv').config();
const User = require('../database/models/').user
const Event = require('../database/models/').event
const Users_events = require('../database/models/').users_events
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {
    validationMail,
    passRecovery
} = require('../contrtoller/mail.controller');
const {
    Op,
    and
} = require('sequelize');
//API

const showAll = async (req, res) => {
    let users = await User.findAll({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        },
        where: {
            active: true
        }
    })
    return res.status(200).json({
        users
    })
};

const pendingValidationUser = async (req, res) => {
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
}

const show = async (req, res) => {
    const id = req.params.id
    let user = await User.findOne({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
        },
        where: {
            id: id
        }
    });
    if(!user.photo){
        user.photo = 'http://localhost:3000/images/defUser.png'
    }
    if (user) {
        return res.status(200).json({
            user
        })
    } else {
        return res.status(404).json({
            'msg': 'usuario no encontrado'
        })
    }
};

const register = async (req, res) => {
    let params = req.body;
    let validationCode = (Math.random() + 1).toString(36)
    params.password = await bcrypt.hash(req.body.password, 10);
    let user = await User.create({
        name: params.name,
        email: params.email,
        password: params.password,
        validationCode: validationCode
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
            'msg': 'No se recibieron los datos'
        })
    }
};

const validationUser = async (req, res) => {
    const validationCode = req.params.code
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
            res.status(200).json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                validated: user.validated,
                'msg': 'Se actualizó correctamente'
            })
        })
    }

}

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body
    //Comprobar email en DB
    User.findOne({
            where: {
                email: email,
                active: true
            }
        })
        .then(user => {
            if (!user) {
                //Email invalido
                res.status(404).json({
                    msg: 'Usuario y/o contraseña incorrecta'
                })
            } else if (bcrypt.compareSync(password, user.password)) {
                //Seteo un Token
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
                //Acceso denegado - Usuario y/o contraseña invalidos
                return res.status(401).json({
                    msg: 'Usuario y/o contraseña incorrecta'
                })
            }
        }).catch(err => {
            //Fallo al buscar el email en la base de datos
            return res.status(500).json(err.message)
        })
}
const userjoinevent = async (req, res) => {
    const userId = req.userId;
    const eventId = req.body.idEvent

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
            msg: "error no se pudo anotar"
        })
    }
}

const userleftevent = async (req, res) => {
    const userId = req.userId;
    const eventId = req.params.idEvent
    const userEvent = await Users_events.findOne({
        attributes: ['userId', 'eventId'],
        where: {
            userId: userId,
            eventId: eventId
        }
    })
    if (!userEvent) {
        return res.status(404).json({
            msg: "No se completo la operación"
        })
    } else {
        userEvent.destroy().then(userEvent => {
            res.status(200).json({
                userEvent
            })
        })
    }
}

const updatePass = async (req, res) => {
    const oldPass = req.body.oldPassword
    const password = await bcrypt.hash(req.body.newPassword, 10)
    const id = req.userId;
    let user = await User.findOne({
        where: {
            id: id
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
}

const updateUser = async (req, res) => {
    const {
        name,
        active,
        validated
    } = req.body;
    const id = req.userId;
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    if (!user) {
        return res.status(404).json({
            msg: "Usuario no encontrado"
        })
    } else {

        user.update({
            name,
            active,
            validated
        }).then(user => {
            res.status(200).json({
                user,
                'msg': 'Se actualizó correctamente'
            })
        })
    }
}

const downUser = async (req, res) => {
    const id = req.userId;
    const active = req.body.active;
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    if (!user) {
        return res.status(404).json({
            msg: "Usuario no encontrado"
        })
    } else {
        user.update({
            active
        }).then(user => {
            res.status(200).json({
                user,
                'msg': 'Se actualizó correctamente'
            })
        })
    }
}

const destroy = async (req, res) => {
    const id = req.params.id;
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    if (!user) {
        return res.status(404).json({
            msg: "Usuario no encontrado"
        })
    } else {
        user.destroy().then(user => {
            res.status(200).json({
                user
            })
        })
    }
};

const logOut = async (req, res, next) => {
    //Eliminar cookie jwt
    res.clearCookie('jwt')
    //Redirigir a la vista de login
    res.status(200).json({
        msg: 'sesion terminada'
    })
};

const favouriteUser = async (req, res) => {
    const idEvent = req.body.idEvent
    const idUser = req.body.idUser
    const idUser_admin = req.userId
    const favourite=req.body.favourite
    const event=await Event.findOne({
        where:{
            id:idEvent
        }
    })
    if (!event) {
        return res.status(404).json({msg:'Evento no encontrado'})
    }
    if(event.idUser_admin!=idUser_admin){
        return res.status(404).json({msg:'Solo el creador del evento puede realizar esta acción'})
    }
    
    const users_events = await Users_events.findOne({
        attributes: ['userId', 'eventId'],
        where: {
            userId: idUser,
            eventId: idEvent
        }
    })
    if (!users_events) {
        return res.status(404).json({msg:'No se encontraron datos'})
    }
    await users_events.update({
        favourite
    })
    return res.status(200).json({'msg':'Añadido a favoritos'})
}

const showLogged = async (req, res) => {
    const id = req.userId
    let user = await User.findOne({
        attributes: {
            exclude: ['password','createdAt', 'updatedAt']
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
};

const forgot = async(req,res)=>{
    const email=req.body.email
    const user=await User.findOne({
        where:{
            email:email
        }
    })
    if (!user) {
        return res.status(404).json({msg:'NO hay ningún usuario registrado con ese mail'})
    }
    const newPass =user.name.toUpperCase()+(Math.random() + 1).toString(36)
    const password = await bcrypt.hash(newPass, 10);
    await user.update({
        password
    })
    try {
        await passRecovery(user,newPass)
    } catch (error) {
        console.log(error)
    }
   
    return res.status(200).json({msg:'Correo enviado'})


}


module.exports = {
    showAll,
    pendingValidationUser,
    show,
    register,
    login,
    userjoinevent,
    userleftevent,
    validationUser,
    updatePass,
    updateUser,
    downUser,
    destroy,
    logOut,
    favouriteUser,
    showLogged,
    forgot
};