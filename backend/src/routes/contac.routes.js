const Router = require('express');
const router = Router();

const {
    createContac,
    viewAll,
    view,
    notRead,
    deleteContac
} = require('../contrtoller/contact.controller')

const {
    validateContac
} = require('../validators/validations')

const {
    adminRole,
    verifyToken
} = require('../validators/auth')

router.get("/views",verifyToken,adminRole,viewAll)
router.get("/view/:id",verifyToken,adminRole,view)
router.post("/create",validateContac,verifyToken,adminRole,createContac)
router.patch("/notread/:id",verifyToken,adminRole,notRead)
router.delete("/delete/:id",verifyToken,adminRole,deleteContac)

module.exports=router