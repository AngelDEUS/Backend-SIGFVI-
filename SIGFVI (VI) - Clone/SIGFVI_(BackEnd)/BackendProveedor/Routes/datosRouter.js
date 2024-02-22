const express = require("express");
const proveedorController = require("../controllers/datosController");
const rutaProveedores = express.Router();

rutaProveedores.get("/", proveedorController.obtenerProveedores);
rutaProveedores.get("/:id", proveedorController.obtenerProveedorPorId);
rutaProveedores.post("/crear", proveedorController.crearProveedor);
rutaProveedores.put("/actualizar/:id", proveedorController.actualizarProveedor);
rutaProveedores.delete("/eliminar/:id", proveedorController.eliminarProveedor);

module.exports = rutaProveedores;


     