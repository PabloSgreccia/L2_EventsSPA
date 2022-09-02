const Router = require('express');
const router = Router();

const { showAll, newType, deleteType, update }  = require('../contrtoller/type.controller');
const { adminRole, verifyToken }=require('../validators/auth')

router.get("/views",verifyToken,showAll);
router.post("/create",verifyToken,adminRole,newType);
router.patch("/update/:id",verifyToken,adminRole,update)
router.delete("/delete/:id",verifyToken,adminRole,deleteType);

module.exports = router;