const Router = require('express');
const router = Router();

const {
    createContact,
    viewAll,
    view,
    notRead,
    deleteContact,
    showLogged
} = require('../contrtoller/contact.controller')

const {
    validateContact
} = require('../validators/validations')

const {
    adminRole,
    verifyToken
} = require('../validators/auth')

router.get("/views",verifyToken,adminRole,viewAll)
router.get("/view/:id",verifyToken,adminRole,view)
router.post("/create",validateContact,createContact)
router.patch("/notread/:id",verifyToken,adminRole,notRead)
router.delete("/delete/:id",verifyToken,adminRole,deleteContact)

module.exports=router