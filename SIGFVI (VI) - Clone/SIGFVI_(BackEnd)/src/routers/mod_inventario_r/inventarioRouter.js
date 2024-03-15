const express = require("express");
const inventario = require("../../controllers/mod_inventario_c/inventarioCroller");
const rutaDatosInventario = express.Router();

rutaDatosInventario.get("/consultaInventario", inventario.consultaDatos);
rutaDatosInventario.post("/reportarProducto", inventario.reportarProducto);
rutaDatosInventario.post("/registrarEntrada", inventario.registrarEntradaProducto);

module.exports = rutaDatosInventario;