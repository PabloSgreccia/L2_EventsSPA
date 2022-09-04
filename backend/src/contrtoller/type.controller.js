require('dotenv').config();
const Type = require('../database/models/').type
const Event = require('../database/models/').event
const Sequelize = require('sequelize');

//--APIs--

const showAll = async (req, res) => {
    let types = await Type.findAll({
        attributes: ['id','type']
    })
    if (types) {
        return res.status(200).json({
            types
        })
    } else {
        return res.status(404).json({
            'mgsg': 'error al mostrar los types'
        })
    }
};

const newType = async (req, res) => {
    let params = req.body;
    if (params) {
        let type = await Type.create(params);
        return res.status(200).json({
            type,
            'msg': 'Creado correctamente'
        })
    } else {
        return res.status(404).json({
            'msg': 'No se recibieron los datos'
        })
    }

};

const update = async (req,res)=>{
    const params = req.body;
    const id = req.params.id
    let type = await Type.findOne({ where: { id: id } })
    if (!type) {
        return res.status(404).json({msg:"Tipo no encontrado"})
    } else {
        type.update(params).then(type => {
          res.status(200).json({status:200,type})
        })
    }
}

const deleteType = async (req, res) => {
    const id = req.params.id
    try {
        let type = await Type.findOne({ where: { id: id } })
        if (!type) {
            return res.status(404).json({msg:"Tipo no encontrado"})
        } else {
            let event = await Event.findOne({
                where: { idType: id }
            })
            if (event) {
                return res.status(400).json({msg:"Cant delete because there are created events with this type"})
            } else{
                type.destroy().then( res.status(200).json({status:200,type}))
            }
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Something went wrong. Try again"})
    }
}

module.exports = {
    showAll,
    newType,
    deleteType,
    update
};