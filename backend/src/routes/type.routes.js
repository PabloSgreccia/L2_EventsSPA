const Router = require('express');
const router = Router();

const { index, newType, deleteType, update }  = require('../contrtoller/type.controller');
const { adminRole }=require('../validators/auth')

router.get("/view",index);
router.post("/create",adminRole,newType);
router.patch("/update/:id",adminRole,update)
router.delete("/delete/:id",adminRole,deleteType);

module.exports = router;