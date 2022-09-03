require('dotenv').config();
const User = require('../database/models/').user
const Event = require('../database/models/').event
const Type = require('../database/models/').type
const Users_events = require('../database/models/').users_events
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const {
    validationMail
} = require('../contrtoller/mail.controller');
const {
    Sequelize
} = require('../database/models/');
const formidable = require('formidable');

const showAll = async (req, res) => {
    let events = await Event.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
            include: [
                [Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM eventos.users_events AS uev
                        WHERE
                            uev.eventid = 1
                        )`),
                    'cantPeople'
                ]
            ]
        },
        include: [{
            model: User,
            attributes: ['name', 'id', 'photo'],
        }, {
            model: Type,
            attributes: ['type']
        }]
    })
    return res.status(200).json({
        events
    })
};

const showAllAdmin = async (req, res) => {
    let events = await Event.findAll({
        attributes: ['id', 'title']
    })
    return res.status(200).json({
        events
    })

}

const show = async (req, res) => {
    const id = req.params.id
    let events = await Event.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
            include: [
                [Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM eventos.users_events AS uev
                        WHERE
                            uev.eventid = 1
                        )`),
                    'cantPeople'
                ]
            ]
        },
        include: [{
            model: User,
            attributes: ['name', 'id', 'photo'],
        }, {
            model: Type,
            attributes: ['type']
        }]

    })
    return res.status(200).json({
        events
    })
};

const createEvent = async (req, res) => {
    const idUser_admin = req.userId

    const form = formidable({
        multiples: true
    });
    console.log(form._events.field);
    let result = form.parse(req, async (err, payload, photo) => {
        const {
            title,
            description,
            mode,
            province,
            city,
            street,
            link,
            number,
            init_date,
            end_date,
            idType
        } = JSON.parse(payload.payload)
        console.log(photo);

        let event = await Event.create({
            title,
            description,
            mode,
            province,
            city,
            street,
            number,
            link,
            init_date,
            end_date,
            idUser_admin,
            idType
        })
        if (event) {
            return event
        } else {
            return false
        }
    });
    if (result) {
        return res.status(200).json({
            'mgs': 'Evento creado correctamente'
        })
    } else {
        return res.status(404).json({
            msg: 'Error al crear el evento'
        })
    }
}

const updateEvent = async (req, res) => {
    const {
        id,
        title,
        description,
        mode,
        province,
        city,
        street,
        number,
        init_date,
        end_date,
        idType,
        cancelled
    } = req.body.event;
    const idUser_admin = req.userId;
    let event = await Event.findOne({
        where: {
            id: id
        }
    });
    if (!event) {
        return res.status(404).json({
            msg: "Evento no encontrado"
        })
    } else {
        if (event.idUser_admin === idUser_admin) {
            event.update({
                title,
                description,
                mode,
                province,
                city,
                street,
                number,
                init_date,
                end_date,
                idType,
                cancelled
            }).then(user => {
                res.status(200).json({
                    user,
                    'msg': 'Se actualizó correctamente'
                })
            })
        } else {
            return res.status(404).json({
                'msg': 'No tiene permisos para editar este evento'
            })
        }

    }
}

const destroyEvent = async (req, res) => {
    const userId = req.userId
    const user = await User.findOne({
        where: userId
    })
    const id = req.params.id
    let event = await Event.findOne({
        where: {
            id: id
        }
    });
    if (!event) {
        return res.status(404).json({
            msg: "Evento no encontrado"
        })
    } else {
        if (event.idUser_admin === user.id || user.role === 'admin') {
            event.destroy().then(user => {
                res.status(200).json({
                    user,
                    'msg': 'El evento ha sido eliminado'
                })
            })
        } else {
            return res.status(404).json({
                'msg': 'No tiene permisos para eliminar este evento'
            })
        }

    }
};

module.exports = {
    showAll,
    show,
    createEvent,
    updateEvent,
    destroyEvent,
    showAllAdmin
}