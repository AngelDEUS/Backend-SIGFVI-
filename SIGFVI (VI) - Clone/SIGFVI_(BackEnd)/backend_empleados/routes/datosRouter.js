const express = require("express");
const usuarioController = require("../controller/datosController"); // Corregido de 'datosContoller' a 'datosController'
const rutaUsuarios = express.Router();

rutaUsuarios.get("/", usuarioController.obtenerUsuarios);
rutaUsuarios.get("/:id", usuarioController.obtenerUsuarioPorId);
rutaUsuarios.post("/crear", usuarioController.crearUsuario);
rutaUsuarios.put("/actualizar/:id", usuarioController.actualizarUsuario);
rutaUsuarios.delete("/eliminar/:id", usuarioController.eliminarUsuario);

module.exports = rutaUsuarios;
