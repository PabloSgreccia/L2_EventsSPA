const Contact = require('../database/models/').contact
const Sequelize = require('sequelize');

// Create new contact register
const createContact = async (req, res) => {
    const {name, email, subject, description, date, read} = req.body
    try {
        const contact = await Contact.create({name, email, subject, description, date, read})    
        if (!contact) {
            return res.status(404).json({ msg: 'Message doesnt found'})
        } else {
            return res.status(200).json({ msg: 'Message seccessfully created'})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
}

// List all contact registers
const viewAll = async (req, res) => {
    try {
        let contact = await Contact.findAll()
        if (!contact) {
            return res.status(404).json({ msg: 'Nothing to show' })
        } else {
            return res.status(200).json({ contact })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
}

// List only one contact register
const view = async (req, res) => {
    const id = req.params.id

    try {
        let contact = await Contact.findOne({ where: { id: id } })
        if (!contact) {
            return res.status(404).json({ msg: 'Nothing to show'})
        } else {
            await contact.update({ read: true })
            return res.status(200).json({ contact })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
}

// Mark a contact register as not read
const notRead = async (req, res) => {
    const id = req.params.id

    try {
        const contact = await Contact.findOne({ where: { id: id } })
        if (!contact) {
            return res.status(404).json({ msg: 'No hay mensajes para mostrar' })
        } else {
            await contact.update({ read: false })
                .then(contact => { res.status(200).json({ msg: 'Contact updated.'})})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
}

// Delete contact register
const deleteContact = async (req, res) => {
    const id = req.params.id
    try {
        const contact = await Contact.findOne({ where:{ id:id } })
        if (!contact) {
            return res.status(404).json({ msg: 'Error trying to delete' })
        } 
        await contact.destroy()
        return res.status(200).json({ msg: 'Message deleted' })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
}

module.exports = {
    createContact,
    viewAll,
    view,
    notRead,
    deleteContact
}