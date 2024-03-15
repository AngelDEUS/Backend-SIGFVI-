const express = require("express");
const informesController = require("../../controllers/mod_informes_c/controllerinformes");
const rutaInformes = express.Router();

rutaInformes.get("/informeDeudor", informesController.consultaDeudor);
rutaInformes.get("/informeVenta", informesController.ObtenerProductosVenta);
rutaInformes.get("/informeInventario", informesController.consultaDatos);
rutaInformes.get("/informeEmpleado", informesController.obtenerUsuarios);

module.exports = rutaInformes;


