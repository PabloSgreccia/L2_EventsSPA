require('dotenv').config();
const Contact = require('../database/models/').contact
const Sequelize = require('sequelize');


const createContact = async (req, res) => {
    const params = req.body
    const contact = await Contact.create(params)    
    if (!contact) {
        return res.status(404).json({
            msg: 'No se creo el mensaje'
        })
    }
    return res.status(200).json({
        contact,
        msg: 'Mensaje creado correctamente'
    })
}

const viewAll = async (req, res) => {
    let contact = await Contact.findAll()
    if (!contact) {
        return res.status(404).json({
            msg: 'No hay mensajes para mostrar'
        })
    }
    return res.status(200).json({
        contact
    })
}

const view = async (req, res) => {
    const id = req.params.id
    let contact = await Contact.findOne({
        where: {
            id: id
        }
    })
    if (!contact) {
        return res.status(404).json({
            msg: 'No hay mensajes para mostrar'
        })
    }
    await contact.update({
        read: true
    })
    return res.status(200).json({
        contact
    })
}

const notRead = async (req, res) => {
    const id = req.params.id
    const contact = await Contact.findOne({
        where: {
            id: id
        }
    })
    if (!contact) {
        return res.status(404).json({
            msg: 'No hay mensajes para mostrar'
        })
    }
    await contact.update({
        read: false
    }).then(contact => {
        res.status(200)
    })
    return res.status(200).json({
        contact
    })
}
const deleteContact = async (req, res) => {
    const id = req.params.id
    const contact = await Contact.findOne({
        where:{
            id:id
        }
    })
    if (!contact) {
        return res.status(404).json({
            msg: 'Error al eliminar el mensaje'
        })
    }
    await contact.destroy()
    return res.status(200).json({
        contact,
        msg: 'mensaje borrado correctamente'
    })
}



module.exports = {
    createContact,
    viewAll,
    view,
    notRead,
    deleteContact
}