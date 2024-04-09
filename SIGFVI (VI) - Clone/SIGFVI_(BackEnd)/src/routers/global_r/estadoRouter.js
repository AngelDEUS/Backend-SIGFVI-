/*
    // Rutas para la gestión de los estados.
    // Modulo global.
*/ 

const express = require('express');
const metodoDePagoController = require('../../controllers/global_c/estadoController')

const router = express.Router(); // -  Router.


/**
 * @swagger
 * tags:
 *   name: Estados
 *   description: Endpoints para la gestión de estados.
 */

/**
 * @swagger
 * /estados:
 *   get:
 *     summary: Obtener todos los estados.
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: Éxito. Devuelve todos los estados.
 *       500:
 *         description: Error interno del servidor.
 */
// MOSTRAR ESTADO:
router.get('/estados', metodoDePagoController.getEstados);




/**
 * @swagger
 * /estado/{id}:
 *   get:
 *     summary: Obtener un estado por su ID.
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estado a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. Devuelve el estado correspondiente al ID proporcionado.
 *       404:
 *         description: Estado no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// MOSTRAR ESTADO POR ID:
router.get('/estado/:id', metodoDePagoController.getEstadoId);


/**
 * @swagger
 * /estado:
 *   post:
 *     summary: Crear un nuevo estado.
 *     tags: [Estados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del estado.
 *     responses:
 *       201:
 *         description: Estado creado exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
// CREAR NUEVO ESTADO:
router.post('/estado', metodoDePagoController.createEstado);


/**
 * @swagger
 * /estadoActualizar/{id}:
 *   put:
 *     summary: Actualizar un estado existente.
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estado a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del estado.
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente.
 *       404:
 *         description: Estado no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// ACTUALIZAR ESTADO:
router.put('/estadoActualizar/:id', metodoDePagoController.updateEstado);

/**
 * @swagger
 * /estadoEliminar/{id}:
 *   delete:
 *     summary: Eliminar un estado existente.
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del estado a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estado eliminado exitosamente.
 *       404:
 *         description: Estado no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
// ELIMINAR ESTADO:
router.delete('/estadoEliminar/:id', metodoDePagoController.deleteEstado);


module.exports = router;