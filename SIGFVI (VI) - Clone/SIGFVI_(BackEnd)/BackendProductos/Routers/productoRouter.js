const express = require("express");
const productosController = require("../Controllers/productosController");
const rutaDatos = express.Router();

rutaDatos.get("/Datos", productosController.Datos);
rutaDatos.delete("/BorrarDato/:id", productosController.BorrarDato);
rutaDatos.delete("/BorrarInventario/:id", productosController.BorrarInventario);
rutaDatos.get("/BuscarDatoPorId/:id", productosController.BuscarDatoPorId);
rutaDatos.put("/ActualizarProducto/:id", productosController.ActualizarProducto);
rutaDatos.post("/AgregarProducto", productosController.AgregarProducto);

rutaDatos.get("/VerificarDuplicado/:id", productosController.VerificarDuplicado);

module.exports = rutaDatos;
