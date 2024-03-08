/*
    * Router del modulo de ventas.
*/

const express = require('express');
const pedidosController = require('../../controllers/mod_ventas_facturacion/pedidosController'); // - Controlador de Ventas

const router = express.Router(); // -  Router.

// MOSTRAR VENTAS:
router.get('/pedidos', pedidosController.getPedidos);

// MOSTRAR VENTAS POR ID:
router.get('/pedido/:id', pedidosController.getPedidoId);

// CREAR VENTA:
router.post('/pedido',pedidosController.createPedidos);

// ACTUALIZAR VENTA:
router.put('/pedidoActualizar/:id', pedidosController.updatePedido);

// ELIMINAR VENTA:
router.delete('/pedidoEliminar/:id', pedidosController.deletePedidoId);

module.exports = router;