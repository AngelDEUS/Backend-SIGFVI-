const express = require("express");
const proveedorController = require("../../controllers/mod_usuarios_c/proveedorController");
const rutaProveedores = express.Router();

/**
 * @swagger
 * /proveedores:
 *   get:
 *     summary: Buscar proveedores
 *     tags:
 *       - Proveedores
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
rutaProveedores.get("/proveedores", proveedorController.obtenerProveedores);
/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Buscar por ID
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proveedor
 *         schema:
 *           type: integer
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
 *                   type: object
 */
rutaProveedores.get("/proveedor/:id", proveedorController.obtenerProveedorPorId);
/**
 * @swagger
 * /crear:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags:
 *       - Proveedores
 *     requestBody:
 *       description: Datos para crear un proveedor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Registro_Proveedor_PK:
 *                 type: integer
 *                 description: ID único del proveedor (autogenerado)
 *               Nombre_Empresa:
 *                 type: string
 *                 description: Nombre de la empresa proveedora
 *               Dia_Visita:
 *                 type: string
 *                 description: Día(s) de visita del proveedor
 *               Telefono_Contacto:
 *                 type: string
 *                 description: Número de teléfono de contacto del proveedor
 *               Estado_ID_Estado_PK:
 *                 type: integer
 *                 description: ID del estado del proveedor
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
 *                   example: "Proveedor creado correctamente"
 *                 id:
 *                   type: integer
 *                   example: 1
 */
rutaProveedores.post("/proveedor", proveedorController.crearProveedor);
/**
 * @swagger
 * /actualizar/{id}:
 *   put:
 *     summary: Actualizar un proveedor por ID
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proveedor a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Datos para actualizar un proveedor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del proveedor
 *               diaVisita:
 *                 type: string
 *                 description: Nuevo día de visita del proveedor
 *               telefonoContacto:
 *                 type: string
 *                 description: Nuevo número de teléfono del proveedor
 *               estadoID:
 *                 type: integer
 *                 description: Nuevo ID del estado del proveedor
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
 *                   example: "Proveedor actualizado correctamente"
 */
rutaProveedores.put("/proveedor/:id", proveedorController.actualizarProveedor);
/**
 * @swagger
 * /eliminar/{id}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags:
 *       - Proveedores
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proveedor
 *         schema:
 *           type: integer
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
 *                   example: "Proveedor eliminado correctamente"
 */
rutaProveedores.delete("/proveedor/:id", proveedorController.eliminarProveedor);
/**
 * @swagger
 * /cambioestadoprovee/{id}:
 *   put:
 *     summary: Cambiar estado de un proveedor por ID
 *     tags: [Proveedores]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del proveedor a actualizar su estado
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Datos para cambiar el estado de un proveedor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: integer
 *                 description: Nuevo estado del proveedor
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
 *                   example: "Estado cambiado"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Estado no cambiado"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno al cambiar el estado"
 */
rutaProveedores.put("/cambioestadoprovee/:id", proveedorController.cambioEstadoProveedor);
/**
 * @swagger
 * /verificar-telefono:
 *   post:
 *     summary: Verificar si un número de teléfono ya existe en la base de datos
 *     tags:
 *       - Proveedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono a verificar
 *                 example: "123456789"
 *     responses:
 *       200:
 *         description: El número de teléfono está disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El número de teléfono está disponible."
 *       409:
 *         description: El número de teléfono ya existe en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El número de teléfono ya existe."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor."
 */
rutaProveedores.post("/verificar-telefono", proveedorController.verificarTelefonoExistente);

module.exports = rutaProveedores;