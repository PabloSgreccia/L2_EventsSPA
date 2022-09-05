const Router = require('express');
const router = Router();
const upload = require('../config/images.config')

const { showAll, showEvent, createEvent, uploadPhoto, updateEvent, destroyEvent, showAllAdmin, eventscreatedbyuser, eventsfollowedbyuser } = require('../contrtoller/event.controller');
const { verifyToken }=require('../validators/auth')

router.get("/views",showAll)
router.get("/views/admin",showAllAdmin)
router.get("/view/:id",showEvent)
router.post("/create",verifyToken,createEvent)
router.patch("/update",verifyToken,updateEvent)
router.post("/uploadphoto/:idEvent",verifyToken,upload(),uploadPhoto)
router.delete("/delete/:id",verifyToken,destroyEvent)
router.get("/eventscreatedbyuser/:idUser",verifyToken,eventscreatedbyuser)
router.get("/eventsfollowedbyuser/:idUser",verifyToken,eventsfollowedbyuser)
// TODO: usar esta ruta para modificar la foto
// router.post("/updatephoto/:id",verifyToken, xxxxxxx )

module.exports = router;