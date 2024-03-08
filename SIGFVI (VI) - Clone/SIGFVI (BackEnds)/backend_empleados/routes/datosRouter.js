const express = require("express");
const usuarioController = require("../controller/datosController"); // Corregido de 'datosContoller' a 'datosController'
const rutaDatos = require("../../backendAdmins/router/datosRouter");
const rutaUsuarios = express.Router();

rutaUsuarios.get("/", usuarioController.obtenerUsuarios);
rutaUsuarios.get("/:id", usuarioController.obtenerUsuarioPorId);
rutaUsuarios.post("/crear", usuarioController.crearUsuario);
rutaUsuarios.put("/actualizar/:id", usuarioController.actualizarUsuario);
rutaUsuarios.delete("/eliminar/:id", usuarioController.eliminarUsuario);
rutaUsuarios.put("/cambioestadoempleado/:id",usuarioController.cambioEstadoEmpleado);

module.exports = rutaUsuarios;
