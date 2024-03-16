/*
    * Router del módulo de ventas.
*/

const express = require('express');
const pagarVentaController = require('../../controllers/mod_ventas_facturacion/pagarVentaController');
const ventaController = require('../../controllers/mod_ventas_facturacion/venta_controlador/ventaController');

const routerPagar = express.Router(); // -  Router.

// Consultas
routerPagar.get("/metodospagoactivo", pagarVentaController.getAllMetodoPagoActivo);
routerPagar.post("/crearventa", ventaController.createVenta);
routerPagar.post("/creardetalleventa", ventaController.createDetalleVenta);


module.exports = routerPagar;