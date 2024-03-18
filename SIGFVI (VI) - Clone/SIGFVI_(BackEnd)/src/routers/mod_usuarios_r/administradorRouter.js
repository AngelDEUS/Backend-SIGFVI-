const express = require("express");
const datosController = require("../../controllers/mod_usuarios_c/administradorController");
const datosDeudores = require("../../controllers/mod_usuarios_c/deudoresController");
const rutaDatos = express.Router();


/**
 * @swagger
 * /read:
 *   get:
 *     summary: Obtener usuarios
 *     tags: [Gerentes]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
rutaDatos.get('/read', datosController.Get);

/**
 * @swagger
 * /Read/{id}:
 *   get:
 *     summary: Obtener información de un usuario por ID
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 tipoId:
 *                   type: string
 *                 Nombre_Usuario:
 *                   type: string
 *                 Segundo_Nombre_Usuario:
 *                   type: string
 *                 Apellido_Usuario:
 *                   type: string
 *                 Segundo_Apellido_Usuario:
 *                   type: string
 *                 Numero_Contacto_Usuario:
 *                   type: string
 *                 Email_Usuario:
 *                   type: string
 *                 Password_Usuario:
 *                   type: string
 */
rutaDatos.get('/Read/:id', datosController.getUpdate);

/**
 * @swagger
 * /Create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Gerentes]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "444444"
 *               tipoid:
 *                 type: integer
 *                 example: 1
 *               name1:
 *                 type: string
 *                 example: "teuhs"
 *               name2:
 *                 type: string
 *                 example: "2"
 *               lastname1:
 *                 type: string
 *                 example: "con hash"
 *               lastname2:
 *                 type: string
 *                 example: "x"
 *               cel:
 *                 type: string
 *                 example: "3104552885"
 *               email:
 *                 type: string
 *                 example: "admon@gmail.com"
 *               contrasena:
 *                 type: string
 *                 example: "2001"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Datos agregados exitosamente"
 */
rutaDatos.post('/Create', datosController.Post);

/**
 * @swagger
 * /Update/{id}:
 *   put:
 *     summary: Actualizar información de un usuario por ID
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name1:
 *                 type: string
 *                 example: "rest"
 *               name2:
 *                 type: string
 *                 example: "rest"
 *               lastname1:
 *                 type: string
 *                 example: "rest"
 *               lastname2:
 *                 type: string
 *                 example: "rest"
 *               cel:
 *                 type: string
 *                 example: "888888"
 *               email:
 *                 type: string
 *                 example: "rest@rest"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Actualizacion realizada"
 */
rutaDatos.put('/Update/:id', datosController.Put);


/**
 * @swagger
 * /desactivarestadoadmin/{id}:
 *   put:
 *     summary: Cambiar el estado de un usuario por ID (solo para administradores)
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado cambiado correctamente"
 */
rutaDatos.put('/desactivarestadoadmin/:id', datosController.desactivarEstadoAdmin);

/**
 * @swagger
 * /activarestadoadmin/{id}:
 *   put:
 *     summary: Cambiar el estado de un usuario por ID (solo para administradores)
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado cambiado correctamente"
 */
rutaDatos.put('/activarestadoadmin/:id',datosController.activarEstadoAdmin);

/**
 * @swagger
 * /autenticar:
 *   post:
 *     summary: Autenticar un usuario por ID y contraseña
 *     tags: [Gerentes]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEntra:
 *                 type: string
 *               contrasenaEntra:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 */
rutaDatos.post('/autenticar', datosController.autenticarUser);

/**
 * @swagger
 * /Delete/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Gerentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado correctamente"
 */
rutaDatos.delete('/Delete/:id', datosController.Delete);

/**
 * @swagger
 * /consdeudor:
 *   get:
 *     summary: Obtener información de deudores
 *     tags: [Deudor]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Deudor'
 */
rutaDatos.get('/consdeudor', datosDeudores.consultaDeudor);

/**
 * @swagger
 * paths:
 *   /createdeudor:
 *     post:
 *       summary: Crear un nuevo deudor
 *       tags:
 *         - Deudor
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   format: int64
 *                   example: 5855
 *                 name1:
 *                   type: string
 *                   example: "deudor"
 *                 name2:
 *                   type: string
 *                   example: "tales"
 *                 lastname1:
 *                   type: string
 *                   example: "ashe"
 *                 lastname2:
 *                   type: string
 *                   example: "deudor"
 *                 address:
 *                   type: string
 *                   example: "carrera tales transversal"
 *                 tel:
 *                   type: string
 *                   example: "3102427741"
 *                 saldo:
 *                   type: number
 *                   example: 0
 *       responses:
 *         200:
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Datos ingresados correctamente"
 */
rutaDatos.post('/createdeudor', datosDeudores.crearDeudor);


/**
 * @swagger
 * /updatedeudor/{id}:
 *   put:
 *     summary: Actualizar información de un deudor por ID
 *     tags: [Deudor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del deudor
 *         schema:
 *           type: integer
 *           example: 5855
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name1:
 *                 type: string
 *                 example: "xdd"
 *               name2:
 *                 type: string
 *                 example: "xdd"
 *               lastname1:
 *                 type: string
 *                 example: "xdd"
 *               lastname2:
 *                 type: string
 *                 example: "xddd"
 *               address:
 *                 type: string
 *                 example: "carrera tales transversal"
 *               tel:
 *                 type: string
 *                 example: "3102427741"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Actualizacion realizada"
 */
rutaDatos.put('/updatedeudor/:id', datosDeudores.updateDeudor);

/**
 * @swagger
 * /deletedeudor/{id}:
 *   delete:
 *     summary: Eliminar un deudor por ID
 *     tags: [Deudor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del deudor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos eliminados correctamente"
 */
rutaDatos.delete('/deletedeudor/:id', datosDeudores.deleteDeudor);

/**
 * @swagger
 * /updatesaldo/{id}:
 *   put:
 *     summary: Actualizar saldo de un deudor por ID
 *     tags: [Deudor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del deudor
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               saldo:
 *                 type: number
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adición de saldo exitosa"
 */
rutaDatos.put('/updatesaldo/:id', datosDeudores.cambioSaldoDeudor);

/**
 * @swagger
 * /cambiarestado/{id}:
 *   put:
 *     summary: Cambiar el estado de un deudor por ID
 *     tags: [Deudor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del deudor
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estado cambiado correctamente"
 */
rutaDatos.put('/cambiarestado/:id', datosDeudores.cambioEstado);


rutaDatos.post('/verificarID', datosDeudores.verificarIDDeudorExistente);




module.exports = rutaDatos