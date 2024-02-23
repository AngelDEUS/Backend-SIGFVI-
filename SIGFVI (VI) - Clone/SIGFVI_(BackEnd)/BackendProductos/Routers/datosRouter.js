const express = require("express");
const datosController = require("../Controllers/datosController");
const rutaDatos = express.Router();

rutaDatos.get("/Datos", datosController.Datos);
rutaDatos.delete("/BorrarDato/:id", datosController.BorrarDato);
rutaDatos.get("/BuscarDatoPorId/:id", datosController.BuscarDatoPorId);
rutaDatos.put("/ActualizarProducto/:id", datosController.ActualizarProducto);

rutaDatos.post("/AgregarProducto", datosController.AgregarProducto);

module.exports = rutaDatos;
