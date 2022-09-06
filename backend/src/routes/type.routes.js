const Router = require('express');
const router = Router();
const upload = require('../config/images.config')

const { showAll, newType, deleteType, update, uploadPhoto }  = require('../contrtoller/type.controller');
const { adminRole, verifyToken }=require('../validators/auth')


router.get("/views",verifyToken,showAll);
router.post("/create",verifyToken,adminRole,newType);
router.patch("/update/:id",verifyToken,adminRole,update)
router.patch("/delete/:id",verifyToken,adminRole,deleteType);
router.post("/uploadphoto/:idType",verifyToken,upload(),uploadPhoto)

module.exports = router;