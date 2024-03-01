const express = require("express");
const datosController = require("../../controllers/mod_inventario_c/productosController");
const rutaDatos = express.Router();

rutaDatos.get("/Datos", datosController.Datos);
rutaDatos.get("/productoNombre/:nombre", datosController.getProductoNombre);
rutaDatos.delete("/BorrarDato/:id", datosController.BorrarDato);
rutaDatos.get("/BuscarDatoPorId/:id", datosController.BuscarDatoPorId);
rutaDatos.put("/ActualizarProducto/:id", datosController.ActualizarProducto);

rutaDatos.post("/AgregarProducto", datosController.AgregarProducto);

module.exports = rutaDatos;
