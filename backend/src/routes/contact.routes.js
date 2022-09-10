const Router = require('express');
const router = Router();

const { createContact, viewAll, view, notRead, deleteContact } = require('../contrtoller/contact.controller')
const { validateContact } = require('../validators/validations')
const { adminRole, verifyToken } = require('../validators/auth')



/**
 * @openapi
 * path:
 * /api/contact/views:
 *   get:
 *     summary: Lista todos los mensajes de contacto.
 *     description: Debes estár logueado con el usuario administrador para poder ver los mensajes.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *     responses:
 *         200:
 *           description: Devuelve listado de mensajes de contacto. 
 *         400:
 *           description: Ocurrió un error en el backend.
 *         401:
 *           description: Usuario no autorizado.
 *         403:
 *           description: Usuario no habilitado para esta operación.
 *         404:
 *           description: No se encontraron mensajes.
 */
router.get("/views",verifyToken,adminRole,viewAll)

/**
 * @openapi
 * path:
 * /api/contact/views/{id}:
 *   get:
 *     summary: lista informacion de un mensaje de contacto.
 *     description: Debes estár logueado con el usuario administrador para poder ver el mensaje.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID del mensaje de contacto
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *     responses:
 *         200:
 *           description: Devuelve el mensaje. 
 *         400:
 *           description: Ocurrió un error en el backend.
 *         401:
 *           description: Usuario no autorizado.
 *         403:
 *           description: Usuario no habilitado para esta operación.
 *         404:
 *           description: no se encontro el mensaje.
 */
router.get("/view/:id",verifyToken,adminRole,view)

/**
 * @openapi
 * path:
 * /api/contact/create:
 *   post:
 *     summary: Crea un nuevo mensaje.
 *     description: Crea un nuevo mensaje.
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
 *                 example: false
 *               date:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *     responses:
 *         201:
 *           description: Mensaje creado exitosamente
 *         400:
 *           description: Ocurrió un error en el backend
 *         404:
 *           description: Mensaje no creado
 */
router.post("/create",createContact)

/**
 * @openapi
 * path:
 * /api/contact/notread/{id}:
 *   patch:
 *     summary: Actualiza un mensaje.
 *     description: Cambia el estado de un mensaje entre leido y no leido, debes estár logueado con el administrador.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
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
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         403:
 *           description: Usuario no habilitado para esta operación.
 *         404:
 *           description: no se encontro el mensaje
 */
router.patch("/notread/:id",verifyToken,adminRole,notRead)

/**
 * @openapi
 * path:
 * /api/contact/{id}:
 *   delete:
 *     summary: elimina un mensaje.
 *     description: Debes estár logueado con el usuario administrador para eliminar un mensaje.
 *     tags:
 *       - contacts
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID del mensaje
 *     responses:
 *         200:
 *           description: Mensaje eliminado correctamente
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         403:
 *           description: Usuario no habilitado para esta operación.
 *         404:
 *           description: Error al eliminar mensaje
 */
router.delete("/delete/:id",verifyToken,adminRole,deleteContact)

module.exports=router