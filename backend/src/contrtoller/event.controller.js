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
const { where } = require('sequelize');

// List all events 
const showAll = async (req, res) => {
    try {
        let events = await Event.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [[Sequelize.literal(`(SELECT COUNT(*) FROM eventos.users_events AS uev WHERE uev.eventid = event.id)`),'cantPeople']]
            },
            include: [{
                model: User,
                attributes: ['name', 'id', 'photo', 'validated']
            }, {
                model: Type,
                attributes: ['type']
            }]
        })
    
        // Edit data before to send to FE
        events = events.map(function(event){
            if (!event.photo) {
                // Add default event photo
                event.photo = 'http://localhost:3000/images/defEvent.png'
            }
            // state of user validation
            if (event.user.validated === 3) {
                event.user.validated = true
            } else{
                event.user.validated = false
            }
            // Add default user photo
            if(!event.user.photo){
                event.user.photo = 'http://localhost:3000/images/defUser.png'
            }
            return event;
         })
    
        return res.status(200).json({ events })
        
    } catch (error) {
        return res.status(404).json({ msg: 'Something went wrong trying to get data' })
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
        return res.status(400).json({ msg: 'Something went wrong trying to get data' })
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
                include: [[Sequelize.literal(`(SELECT COUNT(*) FROM eventos.users_events AS uev WHERE uev.eventid = ${eventId})`),'cantPeople']]
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
            }]
        })
        // Edit data before to send to FE
        if (!event.photo) {
            event.photo = 'http://localhost:3000/images/defEvent.png'
        }
        // state of user validation
        if (event.user.validated === 3) {
            event.user.validated = true
        } else{
            event.user.validated = false
        }
        // Add default user photo
        if(!event.user.photo){
            event.user.photo = 'http://localhost:3000/images/defUser.png'
        }
        
        return res.status(200).json({ people, event })

    } catch (error) {
        return res.status(400).json({ msg: 'Something went wrong trying to get users' })
    }
};

// Get list of events created by an user
const eventscreatedbyuser = async (req, res) => {
    const idUser = req.params.idUser
    try {
        let events = await Event.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: [[Sequelize.literal(`(SELECT COUNT(*) FROM eventos.users_events AS uev WHERE uev.eventid = event.id)`),'cantPeople']]
            },
            where: { idUser_admin: idUser },
            include: [{
                model: User,
                attributes: ['name', 'id', 'photo', 'validated']
            }, {
                model: Type,
                attributes: ['type']
            }]
        })
    
        // Edit data before to send to FE
        events = events.map(function(event){
            if (!event.photo) {
                // Add default event photo
                event.photo = 'http://localhost:3000/images/defEvent.png'
            }
            // state of user validation
            if (event.user.validated === 3) {
                event.user.validated = true
            } else{
                event.user.validated = false
            }
            // Add default user photo
            if(!event.user.photo){
                event.user.photo = 'http://localhost:3000/images/defUser.png'
            }
            return event;
         })
    
        return res.status(200).json({ events })
        
    } catch (error) {
        return res.status(404).json({ msg: 'Something went wrong trying to get data' })
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
                    include: [[Sequelize.literal(`(SELECT COUNT(*) FROM eventos.users_events AS uev WHERE uev.eventid = ${element.eventId})`),'cantPeople']]
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
                }]
            })
            
            eventsList.push(event)
        }

        // Edit data before to send to FE
        eventsList = eventsList.map(function(event){
            if (!event.photo) {
                // Add default event photo
                event.photo = 'http://localhost:3000/images/defEvent.png'
            }
            // state of user validation
            if (event.user.validated === 3) {
                event.user.validated = true
            } else{
                event.user.validated = false
            }
            // Add default user photo
            if(!event.user.photo){
                event.user.photo = 'http://localhost:3000/images/defUser.png'
            }
            return event;
        })

        return res.status(200).json({ events: eventsList })
        
    } catch (error) {
        return res.status(404).json({ msg: 'Something went wrong trying to get data' })
    }
};

// Create event
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

// Update event
const updateEvent = async (req, res) => {
    const { id, title, description, mode, province, city, street, number, init_date, end_date, idType, cancelled } = req.body;
    const idUser_admin = req.userId;

    let event = await Event.findOne({ where: { id: id } });
    
    console.log(event);

    if (!event) {
        return res.status(404).json({ msg: "Evento no encontrado"})
    } else {
        if (event.idUser_admin === idUser_admin) {
            event.update({id, title, description, mode, province, city, street, number, init_date, end_date, idType, cancelled })
            .then(updatedEvent => {res.status(200).json({updatedEvent, 'msg': 'Se actualizó correctamente'})})
        } else {
            return res.status(404).json({ 'msg': 'No tiene permisos para editar este evento'})
        }
    }
}

// Delete event
const destroyEvent = async (req, res) => {
    const userId = req.userId
    const id = req.params.id
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
            return res.status(404).json({ 'msg': 'No tiene permisos para eliminar este evento' })
        }
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
    eventsfollowedbyuser
}