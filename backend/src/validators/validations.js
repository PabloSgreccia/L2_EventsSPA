require('dotenv').config();
const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
const Sequelize = require('sequelize');
const User = require('../database/models/').user;

const validateRegister = [
    
  check('name')
        .exists()
        .withMessage('Debe ingresar un nombre'),
    check('email')
        .exists()
        .isEmail()
        .withMessage('No contiene un formato de email valido'),
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('La contraseña debe contener mas de 6 caracteres'),
    
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const EmailIsUnique = async (req, res, next) => {
  let email = req.body.email

  User.findOne({
    where:{email:email}
  }).then(user =>{
    if (user) {
      //Email invalido
      return res.status(400).json({msg: "El email ingresado ya se encuentra en uso"})
    }else{
      next()
    }
  }).catch(err => {
    //Fallo al buscar el email en la base de datos
    return res.status(500).json(err.message)
  })
};

  const passValidation = async (req, res, next) => {
    const password = req.body
    const id=req.params.id
    let user = await  User.findOne({
      where:{id:id}
    })
    if(!user){
      return res.status(404).json({msg :'usuario no encontrado'})
    }
    if (bcrypt.compareSync(password, user.password)){
      nest()
    }else{
      return res.status(400).json({msg :'contraseña incorrecta'})
    }
  
  };

module.exports = { validateRegister, EmailIsUnique, passValidation }