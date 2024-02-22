const express = require("express");
const datosController = require("../controller/datosController");
const rutaDatos = express.Router();

rutaDatos.get('/Read',datosController.Get);

rutaDatos.post('/Create',datosController.Post);

rutaDatos.get('/Read/:id',datosController.getUpdate);

rutaDatos.put('/Update/:id',datosController.Put);

rutaDatos.delete('/Delete/:id',datosController.Delete);

module.exports = rutaDatos