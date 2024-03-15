const express = require("express");
const Consulta = require("../../controllers/mod_inventario_c/inventarioCroller");
const rutaDatosInventario = express.Router();

rutaDatosInventario.get("/consultaInventario", Consulta.consultaDatos);

module.exports = rutaDatosInventario;