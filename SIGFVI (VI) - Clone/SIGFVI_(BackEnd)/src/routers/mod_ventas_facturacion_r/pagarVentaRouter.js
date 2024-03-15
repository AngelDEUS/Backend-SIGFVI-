/*
    * Router del modulo de ventas.
*/

const express = require('express');
const pagarVentaController = require('../../controllers/mod_ventas_facturacion/pagarVentaController'); // - Controlador de Ventas

const routerPagar = express.Router(); // -  Router.

// Consultas
routerPagar.get("/metodospagoactivo", pagarVentaController.getAllMetodoPagoActivo);

// CRUD



module.exports = routerPagar;