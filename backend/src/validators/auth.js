require('dotenv').config();
const  User  = require('../database/models/').user
const jwt = require('jsonwebtoken');

//Valida que el usuario se administrador

const adminRole = async (req, res, next) => {
    let user = await User.findOne({ where: { id: req.headers.id } });
    if (user.role == 'admin'){
      req.isAdmin = true;
      next()
    } else {
      res.status(401).json({msg:"No autorizado"})
    }
  };

  // Valida que el usuario este logueado
  async function verifyToken(req, res, next) {
    // Validate that "authorization" header exists
    if(!req.headers.authorization){
        return res.status(401).json({'msg':'User not authorized'})
    }
    // Validate that "authorization" header has the correct value
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({'msg':'User not authorized'})
    }

    // JWT verification
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(payload._id)
        if (!user) {
            return res.status(404).json({
                "status": 404,
                "msg": `User not found`
            })
        }
        req.userId = payload._id;
        next();
    } catch (error) {
        return res.status(401).json({error})
    }
}

  module.exports = { adminRole, verifyToken }