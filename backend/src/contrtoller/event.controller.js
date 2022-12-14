require('dotenv').config();
const User = require('../database/models/').user
const Event = require('../database/models/').event
const Type = require('../database/models/').type
const Users_events = require('../database/models/').users_events
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken')
const { validationMail} = require('../contrtoller/mail.controller');
const {Sequelize} = require('../database/models/');
const formidable = require('formidable');


const IMGURL = `${process.env.PHOTO}images/default`

// List all events 
const showAll = async (req, res) => {
    try {
        let events = await Event.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [[Sequelize.fn("COUNT", sequelize.col("users_events.eventId")), "cantPeople"]]
            },
            include: [{
                model: User,
                attributes: ['name', 'id', 'photo', 'validated']
            }, {
                model: Type,
                attributes: ['type']
            },{
                model: Users_events,
                attributes:[]
            }],
            group: ['users_events.eventId']
        })
    
        // Edit data before to send to FE
        events = events.map(function(event){
            // state of user validation
            if (event.user.validated === 3) {
                event.user.validated = true
            } else{
                event.user.validated = false
            }
            return event;
         })
    
        return res.status(200).json({ events })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// List events with limited data, only for the admin
const showAllAdmin = async (req, res) => {

    try {
        let events = await Event.findAll({
            attributes: ['id', 'title']
        })
        return res.status(200).json({events})
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}

// All information about one event
const showEvent = async (req, res) => {
    const eventId = req.params.id    

    // Get all users subscribed at an event
    try {
        // Get list of people
        let people = await Users_events.findAll({
            where: {
                eventId: eventId
            },
            attributes: ['favourite'],
            include: [{
                model: User,
                attributes: ['name', 'id'],
            }]
        })
        // Better format to frontend
        people = people.map(function(user){
            notNestedUser = {
                'id': user.user.id,
                'name': user.user.name,
                'favourite': user.favourite,
            }
            return notNestedUser
        })

        // get Event info
        let event = await Event.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [[Sequelize.fn("COUNT", sequelize.col("users_events.eventId")), "cantPeople"]]
            },
            where: {
                id: eventId
            },
            include: [{
                model: User,
                attributes: ['name', 'id', 'photo', 'validated']
            }, {
                model: Type,
                attributes: ['type']            
            },{
                model: Users_events,
                attributes:[]
            }],
            group: ['users_events.eventId']
        })
        // state of user validation
        if (event.user.validated === 3) {
            event.user.validated = true
        } else{
            event.user.validated = false
        }
        
        return res.status(200).json({ people, event })

    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// Get list of events created by an user
const eventscreatedbyuser = async (req, res) => {
    const idUser = req.params.idUser
    try {
        let events = await Event.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [[Sequelize.fn("COUNT", sequelize.col("users_events.eventId")), "cantPeople"]]
            },
            where: { idUser_admin: idUser },
            include: [{
                model: User,
                attributes: ['name', 'id', 'photo', 'validated']
            }, {
                model: Type,
                attributes: ['type']
            },{
                model: Users_events,
                attributes:[]
            }],
            group: ['users_events.eventId']
        })
    
        // Edit data before to send to FE
        events = events.map(function(event){
            if (event.user.validated === 3) {
                event.user.validated = true
            } else{
                event.user.validated = false
            }
            return event;
         })
    
        return res.status(200).json({ events })
        
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// Get list of events followed by a user
const eventsfollowedbyuser = async (req, res) => {
    const idUser = req.params.idUser
    try {
        let events = await Users_events.findAll({
            where: { userId: idUser },
            attributes: ['eventId'],
        })

        let eventsList = []
        for (let i = 0; i < events.length; i++) {
            const element = events[i];

            let event = await Event.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                    include: [[Sequelize.fn("COUNT", sequelize.col("users_events.eventId")), "cantPeople"]]
                },
                where: {
                    id: element.eventId
                },
                include: [{
                    model: User,
                    attributes: ['name', 'id', 'photo', 'validated']
                }, {
                    model: Type,
                    attributes: ['type']
                },{
                    model: Users_events,
                    attributes:[]
                }],
                group: ['users_events.eventId']
            })
            eventsList.push(event)
        }

        // Edit data before to send to FE
        eventsList = eventsList.map(function(event){
             if (event.user.validated === 3) {
                event.user.validated = true
            } else{
                event.user.validated = false
            }
             return event;
        })

        return res.status(200).json({ events: eventsList })
        
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
};

// Create event
const createEvent = async (req, res) => {
    const idUser_admin = req.userId

    try {
        const form = formidable({ multiples: true });
        let result = form.parse(req, async (err, payload) => {
            const {
                title, description, mode, province, city, street, link, number, init_date, end_date, idType
            } = JSON.parse(payload.payload)
            photo = 'https://thumbsnap.com/s/dmFvAhYh.jpg'
            // Create the event
            let event = await Event.create({
                title, description, mode, province, city, street, number, link, init_date, end_date, idUser_admin, idType, photo
            }).then(event => {
                return res.status(200).json({
                    eventId: event.id,
                    'mgs': 'Evento creado correctamente'
                })}
            )
            // return false from this function if something went wrong
            if (event) { return event } 
            else { return false}
        });
        if (!result) {
            return res.status(404).json({
                msg: 'Error al crear el evento'
            })
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// Update EVENT photo
const uploadPhoto = async (req, res) => {
    const eventId = req.params.idEvent
    try {
        let photo= process.env.PHOTO+req.file.path.substr(req.file.path.lastIndexOf('images'))
        const evnt = await Event.findOne({
            where: {
                id: eventId
            }
        })
        if (!evnt) {
            return res.status(404).json({
                msg: 'Evento no encontrado'
            })
        }
        await evnt.update({
            photo
        })
        return res.status(200).json({msg:'Foto agregada correctamente'})
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// Update event
const updateEvent = async (req, res) => {
    const { id, title, description, mode, province, city, street, number, link, init_date, end_date, idType, cancelled } = req.body;
    const idUser_admin = req.userId;

    try {
        let event = await Event.findOne({ where: { id: id } });
        if (!event) {
            return res.status(404).json({ msg: "Evento no encontrado"})
        } else {
            if (event.idUser_admin === idUser_admin) {
                event.update({id, title, description, mode, province, city, street, number, link, init_date, end_date, idType, cancelled })
                .then(updatedEvent => {res.status(200).json({updatedEvent, 'msg': 'Se actualizó correctamente el evento'})})
            } else {
                return res.status(401).json({ 'msg': 'No tiene permisos para editar este evento'})
            }
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

    
}

// Delete event
const destroyEvent = async (req, res) => {
    const userId = req.userId
    const id = req.params.id

    try {
        const user = await User.findOne({ where: userId})
        let event = await Event.findOne({ where: { id: id } });
        // Validate that the event exists
        if (!event) { return res.status(404).json({ msg: "Evento no encontrado" })
        } else {
            // Validate that the user is the admin or the event creator
            if (event.idUser_admin === user.id || user.role === 'admin') {
                // First delete user_event records and then delete event
                Users_events.destroy({ where: {eventId: event.id} }).then(
                    event.destroy().then(user => { res.status(200).json({'msg': 'El evento ha sido eliminado'})})
                )
            } else {
                return res.status(401).json({ 'msg': 'No tiene permisos para eliminar este evento' })
            }
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

};

module.exports = {
    showAll,
    showEvent,
    createEvent,
    updateEvent,
    destroyEvent,
    showAllAdmin,
    eventscreatedbyuser, 
    eventsfollowedbyuser,
    uploadPhoto
}