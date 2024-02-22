const express = require("express");
const datosController = require("../Controllers/datosController");
const rutaDatos = express.Router();

rutaDatos.get("/Datos", datosController.Datos);
rutaDatos.delete("/BorrarDato/:id", datosController.BorrarDato);
rutaDatos.get("/BuscarDatoPorId/:id", datosController.BuscarDatoPorId);
rutaDatos.put("/ActualizarDato/:id", datosController.ActualizarDato);
rutaDatos.post("/AgregarProducto", datosController.AgregarProducto);

module.exports = rutaDatos;
