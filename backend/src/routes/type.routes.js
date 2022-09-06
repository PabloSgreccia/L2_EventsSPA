const Router = require('express');
const router = Router();
const upload = require('../config/images.config')

const { showAll, newType, deleteType, update, uploadPhoto }  = require('../contrtoller/type.controller');
const { adminRole, verifyToken }=require('../validators/auth')

/**
 * @openapi
 * paht:
 * /type/views:
 *   get:
 *    description: Muestra al admin todos los types creados
 *    summary: Muestra al admin todos los types creados
 *    tags:
 *      - type
 *    responses:
 *      200:
 *        description: devuelve los atributos de todos los type
 *      404:
 *        description: error al mostrar los types
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.get("/views",verifyToken,showAll);
/**
 * @openapi
 * paht:
 * /type/create:
 *   post:
 *    description: El admin crea un nuevo type
 *    summary: El admin crea un nuevo type
 *    tags:
 *      - type
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: oject
 *            properties:
 *              type:
 *                type: string
 *                example: Fest
 *    responses:
 *      200:
 *        description: Creado correctamente
 *      404:
 *        description: No se recibieron los datos
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/create",verifyToken,adminRole,newType);
/**
 * @openapi
 * paht:
 * /type/update/:id:
 *   patch:
 *    description: El admin actualiza un tipo
 *    summary: El admin actualiza un tipo
 *    tags:
 *      - type
 *    parameters:
 *      - id: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: id del type a modificar
 *    responses:
 *      200:
 *        description: Devuelve los atributos del type editado
 *      404:
 *        description: Tipo no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/update/:id",verifyToken,adminRole,update)

/**
 * @openapi
 * paht:
 * /type/update/:id:
 *   patch:
 *    description: El admin elimina a un tipo
 *    summary: El admin elimina a un tipo
 *    tags:
 *      - type
 *    parameters:
 *      - id: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *        description: id del type a modificar
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: oject
 *            properties:
 *              active:
 *                type: boolean
 *                format: tinyint(255)
 *                example: true
 *    responses:
 *      200:
 *        description: Devuelve los atributos del type creado
 *      404:
 *        description: Tipo no encontrado
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.patch("/delete/:id",verifyToken,adminRole,deleteType);
/**
 * @openapi
 * paht:
 * /type/uploadphoto/:idType:
 *   post:
 *    description: Carga una foto al type
 *    summary: Carga una foto al type
 *    tags:
 *      - type
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: oject
 *            properties:
 *              photo:
 *                profileImage:
 *                  type: string
 *                  format: binary
 *    responses:
 *      200:
 *        description: Foto agregada correctamente
 *      404:
 *        description: Error en la actualización de la foto
 *      400:
 *        description: Devuelve el mensaje de error del catch
 */
router.post("/uploadphoto/:idType",verifyToken,upload(),uploadPhoto)

module.exports = router;