const Router = require('express');
const router = Router();

const { createContact, viewAll, view, notRead, deleteContact } = require('../contrtoller/contact.controller')
const { validateContact } = require('../validators/validations')
const { adminRole, verifyToken } = require('../validators/auth')



/**
 * @openapi
 * path:
 * /contact/views:
 *   get:
 *     description: Lista todos los mensajes de contacto.
 *     summary: Lista todos los mensajes de contacto.
 *     tags:
 *       - contacts
 *     responses:
 *         200:
 *           description: Devuelve listado de mensajes de contacto. 
 *         400:
 *           description: Algo salió mal al intentar obtener datos.
 *         404:
 *           description: Algo salió mal al intentar obtener datos.
 */
router.get("/views",verifyToken,adminRole,viewAll)

/**
 * @openapi
 * path:
 * /contact/views/{id}:
 *   get:
 *     description: lista informacion de un mensaje de contacto.
 *     summary: lista informacion de un mensaje de contacto.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del mensaje de contacto
 *     responses:
 *         200:
 *           description: Devuelve listado de mensajes de contacto. 
 *         400:
 *           description: Algo salió mal al intentar obtener datos.
 *         404:
 *           description: no se encontro el mensaje.
 */
router.get("/view/:id",verifyToken,adminRole,view)

/**
 * @openapi
 * path:
 * /contact/create:
 *   post:
 *     description: Crea un nuevo mensaje.
 *     summary: Crea un nuevo mensaje.
 *     tags:
 *       - contacts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 format: varchar(50)
 *                 example: Roberto Carlos
 *               description:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Olvide mi contraseña y no se como recuperarla.
 *               email:
 *                 type: string
 *                 format: varchar(100)
 *                 example: robertocarlos@ejemplo.com
 *               subject:
 *                 type: string
 *                 format: varchar(50)
 *                 example: Problema con contraseña
 *               read:
 *                 type: boolean
 *                 example: true
 *               date:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *     responses:
 *         200:
 *           description: Mensaje de contacto creado correctamente
 *         400:
 *           description: Error al crear
 *         404:
 *           description: Algo salió mal al intentar crear el registro
 */
router.post("/create",createContact)

/**
 * @openapi
 * path:
 * /contact/notread/{id}:
 *   post:
 *     description: Actualiza un mensaje.
 *     summary: Actualiza un mensaje.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del mensaje de contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               read:
 *                 type: boolean
 *                 example: true
 *     responses:
 *         200:
 *           description: Mensaje de actualizado correctamente
 *         400:
 *           description: Error al actualizar
 *         404:
 *           description: no se encontro el mensaje
 */
router.patch("/notread/:id",verifyToken,adminRole,notRead)

/**
 * @openapi
 * path:
 * /delete/{id}:
 *   delete:
 *     description: elimina un mensaje.
 *     summary: elimina un mensaje.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del mensaje
 *     responses:
 *         200:
 *           description: Mensaje eliminado correctamente
 *         400:
 *           description: Error al intentar borrar el mensaje
 *         404:
 *           description: Algo salió mal al intentar eliminar el evento
 */
router.delete("/delete/:id",verifyToken,adminRole,deleteContact)

module.exports=router