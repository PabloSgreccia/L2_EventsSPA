const Router = require('express');
const router = Router();
const upload = require('../config/images.config')
const {
    showAll,
    pendingValidationUser,
    show,
    register,
    uploadPhoto,
    login,
    userjoinevent,
    userleftevent,
    validationUser,
    updatePass,
    updateUser,
    updateUserVerify,
    downUser,
    destroy,
    logOut,
    favouriteUser,
    showLogged,
    forgot
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
router.post("/register", validateRegister, EmailIsUnique,upload(), register)
router.post("/login", login)
router.post("/uploadphoto", verifyToken,upload(),uploadPhoto)
router.post("/userjoinevent", verifyToken,validationJoinEvent, userjoinevent)
router.post("/validation/:code", validationUser)
router.post("/logout", logOut)
router.post("/forgot", forgot)
router.patch("/updatepass", verifyToken, passValidation, updatePass)
router.patch("/updateuser", verifyToken, updateUser)
router.patch("/updateuserverify", verifyToken, adminRole, updateUserVerify)
router.patch("/down", verifyToken, downUser)
router.patch("/favourite", verifyToken, favouriteUser)
router.delete("/delete/:id", verifyToken, adminRole, destroy)
router.delete("/userleftevent/:idEvent", verifyToken, userleftevent)

// listar los eventos que creo el usuario eventscreatedbyuser
// listar los eventos anotados eventsfollowedbyuser
module.exports = router;