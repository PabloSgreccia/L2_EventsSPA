require('dotenv').config();
const User = require('../database/models/').user
const jwt = require('jsonwebtoken');

//Valida que el usuario se administrador

const adminRole = async (req, res, next) => {
  const id=req.userId
  try {
    let user = await User.findOne({
      where: {
        id: id
      }
    });
    if (user.role == 'admin') {
      req.isAdmin = true;
      next()
    } else {
      res.status(403).json({
        msg: "Usuario no autorizado"
      })
    }
  } catch (error) {
      return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
  }
};

// Valida que el usuario este logueado
async function verifyToken(req, res, next) {
  // Validate that "authorization" header exists
  if (!req.headers.authorization) {
    return res.status(401).json({
      'msg': 'No autorizado'
    })
  }
  // Validate that "authorization" header has the correct value
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      'msg': 'No autorizado'
    })
  }

  // JWT verification
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      where: {
        id: payload.id
      }
    })
    if (!user) {
      return res.status(404).json({
        "status": 404,
        "msg": `Usuario no encontrado`
      })
    }
    req.userId = payload.id;
    next();
  } catch (error) {
      return res.status(400).json({ msg: 'Ocurrió un error en el backend.'})
  }
}

module.exports = {
  adminRole,
  verifyToken
}