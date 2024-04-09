/*
    * Router del modulo de ventas.
*/

const express = require('express');
const pedidosController = require('../../controllers/mod_ventas_facturacion/pedidosController'); // - Controlador de Ventas

const router = express.Router(); // -  Router.

// MOSTRAR VENTAS:
/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Retorna todos los pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pedido'
 */
router.get('/pedidos', pedidosController.getPedidos);

// MOSTRAR VENTAS POR ID:
/**
 * @swagger
 * /pedido/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna el pedido solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 */
router.get('/pedido/:id', pedidosController.getPedidoId);

// CREAR VENTA:
/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido creado exitosamente
 *       500:
 *         description: Error al crear el pedido
 */
router.post('/pedido',pedidosController.createPedidos);

// ACTUALIZAR VENTA:
/**
 * @swagger
 * /pedidoActualizar/{id}:
 *   put:
 *     summary: Actualizar un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       500:
 *         description: Error al actualizar el pedido
 */
router.put('/pedidoActualizar/:id', pedidosController.updatePedido);

// ELIMINAR VENTA:
/**
 * @swagger
 * /pedidoEliminar/{id}:
 *   delete:
 *     summary: Eliminar un pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *       500:
 *         description: Error al eliminar el pedido
 */
router.delete('/pedidoEliminar/:id', pedidosController.deletePedidoId);

module.exports = router;