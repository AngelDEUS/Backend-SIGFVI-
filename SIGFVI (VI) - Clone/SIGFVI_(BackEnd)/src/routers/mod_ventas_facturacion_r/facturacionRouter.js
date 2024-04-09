/*
    * Router del módulo de Facturacion.
*/


const express = require('express');
const facturacionController = require('../../controllers/mod_ventas_facturacion/facturacion_controlador/facturacionController');

const routerFactura = express.Router(); // Router.

/**
 * @swagger
 * /crearfactura:
 *   post:
 *     summary: Crear una nueva factura
 *     description: Crea una nueva factura con la información proporcionada.
 *     tags: [Facturación]
 *     requestBody:
 *       description: Datos de la nueva factura
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Fecha_Factura:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la factura en formato YYYY-MM-DD
 *               Hora_Factura:
 *                 type: string
 *                 format: time
 *                 description: Hora de la factura en formato HH:MM:SS
 *               ID_Venta_Realizada_FK:
 *                 type: integer
 *                 description: ID de la venta realizada asociada a la factura
 *     responses:
 *       200:
 *         description: Factura creada correctamente
 *       500:
 *         description: Error al crear la factura
 */
routerFactura.post("/crearfactura", facturacionController.createFactura);

/**
 * @swagger
 * /creardetallefactura:
 *   post:
 *     summary: Crear un nuevo detalle de facturación
 *     description: Crea un nuevo detalle de facturación con la información proporcionada.
 *     tags: [Facturación]
 *     requestBody:
 *       description: Datos del nuevo detalle de facturación
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Cantidad_Producto:
 *                 type: integer
 *                 description: Cantidad de productos en el detalle de facturación
 *               SubTotal:
 *                 type: number
 *                 description: Subtotal del detalle de facturación
 *               ID_Factura_FK:
 *                 type: integer
 *                 description: ID de la factura asociada al detalle de facturación
 *               ID_Detalle_Venta_FK:
 *                 type: integer
 *                 description: ID del detalle de venta asociado al detalle de facturación
 *     responses:
 *       200:
 *         description: Detalle de facturación creado correctamente
 *       500:
 *         description: Error al crear el detalle de facturación
 */
routerFactura.post("/creardetallefactura", facturacionController.createDetalleFactura);

module.exports = routerFactura;
