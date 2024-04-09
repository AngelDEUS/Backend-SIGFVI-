/*
    * Router del módulo de ventas.
*/

const express = require('express');
const pagarVentaController = require('../../controllers/mod_ventas_facturacion/pagarVentaController');
const ventaController = require('../../controllers/mod_ventas_facturacion/venta_controlador/ventaController');

const routerPagar = express.Router(); // - Router.

/**
 * @swagger
 * /metodospagoactivo:
 *   get:
 *     summary: Obtener métodos de pago activos
 *     description: Obtiene la lista de todos los métodos de pago activos para realizar el pago.
 *     tags: [Pagos y Ventas]
 *     responses:
 *       200:
 *         description: Lista de métodos de pago activos obtenida exitosamente
 *       500:
 *         description: Error al obtener los métodos de pago activos
 */
routerPagar.get("/metodospagoactivo", pagarVentaController.getAllMetodoPagoActivo);

/**
 * @swagger
 * /restarstockinventario/{id}:
 *   put:
 *     summary: Restar cantidad del producto del inventario
 *     description: Resta la cantidad de productos vendidos del stock en el inventario.
 *     tags: [Pagos y Ventas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto en el inventario
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Cantidad a restar del stock
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad de productos a restar del stock
 *     responses:
 *       200:
 *         description: Cantidad de productos restados del inventario correctamente
 *       500:
 *         description: Error al restar la cantidad de productos del inventario
 */
routerPagar.put("/restarstockinventario/:id", pagarVentaController.restarStockInventario);

/**
 * @swagger
 * /ultimoidventa:
 *   get:
 *     summary: Obtener último ID de venta
 *     description: Obtiene el último ID de venta registrado en el sistema.
 *     tags: [Pagos y Ventas]
 *     responses:
 *       200:
 *         description: Último ID de venta obtenido exitosamente
 *       500:
 *         description: Error al obtener el último ID de venta
 */
routerPagar.get("/ultimoidventa", pagarVentaController.getUltimoIdVenta);

/**
 * @swagger
 * /crearventa:
 *   post:
 *     summary: Crear una nueva venta
 *     description: Crea una nueva venta con la información proporcionada.
 *     tags: [Pagos y Ventas]
 *     requestBody:
 *       description: Datos de la nueva venta
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Agregar propiedades necesarias para la creación de una venta
 *     responses:
 *       200:
 *         description: Venta creada correctamente
 *       500:
 *         description: Error al crear la venta
 */
routerPagar.post("/crearventa", ventaController.createVenta);

/**
 * @swagger
 * /creardetalleventa:
 *   post:
 *     summary: Crear un nuevo detalle de venta
 *     description: Crea un nuevo detalle de venta con la información proporcionada.
 *     tags: [Pagos y Ventas]
 *     requestBody:
 *       description: Datos del nuevo detalle de venta
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Agregar propiedades necesarias para la creación de un detalle de venta
 *     responses:
 *       200:
 *         description: Detalle de venta creado correctamente
 *       500:
 *         description: Error al crear el detalle de venta
 */
routerPagar.post("/creardetalleventa", ventaController.createDetalleVenta);

module.exports = routerPagar;
