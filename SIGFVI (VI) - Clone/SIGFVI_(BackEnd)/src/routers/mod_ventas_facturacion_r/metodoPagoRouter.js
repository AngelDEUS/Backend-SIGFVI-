/*
    // Rutas para la gestión de los Métodos de Pago.
    // Modulo de Ventas.
*/ 

const express = require('express');
const metodoDePagoController = require('../../controllers/mod_ventas_facturacion/metodoDePagoController');

const router = express.Router(); // Router.

/**
 * @swagger
 * /metodopagos:
 *   get:
 *     summary: Obtener todos los métodos de pago
 *     description: Obtiene todos los métodos de pago disponibles.
 *     tags: [Método de Pago]
 *     responses:
 *       200:
 *         description: Lista de métodos de pago obtenida correctamente
 *       500:
 *         description: Error al obtener los métodos de pago
 */
router.get('/metodopagos', metodoDePagoController.getMetodoPagos);

/**
 * @swagger
 * /metodopago/{id}:
 *   get:
 *     summary: Obtener un método de pago por ID
 *     description: Obtiene un método de pago específico por su ID.
 *     tags: [Método de Pago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del método de pago a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Método de pago obtenido correctamente
 *       500:
 *         description: Error al obtener el método de pago por ID
 */
router.get('/metodopago/:id', metodoDePagoController.getMetodoPagoId);

/**
 * @swagger
 * /metodopagoNombre/{nombre}:
 *   get:
 *     summary: Buscar métodos de pago por nombre
 *     description: Busca métodos de pago que coincidan parcialmente con el nombre especificado.
 *     tags: [Método de Pago]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del método de pago a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Métodos de pago encontrados correctamente
 *       500:
 *         description: Error al buscar métodos de pago por nombre
 */
router.get('/metodopagoNombre/:nombre', metodoDePagoController.getMetodoPagoNombre);

/**
 * @swagger
 * /metodopago:
 *   post:
 *     summary: Crear un nuevo método de pago
 *     description: Crea un nuevo método de pago con la información proporcionada.
 *     tags: [Método de Pago]
 *     requestBody:
 *       description: Datos del nuevo método de pago
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre_Metodo:
 *                 type: string
 *                 description: Nombre del método de pago
 *               Tipo_Metodo_Pago:
 *                 type: string
 *                 description: Tipo del método de pago
 *               Referencia:
 *                 type: string
 *                 description: Referencia del método de pago
 *               ID_Estado_FK:
 *                 type: integer
 *                 description: ID del estado del método de pago
 *     responses:
 *       200:
 *         description: Método de pago creado correctamente
 *       500:
 *         description: Error al crear el método de pago
 */
router.post('/metodopago', metodoDePagoController.createMetodoPago);

/**
 * @swagger
 * /metodopagoActualizar/{id}:
 *   put:
 *     summary: Actualizar un método de pago existente
 *     description: Actualiza la información de un método de pago existente por su ID.
 *     tags: [Método de Pago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del método de pago a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nuevos datos del método de pago
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre_Metodo:
 *                 type: string
 *                 description: Nuevo nombre del método de pago
 *               Tipo_Metodo_Pago:
 *                 type: string
 *                 description: Nuevo tipo del método de pago
 *               Referencia:
 *                 type: string
 *                 description: Nueva referencia del método de pago
 *               ID_Estado_FK:
 *                 type: integer
 *                 description: Nuevo ID del estado del método de pago
 *     responses:
 *       200:
 *         description: Método de pago actualizado correctamente
 *       500:
 *         description: Error al actualizar el método de pago
 */
router.put('/metodopagoActualizar/:id', metodoDePagoController.updateMetodoPago);

/**
 * @swagger
 * /metodopagoEliminar/{id}:
 *   delete:
 *     summary: Eliminar un método de pago existente
 *     description: Elimina un método de pago existente por su ID.
 *     tags: [Método de Pago]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del método de pago a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Método de pago eliminado correctamente
 *       500:
 *         description: Error al eliminar el método de pago
 */
router.delete('/metodopagoEliminar/:id', metodoDePagoController.deleteMetodoPago);

module.exports = router;
