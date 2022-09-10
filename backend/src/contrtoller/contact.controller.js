const Contact = require('../database/models/').contact
const Sequelize = require('sequelize');

// Create new contact register
const createContact = async (req, res) => {
    const {name, email, subject, description, date, read} = req.body
    try {
        const contact = await Contact.create({name, email, subject, description, date, read})    
        if (!contact) {
            return res.status(404).json({ msg: 'Mensaje no creado'})
        } else {
            return res.status(201).json({ msg: 'Mensaje creado exitosamente'})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// List all contact registers
const viewAll = async (req, res) => {
    try {
        let contact = await Contact.findAll()
        if (!contact) {
            return res.status(404).json({ msg: 'No se encontraron mensajes' })
        } else {
            return res.status(200).json({ contact })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// List only one contact register
const view = async (req, res) => {
    const id = req.params.id

    try {
        let contact = await Contact.findOne({ where: { id: id } })
        if (!contact) {
            return res.status(404).json({ msg: 'No se encontró el mensaje'})
        } else {
            await contact.update({ read: true })
            return res.status(200).json({ contact })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// update contact register to read or not
const notRead = async (req, res) => {
    const id = req.params.id
    const read = req.params.read

    try {
        const contact = await Contact.findOne({ where: { id: id } })
        if (!contact) {
            return res.status(404).json({ msg: 'No se encontró el mensaje' })
        } else {
            await contact.update({ read: read })
                .then(contact => { res.status(200).json({ msg: 'Mensaje actualizado.'})})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

// Delete contact register
const deleteContact = async (req, res) => {
    const id = req.params.id
    try {
        const contact = await Contact.findOne({ where:{ id:id } })
        if (!contact) {
            return res.status(404).json({ msg: 'Error al eliminar mensaje' })
        } 
        await contact.destroy()
        return res.status(200).json({ msg: 'Mensaje eliminado' })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

module.exports = {
    createContact,
    viewAll,
    view,
    notRead,
    deleteContact
}