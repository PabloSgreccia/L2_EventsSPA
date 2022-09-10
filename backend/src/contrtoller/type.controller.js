require('dotenv').config();
const Type = require('../database/models/').type
const Event = require('../database/models/').event
const Sequelize = require('sequelize');

// List all types
const showAll = async (req, res) => {
    
    try {
        let types = await Type.findAll({
            attributes: ['id','type'],
            where: { active: true }
        })
        if (types) {
            return res.status(200).json({
                types
            })
        } else {
            return res.status(200).json({
                types: []
            })
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
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
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
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
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }

}
// Upload type photo 
const uploadPhoto = async (req, res) => {
    const typeId = req.params.idType
    try {
        let photo= process.env.PHOTO+req.file.path.substr(req.file.path.lastIndexOf('images'))
        console.log(photo);
        const evnt = await Type.findOne({
            where: {
                id: typeId
            }
        })
        if (!evnt) {
            return res.status(404).json({
                msg: 'Error en la actualización de la foto'
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

// delete type
const deleteType = async (req, res) => {
    const id = req.params.id
    const active = req.body.active
    try {
        let type = await Type.findOne({ where: { id: id } })
        if (!type) {
            return res.status(404).json({msg:"Tipo no encontrado"})
        } else {
            type.update({ active })
            .then(user => {
                res.status(200).json({ 'msg': 'Se actualizó correctamente' })
            })
        }
    } catch (error) {
        return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
    }
}

module.exports = {
    showAll,
    newType,
    deleteType,
    update,
    uploadPhoto
};