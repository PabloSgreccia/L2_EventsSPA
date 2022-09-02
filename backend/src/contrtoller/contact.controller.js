require('dotenv').config();
const Contac = require('../database/models/').contac
const Sequelize = require('sequelize');


const createContac = async (req, res) => {
    const params = req.body
    const contac = await Contac.create(params)    
    if (!contac) {
        return res.status(404).json({
            msg: 'No se creo el mensaje'
        })
    }
    return res.status(200).json({
        contac,
        msg: 'Mensaje creado correctamente'
    })
}

const viewAll = async (req, res) => {
    let contac = await Contac.findAll()
    if (!contac) {
        return res.status(404).json({
            msg: 'No hay mensajes para mostrar'
        })
    }
    return res.status(200).json({
        contac
    })
}

const view = async (req, res) => {
    const id = req.params.id
    let contac = await Contac.findOne({
        where: {
            id: id
        }
    })
    if (!contac) {
        return res.status(404).json({
            msg: 'No hay mensajes para mostrar'
        })
    }
    await contac.update({
        read: true
    })
    return res.status(200).json({
        contac
    })
}

const notRead = async (req, res) => {
    const id = req.params.id
    const contac = await Contac.findOne({
        where: {
            id: id
        }
    })
    if (!contac) {
        return res.status(404).json({
            msg: 'No hay mensajes para mostrar'
        })
    }
    await contac.update({
        read: false
    }).then(contac => {
        res.status(200)
    })
    return res.status(200).json({
        contac
    })
}
const deleteContac = async (req, res) => {
    const id = req.params.id
    const contac = await Contac.findOne({
        where:{
            id:id
        }
    })
    if (!contac) {
        return res.status(404).json({
            msg: 'Error al eliminar el mensaje'
        })
    }
    await contac.destroy()
    return res.status(200).json({
        contac,
        msg: 'mensaje borrado correctamente'
    })
}



module.exports = {
    createContac,
    viewAll,
    view,
    notRead,
    deleteContac
}