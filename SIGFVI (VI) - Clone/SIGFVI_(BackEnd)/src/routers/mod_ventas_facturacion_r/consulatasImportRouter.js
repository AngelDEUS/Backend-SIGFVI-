/*
    * Router de las Consultas usadas en el módulo de ventas.
*/

const express = require("express");
const consultasController = require("../../controllers/mod_ventas_facturacion/consultasVentaController");
const deudorConsultasController = require("../../controllers/mod_ventas_facturacion/consultasDeudorVentas");
const rutasConsultas = express.Router();


rutasConsultas.get("/productosparaventas", consultasController.ObtenerProductosVenta);
// buscar productos por nombre
rutasConsultas.get("/buscarpornombreparaventas/:nombre", consultasController.BuscarProductoPorNombre);
// buscar productos por ID
rutasConsultas.get("/buscarporidparaventas/:id", consultasController.BuscarProductoPorID);

// Consultas para los deudores en ventas.
rutasConsultas.get('/buscardeudorventa', deudorConsultasController.getAllDeudoresVentas);
// Consultas deudores por ID en ventas.
rutasConsultas.get('/buscariddeudorventa/:id', deudorConsultasController.getIDDeudoresVentas);
// Consultas para los deudores en ventas.
rutasConsultas.get('/buscarnomdeudorventa/:nombre', deudorConsultasController.getNombreDeudoresVentas);

module.exports = rutasConsultas;
