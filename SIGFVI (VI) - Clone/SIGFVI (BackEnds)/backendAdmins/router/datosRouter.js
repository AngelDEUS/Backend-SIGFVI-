const express = require("express");
const datosController = require("../controller/datosController");
const datosDeudores = require("../controller/datosDeudores");
const rutaDatos = express.Router();

rutaDatos.get('/Read',datosController.Get);

rutaDatos.post('/Create',datosController.Post);

rutaDatos.get('/Read/:id',datosController.getUpdate);

rutaDatos.put('/Update/:id',datosController.Put);

rutaDatos.delete('/Delete/:id',datosController.Delete);

rutaDatos.get('/consdeudor',datosDeudores.consultaDeudor);

rutaDatos.post('/createdeudor',datosDeudores.crearDeudor);

rutaDatos.put("/updatedeudor/:id",datosDeudores.updateDeudor);

rutaDatos.delete("/deletedeudor/:id",datosDeudores.deleteDeudor);

rutaDatos.put('/updatesaldo/:id',datosDeudores.cambioSaldoDeudor);

rutaDatos.put('/cambiarestado/:id',datosDeudores.cambioEstado);

rutaDatos.put('/cambioestadoadmin/:id',datosController.cambioEstadoAdmin);

module.exports = rutaDatos