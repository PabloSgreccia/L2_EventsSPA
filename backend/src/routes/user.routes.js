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
    downUserByAdmin,
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

/**
 * @openapi
 * paht:
 * /api/user/views:
 *   get:
 *    summary: Muestra al admin el listado de todos los usuarios activos
 *    description: Muestra al admin el listado de todos los usuarios activos
 *    tags:
 *      - user
 *    responses:
 *      200:
 *        description: devuelve los atributos de todos los usuarios activos
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.get("/views", verifyToken, adminRole, showAll)

/**
 * @openapi
 * paht:
 * /api/user/validations:
 *   get:
 *    summary: Muestra al admin el listado de todos los usuarios que solicitaron validar su cuenta
 *    description: Muestra al admin el listado de todos los usuarios que solicitaron validar su cuenta
 *    tags:
 *      - user
 *    responses:
 *      200:
 *        description: Devuelve los atributos de todos los usuarios que solicitaron validacion
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.get("/validations", verifyToken, adminRole, pendingValidationUser)

/**
 * @openapi
 * paht:
 * /api/user/view/{id}
 *   get:
 *    summary: Muestra al usuario que este logueado el perfil de un usuario espesífico
 *    description: Muestra al usuario que este logueado el perfil de un usuario espesífico
 *    tags:
 *      - user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: int(11)
 *        description: id del usuario a consultar
 *    responses:
 *      200:
 *        description: devuelve los atributos del usuario
 *      404:
 *        description: usuario no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.get("/view/:id", verifyToken, show)

/**
 * @openapi
 * paht:
 * /api/user/logged:
 *   get:
 *    summary: Devuelve la información del usuario logueado
 *    description: Devuelve la información del usuario logueado
 *    tags:
 *      - user
 *    responses:
 *      200:
 *        description: devuelve los atributos del usurario
 *      404:
 *        description: usuario no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.get("/logged", verifyToken, showLogged)

/**
 * @openapi
 * paht:
 * /api/user/register:
 *   post:
 *    summary: Se registra un nuevo usuario
 *    description: Se registra un nuevo usuario
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Pedro Gomez
 *              email:
 *                type: string
 *                example: pedrogomez@gmail.com
 *              password:
 *                type: string
 *                example: secret
 *    responses:
 *      200:
 *        description: Devuelve atributos del usuario y el msg Se creó correctamente
 *      404:
 *        description: No se recibieron los datos
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/register", validateRegister, EmailIsUnique,upload(), register)

/**
 * @openapi
 * paht:
 * /api/user/login:
 *   post:
 *    summary: Logueo de usuario
 *    description: Logueo de usuario
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: varchar(255)
 *                example: pedrogomez@gmail.com
 *              password:
 *                type: string
 *                format: varchar(255)
 *                example: secret
 *    responses:
 *      200:
 *        description: Regresa el token en el header
 *      404:
 *        description: Usuario y/o contraseña incorrecta
 *      401:
 *        description: Usuario y/o contraseña incorrecta
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/login", login)

/**
 * @openapi
 * paht:
 * /api/user/uploadphoto:
 *   post:
 *    summary: Carga una foto al usuario logueado
 *    description: Carga una foto al usuario logueado
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              photo:
 *                profileImage:
 *                  type: string
 *                  format: binary
 *    responses:
 *      200:
 *        description: Foto agregada correctamente
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/uploadphoto", verifyToken,upload(),uploadPhoto)
/**
 * @openapi
 * paht:
 * /api/user/userjoinevent:
 *   post:
 *    summary: El usuario logueado se anota a un evento
 *    description: El usuario logueado se anota a un evento
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idEvent:
 *                profileImage:
 *                  type: integer
 *                  format: integer
 *    responses:
 *      200:
 *        description: usuario anotado al evento
 *      404:
 *        description: error no se pudo anotar
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/userjoinevent", verifyToken,validationJoinEvent, userjoinevent)
/**
 * @openapi
 * paht:
 * /api/user/validation/:code:
 *   get:
 *    summary: A travez de un link en su correo permite validar la cuaenta del usuario pasando a usuario activo
 *    description: A travez de un link en su correo permite validar la cuaenta del usuario pasando a usuario activo
 *    tags:
 *      - user
 *    parameters:
 *      - code: path
 *        name: code
 *        required: true
 *        schema:
 *          type: string
 *        description: codigo de validacion del usuario generado de forma aleatoria en el registro
 *    responses:
 *      404:
 *        description: usuario no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.get("/validation/:code", validationUser)
/**
 * @openapi
 * paht:
 * /api/user/logOut:
 *   post:
 *    summary: Termina la sesión del usuario logueado
 *    description: Termina la sesión del usuario logueado
 *    tags:
 *      - user
 *    responses:
 *      200:
 *        description: sesion terminada
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/logout", logOut)
/**
 * @openapi
 * paht:
 * /api/user/forgot:
 *   post:
 *    summary: Envia un mail con una nueva contraseña generada aleatoriamente
 *    description: Envia un mail con una nueva contraseña generada aleatoriamente
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: varchar(255)
 *                example: pedrogomez@gmail.com
 *    responses:
 *      200:
 *        description: Email sent
 *      404:
 *        description: Incorrect email address
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/forgot", forgot)
/**
 * @openapi
 * paht:
 * /api/user/updatepass:
 *   patch:
 *    summary: Actualiza la contraseña del usuario logueado
 *    description: Actualiza la contraseña del usuario logueado
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *                format: varchar(255)
 *                example: secret
 *    responses:
 *      200:
 *        description: Contraseña actualizada correctamente
 *      404:
 *        description: Usuario no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/updatepass", verifyToken, passValidation, updatePass)
/**
 * @openapi
 * paht:
 * /api/user/updateuser:
 *   patch:
 *    summary: Actualiza los datos del usuraio logueado
 *    description: Actualiza los datos del usuraio logueado
 *    tags:
 *      - user
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                format: varchar(255)
 *                example: Pedro
 *              validate:
 *                type: integer
 *                format: int(255)
 *                example: 2
 *              active:
 *                type: boolean
 *                format: tinyint(255)
 *                example: true
 *    responses:
 *      200:
 *        description: Usuario no encontrado
 *      404:
 *        description: Se actualizó correctamente
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/updateuser", verifyToken, updateUser)
/**
 * @openapi
 * paht:
 * /api/user/updateuserverify:
 *   patch:
 *    summary: El admin valida la cuenta como verdadera
 *    description: El admin valida la cuenta como verdadera
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idUser:
 *                type: integer
 *                format: int(255)
 *                example: 1
 *              validate:
 *                type: integer
 *                format: int(255)
 *                example: 3
 *    responses:
 *      200:
 *        description: Usuario no encontrado
 *      404:
 *        description: Se actualizó correctamente
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/updateuserverify", verifyToken, adminRole, updateUserVerify)
/**
 * @openapi
 * paht:
 * /api/user/down:
 *   patch:
 *    summary: El usuario logueado desactiva su cuenta
 *    description: El usuario logueado desactiva su cuenta
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              active:
 *                type: boolean
 *                format: tinyint(1)
 *                example: false
 *    responses:
 *      200:
 *        description: Usuario no encontrado
 *      404:
 *        description: Se actualizó correctamente
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/down", verifyToken, downUser)
/**
 * @openapi
 * paht:
 * /api/user/favourite:
 *   patch:
 *    summary: El usuario logueado desactiva su cuenta
 *    description: El usuario logueado desactiva su cuenta
 *    tags:
 *      - user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              active:
 *                type: boolean
 *                format: tinyint(1)
 *                example: false
 *    responses:
 *      200:
 *        description: Añadido a favoritos
 *      401:
 *        description: Solo el creador del evento puede realizar esta acción
 *      404:
 *        description: Evento no encontrado
 *      405:
 *        description: No se encontraron datos
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/favourite", verifyToken, favouriteUser)

/**
 * @openapi
 * paht:
 * /api/user/delete/{id}
 *   patch:
 *    summary: El admin elimina a un usuario
 *    description: El admin elimina a un usuario
 *    tags:
 *      - user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: id del usuario a eliminar
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              active:
 *                type: boolean
 *                format: tinyint(1)
 *                example: false
 *    responses:
 *      200:
 *        description: Devuelve los atributos del usuario eliminado
 *      404:
 *        description: usuario no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/delete/:id", verifyToken, adminRole, downUserByAdmin)

/**
 * @openapi
 * paht:
 * /api/user/userleftevent/{idEvent}:
 *   delete:
 *    summary: El usuario se da de baja a un evento
 *    description: El usuario se da de baja a un evento
 *    tags:
 *      - user
 *    parameters:
 *      - idEvent: path
 *        name: idEvent
 *        required: true
 *        schema:
 *          type: integer
 *        description: id del evento a desuscribirse
 *    responses:
 *      200:
 *        description: Devuelve los id del usuario logueado y el evento al que se bajo
 *      404:
 *        description: No se completo la operación
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.delete("/userleftevent/:idEvent", verifyToken, userleftevent)


module.exports = router;