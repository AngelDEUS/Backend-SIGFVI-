const express = require("express");
const inventario = require("../../controllers/mod_inventario_c/inventarioCroller");
const rutaDatosInventario = express.Router();

/**
 * @swagger
 * /consultaInventario:
 *   get:
 *     summary: Consulta de datos de inventario
 *     tags:
 *       - Inventario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DatosInventario'
 */

rutaDatosInventario.get("/consultaInventario", inventario.consultaDatos);

/**
 * @swagger
 * /reportarProducto:
 *   post:
 *     summary: Reportar un producto
 *     tags:
 *       - Inventario
 *     requestBody:
 *       description: Datos para reportar un producto
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Producto_PK:
 *                 type: string
 *                 description: ID del producto
 *               Descripcion_Salida:
 *                 type: string
 *                 description: Descripción de la salida del producto
 *               Cantidad_Reportada:
 *                 type: integer
 *                 description: Cantidad reportada del producto
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
 */

rutaDatosInventario.post("/reportarProducto", inventario.reportarProducto);

/**
 * @swagger
 * /registrarEntrada:
 *   post:
 *     summary: Registrar entrada de productos
 *     tags:
 *       - Inventario
 *     requestBody:
 *       description: Datos para registrar la entrada de productos
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del producto
 *                     cantidad:
 *                       type: integer
 *                       description: Cantidad de productos a ingresar
 *               proveedorId:
 *                 type: integer
 *                 description: ID del proveedor
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
 */

rutaDatosInventario.post("/registrarEntrada", inventario.registrarEntradaProducto);
rutaDatosInventario.post("/BusquedaInventario/:id", inventario.BuscarInventario);

module.exports = rutaDatosInventario;