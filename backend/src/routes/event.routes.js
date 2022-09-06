const Router = require('express');
const router = Router();
const upload = require('../config/images.config')

const { showAll, showEvent, createEvent, uploadPhoto, updateEvent, destroyEvent, showAllAdmin, eventscreatedbyuser, eventsfollowedbyuser } = require('../contrtoller/event.controller');
const { verifyToken }=require('../validators/auth')


/**
 * @openapi
 * path:
 * /events/views:
 *   get:
 *     description: Listado de todos los eventos.
 *     summary: Listado de todos los eventos.
 *     tags:
 *       - events
 *     responses:
 *         200:
 *           description: Devuelve listado de eventos
 *         404:
 *           description: Algo salió mal al intentar obtener datos
 */
router.get("/views",showAll)

/**
 * @openapi
 * path:
 * /event/views/admin:
 *   get:
 *     description: Lista unicamente los IDs y titulos de todos los eventos.
 *     summary: Lista unicamente los IDs y titulos de todos los eventos.
 *     tags:
 *       - events
 *     responses:
 *         200:
 *           description: Devuelve listado de IDs y titulos de eventos
 *         404:
 *           description: Algo salió mal al intentar obtener datos
 */
router.get("/views/admin",showAllAdmin)

/**
 * @openapi
 * path:
 * /event/view/{id}:
 *   get:
 *     description: Lista toda la información de un evento.
 *     summary: Lista toda la información de un evento.
 *     tags:
 *       - events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del evento
 *     responses:
 *         200:
 *           description: Devuelve toda la informacion de un evento
 *         404:
 *           description: Algo salió mal al intentar obtener datos
 */
router.get("/view/:id",showEvent)

/**
 * @openapi
 * path:
 * /event/eventscreatedbyuser/{id}:
 *   get:
 *     description: Lista todos los eventos creados por un usuario.
 *     summary: Lista todos los eventos creados por un usuario.
 *     tags:
 *       - events
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del usuario
 *     responses:
 *         200:
 *           description: Devuelve listado de eventos creados por un usuario. 
 *         404:
 *           description: Algo salió mal al intentar obtener datos.
 */
router.get("/eventscreatedbyuser/:idUser",verifyToken,eventscreatedbyuser)

/**
 * @openapi
 * path:
 * /event/eventsfollowedbyuser/{idUser}:
 *   get:
 *     description: Lista todos los eventos al que un usuario se anotó.
 *     summary: Lista todos los eventos al que un usuario se anotó.
 *     tags:
 *       - events
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del usuario
 *     responses:
 *         200:
 *           description: Devuelve listado de eventos al que un usuario se anotó. 
 *         404:
 *           description: Algo salió mal al intentar obtener datos.
 */
router.get("/eventsfollowedbyuser/:idUser",verifyToken,eventsfollowedbyuser)

/**
 * @openapi
 * path:
 * /event/update:
 *   patch:
 *     description: Actualiza un evento.
 *     summary: Actualiza un evento.
 *     tags:
 *       - events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
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
 *                 example: Virtual
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
 *                 type: number
 *                 example: 1200
 *               init_date:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *               idType:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *               cancelled:
 *                 type: boolean
 *                 example: true
 *     responses:
 *         200:
 *           description: Evento actualizado correctamente
 *         404:
 *           description: Usuario sin permisos
 *         400:
 *           description: Algo salió mal al intentar actualizar el evento
 */
 router.patch("/update",verifyToken,updateEvent)


/**
 * @openapi
 * path:
 * /event/create:
 *   post:
 *     description: Crea un nuevo evento.
 *     summary: Crea un nuevo evento.
 *     tags:
 *       - events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 format: varchar
 *                 example: Evento numero 1
 *               description:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Descripcion de evento numero 1
 *               mode:
 *                 type: string
 *                 format: varchar(20)
 *                 example: Virtual
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
 *                 type: number
 *                 example: 1200
 *               init_date:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *               idType:
 *                 type: string
 *                 format: varchar(255)
 *                 example: Wed Sep 25 2022 12:00:00 GMT-0300 (hora estándar de Argentina)
 *     responses:
 *         200:
 *           description: Evento creado correctamente
 *         400:
 *           description: Error al crear evento
 *         404:
 *           description: Algo salió mal al intentar crear el evento
 */
router.post("/create",verifyToken,createEvent)

/**
 * @openapi
 * path:
 * /event/uploadphoto/{idEvent}:
 *   post:
 *     description: Actualiza la foto de un evento.
 *     summary: Actualiza la foto de un evento.
 *     tags:
 *       - events
 *     parameters:
 *       - in: path
 *         name: idEvent
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *         200:
 *           description: Foto de evento actualizado correctamente
 *         400:
 *           description: Error al actualizar evento
 *         404:
 *           description: Algo salió mal al intentar actualizar el evento
 */
router.post("/uploadphoto/:idEvent",verifyToken,upload(),uploadPhoto)

/**
 * @openapi
 * path:
 * /event/delete/{id}:
 *   delete:
 *     description: Actualiza la foto de un evento.
 *     summary: Actualiza la foto de un evento.
 *     tags:
 *       - events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: int(11)
 *         description: ID del evento
 *     responses:
 *         200:
 *           description: Evento eliminado correctamente
 *         400:
 *           description: Usuario sin permisos
 *         404:
 *           description: Algo salió mal al intentar eliminar el evento
 */
router.delete("/delete/:id",verifyToken,destroyEvent)

module.exports = router;