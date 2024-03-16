const express = require('express');
const graficasController = require('../../controllers/mod_dashboard_graficas/Controllergraficas');
const rutaGraficas = express.Router();


rutaGraficas.get('/productosstock', graficasController.getProductoStock);
rutaGraficas.get('/prodvendido', graficasController.prodmasVendidos);
rutaGraficas.get('/stockbajo', graficasController.productosStockBajo);

module.exports = rutaGraficas;
