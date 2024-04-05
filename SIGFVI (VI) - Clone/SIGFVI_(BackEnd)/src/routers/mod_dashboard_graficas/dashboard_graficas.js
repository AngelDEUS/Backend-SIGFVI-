const express = require('express');
const graficasController = require('../../controllers/mod_dashboard_graficas/Controllergraficas');
const rutaGraficas = express.Router();

/**
 * @swagger
 * /rutaGraficas/productosstock:
 *   get:
 *     summary: Obtener información del stock de productos
 *     tags: [Graficas]
 *     responses:
 *       200:
 *         description: Éxito. Devuelve información del stock de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Producto:
 *                     type: integer
 *                     description: ID del producto.
 *                   Nombre:
 *                     type: string
 *                     description: Nombre del producto.
 *                   Stock:
 *                     type: integer
 *                     description: Cantidad de stock disponible del producto.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error interno del servidor.
 */
rutaGraficas.get('/productosstock', graficasController.getProductoStock);

/**
 * @swagger
 * /rutaGraficas/prodvendido:
 *   get:
 *     summary: Obtener productos más vendidos
 *     tags: [Graficas]
 *     responses:
 *       200:
 *         description: Éxito. Devuelve los productos más vendidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Producto:
 *                     type: integer
 *                     description: ID del producto.
 *                   Nombre:
 *                     type: string
 *                     description: Nombre del producto.
 *                   Cantidad_Vendida:
 *                     type: integer
 *                     description: Cantidad total del producto vendida.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error interno del servidor.
 */
rutaGraficas.get('/prodvendido', graficasController.prodmasVendidos);

/**
 * @swagger
 * /rutaGraficas/stockbajo:
 *   get:
 *     summary: Obtener productos con stock bajo
 *     tags: [Graficas]
 *     responses:
 *       200:
 *         description: Éxito. Devuelve los productos con stock bajo.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Producto:
 *                     type: integer
 *                     description: ID del producto.
 *                   Nombre:
 *                     type: string
 *                     description: Nombre del producto.
 *                   Stock:
 *                     type: integer
 *                     description: Cantidad de stock disponible del producto.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error interno del servidor.
 */
rutaGraficas.get('/stockbajo', graficasController.productosStockBajo);

module.exports = rutaGraficas;
