require('dotenv').config();
const {
  check
} = require('express-validator');
const {
  validateResult
} = require('../helpers/validateHelper');
const Sequelize = require('sequelize');
const User = require('../database/models/').user;
const Event = require('../database/models/').event;
const Users_events = require('../database/models/').users_events;
const bcrypt = require('bcryptjs');

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
  .isLength({
    min: 6
  })
  .withMessage('La contraseña debe contener mas de 6 caracteres'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const EmailIsUnique = async (req, res, next) => {
  let email = req.body.email

  User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (user) {
      //Email invalido
      return res.status(400).json({
        msg: "El email ingresado ya se encuentra en uso"
      })
    } else {
      next()
    }
  }).catch(err => {
    //Fallo al buscar el email en la base de datos
    return res.status(500).json(err.message)
  })
};

const passValidation = async (req, res, next) => {
  const {
    oldPassword
  } = req.body
  const id = req.userId
  let user = await User.findOne({
    where: {
      id: id
    }
  })
  if (!user) {
    return res.status(404).json({
      msg: 'usuario no encontrado'
    })
  }
  if (bcrypt.compareSync(oldPassword, user.password)) {
    next()
  } else {
    return res.status(400).json({
      msg: 'contraseña incorrecta'
    })
  }

};

const validateContact = [

  check('name')
  .exists()
  .withMessage('Debe ingresar un nombre'),
  check('email')
  .exists()
  .isEmail()
  .withMessage('No contiene un formato de email valido'),
  check('subject')
  .exists()
  .withMessage('Debe ingresar sus nombre'),
  check('description')
  .exists()
  .withMessage('Debe escribir algún mensaje'),
  check('date')
  .exists()
  .withMessage('Por favor ingrese la fecha'),

  (req, res, next) => {
    validateResult(req, res, next)
  }
]

const validationJoinEvent = async (req, res, next) => {
  const userId = req.userId;
  const eventId = req.body.idEvent
  const users_events = await Users_events.findOne({
    attributes: ['userId', 'eventId'],
    where: {
      userId: userId,
      eventId: eventId
    }
  })
  if (users_events) {
    return res.status(404).json({msg:'Ya estas anotado a este evento'})
  }
  const user = await User.findOne({
    where: {
      id: userId
    }
  })
  if (!user) {
    return res.status(404).json({
      msg: "no se encontro el usuario"
    })
  }
  const event = await Event.findOne({
    where: {
      id: eventId
    }
  })
  if (!event) {
    return res.status(404).json({
      msg: "no se encontro el evento"
    })
  }
  if (event.idUser_admin === userId) {
    return res.status(404).json({
      msg: "Eres el usuario que creo el evento, no puedes anotarte"
    })
  }
  next()
}

module.exports = {
  validateRegister,
  EmailIsUnique,
  passValidation,
  validateContact,
  validationJoinEvent
}