/*
    * Router de las Consultas usadas en el módulo de ventas.
*/

const express = require("express");
const consultasController = require("../../controllers/mod_ventas_facturacion/consultasVentaController");
const rutasConsultas = express.Router();


rutasConsultas.get("/productosparaventas", consultasController.ObtenerProductosVenta);
// buscar productos por nombre
rutasConsultas.get("/buscarpornombreparaventas/:nombre", consultasController.BuscarProductoPorNombre);
// buscar productos por ID
rutasConsultas.get("/buscarporidparaventas/:id", consultasController.BuscarProductoPorID);

module.exports = rutasConsultas;
