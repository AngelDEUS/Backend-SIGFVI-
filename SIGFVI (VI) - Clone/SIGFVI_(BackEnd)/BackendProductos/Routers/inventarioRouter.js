const express = require("express");
const Consulta = require("../Controllers/consultas/Controller");
const rutaDatosInventario = express.Router();

rutaDatosInventario.get("/consultaInventario", Consulta.consultaDatos);


module.exports = rutaDatosInventario;