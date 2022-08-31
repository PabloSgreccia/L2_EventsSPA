require('dotenv').config();
const Type = require('../database/models/Type')
const Sequelize = require('sequelize');

//--APIs--

const index = async (req, res) => {
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
    let type = await Type.findOne({ where: { id: id } })
    if (!type) {
        return res.status(404).json({msg:"Tipo no encontrado"})
    } else {
        type.destroy().then(type => {
          res.status(200).json({status:200,type})
        })
    }
}

module.exports = {
    index,
    newType,
    deleteType,
    update
};