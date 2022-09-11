const Router = require('express');
const router = Router();
const upload = require('../config/images.config')

const { showAll, showEvent, createEvent, uploadPhoto, updateEvent, destroyEvent, showAllAdmin, eventscreatedbyuser, eventsfollowedbyuser } = require('../contrtoller/event.controller');
const { verifyToken, adminRole }=require('../validators/auth')


/**
 * @openapi
 * path:
 * /api/event/views:
 *   get:
 *     summary: Listado de todos los eventos.
 *     description: Listado de todos los eventos.
 *     tags:
 *       - events
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
 *           description: Devuelve listado de eventos
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 */
router.get("/views",verifyToken,showAll)

/**
 * @openapi
 * path:
 * /api/event/views/admin:
 *   get:
 *     summary: Lista los IDs y titulos de todos los eventos creados.
 *     description: Debes estár logueado con el usuario administrador para poder acceder a esta información.
 *     tags:
 *       - events
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
 *           description: Devuelve listado de IDs y titulos de eventos
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         403:
 *           description: Usuario no habilitado para esta operación.
 */
router.get("/views/admin",verifyToken,adminRole,showAllAdmin)

/**
 * @openapi
 * path:
 * /api/event/view/{id}:
 *   get:
 *     summary: Lista toda la información de un evento.
 *     description: Lista toda la información de un evento.
 *     tags:
 *       - events
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
 *         description: ID del evento
 *     responses:
 *         200:
 *           description: Devuelve toda la informacion de un evento
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: Algo salió mal al intentar obtener datos
 */
router.get("/view/:id",verifyToken,showEvent)

/**
 * @openapi
 * path:
 * /api/event/eventscreatedbyuser/{idUser}:
 *   get:
 *     summary: Lista todos los eventos creados por un usuario.
 *     description: Lista todos los eventos creados por un usuario.
 *     tags:
 *       - events
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID del usuario
 *     responses:
 *         200:
 *           description: Devuelve listado de eventos creados por un usuario. 
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: Algo salió mal al intentar obtener datos.
 */
router.get("/eventscreatedbyuser/:idUser",verifyToken,eventscreatedbyuser)

/**
 * @openapi
 * path:
 * /api/event/eventsfollowedbyuser/{idUser}:
 *   get:
 *     summary: Lista todos los eventos al que un usuario se anotó.
 *     description: Lista todos los eventos al que un usuario se anotó.
 *     tags:
 *       - events
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID del usuario
 *     responses:
 *         200:
 *           description: Devuelve listado de eventos al que un usuario se anotó. 
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: Algo salió mal al intentar obtener datos.
 */
router.get("/eventsfollowedbyuser/:idUser",verifyToken,eventsfollowedbyuser)

/**
 * @openapi
 * path:
 * /api/event/update:
 *   patch:
 *     summary: Actualiza un evento.
 *     description: Actualiza un evento.
 *     tags:
 *       - events
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 format: varchar(40)
 *                 example: Evento numero 1
 *               description:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Descripcion de evento numero 1
 *               mode:
 *                 type: string
 *                 format: varchar(20)
 *                 example: Mixed
 *               province:
 *                 type: string
 *                 format: varchar(100)
 *                 example: Santa Fe
 *               city:
 *                 type: string
 *                 format: varchar(100)
 *                 example: Rosario
 *               street:
 *                 type: string
 *                 format: varchar(30)
 *                 example: Presidente Roca
 *               link:
 *                 type: string
 *                 format: varchar(30)
 *                 example: www.google.com
 *               number:
 *                 type: integer
 *                 example: 1200
 *               init_date:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *               end_date:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 15:00:00 GMT-0300 (hora estándar de Argentina)
 *               idType:
 *                 type: integer
 *                 example: 1
 *               cancelled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *         200:
 *           description: Evento actualizado correctamente
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: Evento no encontrado
 */
 router.patch("/update",verifyToken,updateEvent)


/**
 * @openapi
 * path:
 * /api/event/create:
 *   post:
 *     summary: Crea un nuevo evento.
 *     description: Se debe enviar un FormData que contenga las variables especificadas debajo bajo el identificador "payload".
 *     tags:
 *       - events
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: object
 *                 required: true
 *                 properties:
 *                   title:
 *                     type: string
 *                     format: varchar
 *                     example: Evento numero 1
 *                   description:
 *                     type: string
 *                     format: varchar(255)
 *                     example: Descripcion de evento numero 1
 *                   mode:
 *                     type: string
 *                     format: varchar(20)
 *                     example: Mixed
 *                   province:
 *                     type: string
 *                     format: varchar(100)
 *                     example: Santa Fe
 *                   city:
 *                     type: string
 *                     format: varchar(100)
 *                     example: Rosario
 *                   street:
 *                     type: string
 *                     format: varchar(30)
 *                     example: Presidente Roca
 *                   link:
 *                     type: string
 *                     format: varchar(30)
 *                     example: www.google.com
 *                   number:
 *                     type: integer
 *                     example: 1200
 *                   init_date:
 *                     type: string
 *                     format: varchar(255)
 *                     example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *                   end_date:
 *                     type: string
 *                     format: varchar(255)
 *                     example: Wed Sep 25 2022 15:00:00 GMT-0300 (hora estándar de Argentina)
 *                   idType:
 *                     type: integer
 *                     example: 1
 *     responses:
 *         200:
 *           description: Evento creado correctamente
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: Algo salió mal al intentar crear el evento
 */
router.post("/create",verifyToken,createEvent)

/**
 * @openapi
 * path:
 * /api/event/uploadphoto/{idEvent}:
 *   post:
 *     summary: Actualiza la foto de un evento.
 *     description: Actualiza la foto de un evento.
 *     tags:
 *       - events
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *         required: true
 *         description: Token del usuario. 
 *       - in: path
 *         name: idEvent
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *         200:
 *           description: Foto de evento actualizada correctamente
 *         400:
 *           description: Ocurrió un error en el backend
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: Evento no encontrado
 */
router.post("/uploadphoto/:idEvent",verifyToken,upload(),uploadPhoto)

/**
 * @openapi
 * path:
 * /api/event/delete/{id}:
 *   delete:
 *     summary: Actualiza la foto de un evento.
 *     description: Actualiza la foto de un evento.
 *     tags:
 *       - events
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
 *         description: ID del evento
 *     responses:
 *         200:
 *           description: Evento eliminado correctamente
 *         400:
 *           description: Ocurrió un error en el backend.
 *         401:
 *           description: Usuario no autorizado.
 *         404:
 *           description: evento no encontrado
 */
router.delete("/delete/:id",verifyToken,destroyEvent)

module.exports = router;