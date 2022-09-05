require('dotenv').config();
const Type = require('../database/models/').type
const Event = require('../database/models/').event
const Sequelize = require('sequelize');

// List all types
const showAll = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }

};

// create new type
const newType = async (req, res) => {
    let params = req.body;

    try {
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
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
};

// update type
const update = async (req,res)=>{
    const params = req.body;
    const id = req.params.id

    try {
        let type = await Type.findOne({ where: { id: id } })
        if (!type) {
            return res.status(404).json({msg:"Tipo no encontrado"})
        } else {
            type.update(params).then(type => {
              res.status(200).json({status:200,type})
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }

}

// delete type
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
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Something went wrong at backend.'})
    }
}

module.exports = {
    showAll,
    newType,
    deleteType,
    update
};