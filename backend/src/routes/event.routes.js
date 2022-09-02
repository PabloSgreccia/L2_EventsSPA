const Router = require('express');
const router = Router();

const { showAll, show, createEvent, updateEvent, destroyEvent } = require('../contrtoller/event.controller');
const { verifyToken }=require('../validators/auth')

router.get("/views",showAll)
router.get("/view/:id",show)
router.post("/create",verifyToken,createEvent)
router.patch("/update",verifyToken,updateEvent)
router.delete("/delete/:id",verifyToken,destroyEvent)

module.exports = router;