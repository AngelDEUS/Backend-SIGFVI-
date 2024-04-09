const express = require("express");
const consultasController = require("../../controllers/mod_ventas_facturacion/consultasVentaController");
const deudorConsultasController = require("../../controllers/mod_ventas_facturacion/consultasDeudorVentas");
const rutasConsultas = express.Router();

/**
 * @swagger
 * /productosparaventas:
 *   get:
 *     summary: Obtener todos los productos disponibles para venta
 *     tags: [Ventas_facturación]
 *     description: Obtiene la lista de todos los productos disponibles para la venta con su respectivo stock.
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *       500:
 *         description: Error al obtener los productos
 */
rutasConsultas.get("/productosparaventas", consultasController.ObtenerProductosVenta);

/**
 * @swagger
 * /buscarpornombreparaventas/{nombre}:
 *   get:
 *     summary: Buscar productos por nombre
 *     tags: [Ventas_facturación]
 *     description: Busca productos por su nombre coincidente con la cadena proporcionada.
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre o parte del nombre del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos encontrados por nombre
 *       500:
 *         description: Error al buscar productos por nombre
 */
rutasConsultas.get("/buscarpornombreparaventas/:nombre", consultasController.BuscarProductoPorNombre);

/**
 * @swagger
 * /buscarporidparaventas/{id}:
 *   get:
 *     summary: Buscar producto por ID
 *     tags: [Ventas_facturación]
 *     description: Busca un producto por su ID.
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado por ID
 *       500:
 *         description: Error al buscar producto por ID
 */
rutasConsultas.get("/buscarporidparaventas/:id", consultasController.BuscarProductoPorID);

/**
 * @swagger
 * /buscardeudorventa:
 *   get:
 *     summary: Obtener todos los deudores en ventas
 *     tags: [Ventas_facturación]
 *     description: Obtiene la lista de todos los deudores en ventas.
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de deudores en ventas obtenida exitosamente
 *       500:
 *         description: Error al obtener los deudores en ventas
 */
rutasConsultas.get('/buscardeudorventa', deudorConsultasController.getAllDeudoresVentas);

/**
 * @swagger
 * /buscariddeudorventa/{id}:
 *   get:
 *     summary: Buscar deudor en ventas por ID
 *     tags: [Ventas_facturación]
 *     description: Busca un deudor en ventas por su ID.
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del deudor en ventas a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deudor en ventas encontrado por ID
 *       500:
 *         description: Error al buscar deudor en ventas por ID
 */
rutasConsultas.get('/buscariddeudorventa/:id', deudorConsultasController.getIDDeudoresVentas);

/**
 * @swagger
 * /buscarnomdeudorventa/{nombre}:
 *   get:
 *     summary: Buscar deudores en ventas por nombre
 *     tags: [Ventas_facturación]
 *     description: Busca deudores en ventas por su nombre coincidente con la cadena proporcionada.
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre o parte del nombre del deudor en ventas a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de deudores en ventas encontrados por nombre
 *       500:
 *         description: Error al buscar deudores en ventas por nombre
 */
rutasConsultas.get('/buscarnomdeudorventa/:nombre', deudorConsultasController.getNombreDeudoresVentas);

module.exports = rutasConsultas;
