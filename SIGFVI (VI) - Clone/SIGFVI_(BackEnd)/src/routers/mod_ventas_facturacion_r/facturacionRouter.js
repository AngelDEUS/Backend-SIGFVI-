/*
    * Router del módulo de Facturacion.
*/


const express = require('express');
const facturacionController = require('../../controllers/mod_ventas_facturacion/facturacion_controlador/facturacionController');

const routerFactura = express.Router(); // -  Router.

routerFactura.post("/crearfactura", facturacionController.createFactura);
routerFactura.post("/creardetallefactura", facturacionController.createDetalleFactura);

module.exports = routerFactura;