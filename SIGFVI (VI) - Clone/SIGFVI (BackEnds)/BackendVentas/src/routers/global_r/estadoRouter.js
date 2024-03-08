/*
    // Rutas para la gestión de los estados.
    // Modulo global.
*/ 

const express = require('express');
const metodoDePagoController = require('../../controllers/global_c/estadoController')

const router = express.Router(); // -  Router.

// MOSTRAR ESTADO:
router.get('/estados', metodoDePagoController.getEstados)

// MOSTRAR ESTADO POR ID:
router.get('/estado/:id', metodoDePagoController.getEstadoId)

// CREAR NUEVO ESTADO:
router.post('/estado', metodoDePagoController.createEstado)

// ACTUALIZAR ESTADO:
router.put('/estadoActualizar/:id', metodoDePagoController.updateEstado)

// ELIMINAR ESTADO:
router.delete('/estadoEliminar/:id', metodoDePagoController.deleteEstado)

module.exports = router;