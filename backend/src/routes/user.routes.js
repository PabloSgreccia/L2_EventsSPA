const Router = require('express');
const router = Router();

const {
    showAll,
    pendingValidationUser,
    show,
    register,
    login,
    userjoinevent,
    userleftevent,
    validationUser,
    updatePass,
    updateUser,
    downUser,
    destroy,
    logOut,
    favouriteUser,
    showLogged
} = require('../contrtoller/user.controller');
const {
    validateRegister,
    EmailIsUnique,
    passValidation,
    validationJoinEvent
} = require('../validators/validations');
const {
    adminRole,
    verifyToken
} = require('../validators/auth');

router.get("/views", showAll)
router.get("/validations", verifyToken, adminRole, pendingValidationUser)
router.get("/view/:id", show)
router.get("/logged", verifyToken, showLogged)
router.post("/register", validateRegister, EmailIsUnique, register)
router.post("/login", login)
router.post("/userjoinevent", verifyToken,validationJoinEvent, userjoinevent)
router.post("/validation/:code", validationUser)
router.post("/logout", logOut)
//olvide la contraseña
router.post("/forgot")
router.patch("/updatepass", verifyToken, passValidation, updatePass)
router.patch("/updateuser", verifyToken, updateUser)
router.patch("/down", verifyToken, downUser)
router.patch("/favourite", verifyToken, favouriteUser)
router.delete("/delete/:id", verifyToken, adminRole, destroy)
router.delete("/userleftevent/:idEvent", verifyToken, userleftevent)

// listar los eventos que creo el usuario eventscreatedbyuser
// listar los eventos anotados eventsfollowedbyuser
module.exports = router;