const express = require("express");
const informesController = require("../../controllers/mod_informes_c/controllerinformes");
const rutaInformes = express.Router();

/**
 * @swagger
 * /informeDeudor:
 *   get:
 *     summary: Obtener informe de deudores
 *     tags: [Informes]
 *     description: Obtiene un informe de los deudores y sus saldos pendientes.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve el informe de deudores.
 *       '500':
 *         description: Error interno del servidor.
 */
rutaInformes.get("/informeDeudor", informesController.consultaDeudor);

/**
 * @swagger
 * /informeVenta:
 *   get:
 *     summary: Obtener informe de ventas
 *     tags: [Informes]
 *     description: Obtiene un informe de las ventas realizadas y los productos vendidos.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve el informe de ventas.
 *       '500':
 *         description: Error interno del servidor.
 */
rutaInformes.get("/informeVenta", informesController.ObtenerProductosVenta);

/**
 * @swagger
 * /informeInventario:
 *   get:
 *     summary: Obtener informe de inventario
 *     tags: [Informes]
 *     description: Obtiene un informe del inventario de productos disponibles.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve el informe de inventario.
 *       '500':
 *         description: Error interno del servidor.
 */
rutaInformes.get("/informeInventario", informesController.consultaDatos);

/**
 * @swagger
 * /informeEmpleado:
 *   get:
 *     summary: Obtener informe de empleados
 *     tags: [Informes]
 *     description: Obtiene un informe de los empleados registrados en el sistema.
 *     responses:
 *       '200':
 *         description: Respuesta exitosa. Devuelve el informe de empleados.
 *       '500':
 *         description: Error interno del servidor.
 */
rutaInformes.get("/informeEmpleado", informesController.obtenerUsuarios);

module.exports = rutaInformes;


