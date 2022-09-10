const Router = require('express');
const router = Router();
const upload = require('../config/images.config')

const { showAll, newType, deleteType, update, uploadPhoto }  = require('../contrtoller/type.controller');
const { adminRole, verifyToken }=require('../validators/auth')

/**
 * @openapi
 * paht:
 * /api/type/views:
 *   get:
 *    summary: Muestra todos los tipos de eventos creados
 *    description: Muestra todos los tipos de eventos creados
 *    tags:
 *      - type
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
 *        description: devuelve los tipos de eventos
 *      400:
 *        description: ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 */
router.get("/views",verifyToken,showAll);

/**
 * @openapi
 * paht:
 * /api/type/update/{id}:
 *   patch:
 *    summary: Actualiza un tipo de evento
 *    description: Debes estár logueado con el usuario administrador para poder actualizar tipos de eventos.
 *    tags:
 *      - type
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *      - id: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          example: 2
 *        description: id del type a modificar
 *    responses:
 *      200:
 *        description: Devuelve los atributos del type editado
 *      400:
 *        description: ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      403:
 *        description: Usuario no habilitado para esta operación.
 *      404:
 *        description: Tipo no encontrado
 */
router.patch("/update/:id",verifyToken,adminRole,update)

/**
 * @openapi
 * paht:
 * /api/type/delete/{id}:
 *   patch:
 *     summary: Desactiva un tipo de evento
 *     description: Debes estár logueado con el usuario administrador para poder eliminar tipos de eventos. Este endpoint NO elimina el evento, sino que lo deja desactivado, esto es para que no genere inconsistencia ocn los eventos que ya se encuentran creados con ese tipo de evento. 
 *     tags:
 *       - type
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *       - id: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: id del type a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Devuelve los atributos del type creado
 *       400:
 *         description: ocurrió un error en el backend
 *       401:
 *         description: Usuario no autorizado.
 *       403:
 *         description: Usuario no habilitado para esta operación.
 *       404:
 *         description: Tipo no encontrado
 */
router.patch("/delete/:id",verifyToken,adminRole,deleteType);

/**
 * @openapi
 * paht:
 * /api/type/create:
 *   post:
 *    summary: Crea un nuevo tipo de evento
 *    description: Debes estár logueado con el usuario administrador para poder crear tipos de eventos.
 *    tags:
 *      - type
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
 *              type:
 *                type: string
 *                example: Fest
 *              active:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Creado correctamente
 *      400:
 *        description: ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      403:
 *        description: Usuario no habilitado para esta operación.
 *      404:
 *        description: error al mostrar los types
 */
router.post("/create",verifyToken,adminRole,newType);

/**
 * @openapi
 * paht:
 * /api/type/uploadphoto/{idType}:
 *   post:
 *    summary: Carga una foto al tipo de evento
 *    description: Debes estár logueado con el usuario administrador para poder cargar una foto al tipo de evento.
 *    tags:
 *      - type
 *    parameters:
 *      - in: header
 *        name: authorization
 *        schema:
 *          type: string
 *          example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *        required: true
 *        description: Token del usuario. 
 *      - id: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          example: 2
 *        description: id del type a modificar
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
 *        description: ocurrió un error en el backend
 *      401:
 *        description: Usuario no autorizado.
 *      403:
 *        description: Usuario no habilitado para esta operación.
 *      404:
 *        description: Tipo de evento no ecnontrado
 */
router.post("/uploadphoto/:idType",verifyToken,adminRole,upload(),uploadPhoto)

module.exports = router;