const Router = require('express');
const router = Router();

const { showAll, show, register, login,validationUser, updatePass, updateUser, destroy, logOut } = require('../contrtoller/user.controller');
const { validateRegister, EmailIsUnique, passValidation } = require('../validators/validations')
const { adminRole, verifyToken }=require('../validators/auth')

router.get("/views",showAll)
router.get("/view/:id",show)
router.post("/register",validateRegister,EmailIsUnique,register)
router.post("/login",login)
router.post("/validation/:code",validationUser)
router.patch("/upadatePass/:id",verifyToken,passValidation,updatePass)
router.patch("/updateUser/:id",verifyToken,updateUser)
router.delete("/delete/:id",adminRole,destroy)
router.post("/logOut",logOut)


module.exports = router;