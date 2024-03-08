/*
    * Rutas para la gestión de los Métodos de Pago.
    * Modulo de Ventas.
*/

const express = require('express');
const metodoDePagoController = require('../../controllers/mod_ventas_facturacion/metodoDePagoController')

const router = express.Router(); // -  Router.

// MOSTRAR METODOS DE PAGO:
router.get('/metodopagos', metodoDePagoController.getMetodoPagos)

// MOSTRAR MEDOTOD DE PAGO POR ID:
router.get('/metodopago/:id', metodoDePagoController.getMetodoPagoId)

// CREAR NUEVO METODO DE PAGO:
router.post('/metodopago', metodoDePagoController.createMetodoPago)

// ACTUALIZAR METODO DE PAGO:
router.put('/metodopagoActualizar/:id', metodoDePagoController.updateMetodoPago)

// ELIMINAR METODO DE PAGO:
router.delete('/metodopagoEliminar/:id', metodoDePagoController.deleteMetodoPago)

module.exports = router;