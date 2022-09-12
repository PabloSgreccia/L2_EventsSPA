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
 *    description: debes ser usuario administrador para ver esta información.
 *    tags:
 *      - user
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    responses:
 *      200:
 *        description: devuelve los atributos de todos los usuarios activos
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      403:
 *        description: Usuario no habilitado para esta operación.
 */
router.get("/views", verifyToken, adminRole, showAll)

/**
 * @openapi
 * paht:
 * /api/user/validations:
 *   get:
 *    summary: Muestra al admin el listado de todos los usuarios que solicitaron validar su cuenta
 *    description: Muestra al admin el listado de todos los usuarios que solicitaron validar su cuenta. Debes ser usuario administrador para ver esta información
 *    tags:
 *      - user
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    responses:
 *      200:
 *        description: Devuelve los atributos de todos los usuarios que solicitaron validacion
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      403:
 *        description: Usuario no habilitado para esta operación.
 */
router.get("/validations", verifyToken, adminRole, pendingValidationUser)

/**
 * @openapi
 * paht:
 * /api/user/view/{id}:
 *   get:
 *    summary: Muestra al usuario que este logueado el perfil de un usuario espesífico
 *    description: Muestra al usuario que este logueado el perfil de un usuario espesífico
 *    tags:
 *      - user
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          example: 2
 *        description: id del usuario a consultar
 *    responses:
 *      200:
 *        description: devuelve los atributos del usuario
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: usuario no encontrado
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    responses:
 *      200:
 *        description: devuelve los atributos del usurario
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: usuario no encontrado
 */
router.get("/logged", verifyToken, showLogged)

/**
 * @openapi
 * paht:
 * /api/user/validation/:code:
 *   get:
 *    summary: A travez de un link en su correo permite validar la cuaenta del usuario pasando a usuario activo
 *    description: El codigo a ingresar en el path lo debes buscar en el mail que mandamos al email registrado (o podes verlo tambien en la base de datos)
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
 *      400:
 *        description: Ocurrió un error en el backend
 *      404:
 *        description: usuario no encontrado
 */
 router.get("/validation/:code", validationUser)

/**
 * @openapi
 * paht:
 * /api/user/register:
 *   post:
 *    summary: Se registra un nuevo usuario
 *    description: Se registra un nuevo usuario
 *    tags:
 *      - user
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
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
 *                example: Micontrasenia123
 *    responses:
 *      200:
 *        description: Devuelve atributos del usuario y el msg Se creó correctamente
 *      400:
 *        description: Ocurrió un error en el backend al intentar crear el usuario
 *      404:
 *        description: No se recibieron los datos
 */
router.post("/register", validateRegister, EmailIsUnique, register)

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
 *                example: Micontrasenia123
 *    responses:
 *      200:
 *        description: Regresa el token en el header
 *      400:
 *        description: Ocurrió un error en el backend
 *      404:
 *        description: Usuario y/o contraseña incorrecta
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              photo:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        description: Foto agregada correctamente
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Usuario no encontrado
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idEvent:
 *                type: integer
 *                format: integer
 *                example: 2
 *    responses:
 *      200:
 *        description: usuario anotado al evento
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: error no se pudo anotar
 */
router.post("/userjoinevent", verifyToken,validationJoinEvent, userjoinevent)

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
 *        description: Ocurrió un error en el backend
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
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
 *      400:
 *        description: Ocurrió un error en el backend
 *      404:
 *        description: Email no encontrado
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
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
 *                example: Micontrasenia123
 *    responses:
 *      200:
 *        description: Contraseña actualizada correctamente
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Usuario no encontrado
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
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
 *                example: 2
 *              active:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Se actualizó correctamente
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Usuario no encontrado
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idUser:
 *                type: integer
 *                example: 1
 *              validate:
 *                type: integer
 *                example: 3
 *    responses:
 *      200:
 *        description: Se actualizó correctamente
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Usuario no encontrado 
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
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              active:
 *                type: boolean
 *                example: false
 *    responses:
 *      200:
 *        description: Se actualizó correctamente 
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Usuario no encontrado
 */
router.patch("/down", verifyToken, downUser)

/**
 * @openapi
 * paht:
 * /api/user/favourite:
 *   patch:
 *    summary: El administrador de un evento favea a un participante
 *    description: Debes ser el administrador del evento para ejecutar esta acción.
 *    tags:
 *      - user
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              active:
 *                type: boolean
 *                example: false
 *              idEvent:
 *                type: integer
 *                example: 2
 *              idUser:
 *                type: integer
 *                example: 3
 *    responses:
 *      200:
 *        description: Añadido a favoritos
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Evento no encontrado
 *      405:
 *        description: No se encontró relacion entre el usuario y el evento
 */
router.patch("/favourite", verifyToken, favouriteUser)

/**
 * @openapi
 * paht:
 * /api/user/delete/{id}:
 *   patch:
 *    summary: El admin elimina a un usuario
 *    description: Debes ser administrador para ejecutar esta acción.
 *    tags:
 *      - user
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          example: 2
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
 *                example: false
 *    responses:
 *      200:
 *        description: Se desactivó el usuario
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      403:
 *        description: Debes ser administrador.
 *      404:
 *        description: usuario no encontrado
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
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *      - idEvent: path
 *        name: idEvent
 *        required: true
 *        schema:
 *          type: integer
 *          example: 2
 *        description: id del evento a desuscribirse
 *    responses:
 *      200:
 *        description: Usuario salió del evento
 *      400:
 *        description: Ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      404:
 *        description: Relación entre evento y usuario no encontrada
 */
router.delete("/userleftevent/:idEvent", verifyToken, userleftevent)


module.exports = router;