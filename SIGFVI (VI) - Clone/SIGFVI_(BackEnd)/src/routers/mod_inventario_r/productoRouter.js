const express = require("express");
const productosController = require("../../controllers/mod_inventario_c/productosController");
const rutaDatos = express.Router();

/**
 * @swagger
 * /producto/Datos:
 *   get:
 *     summary: Obtener todos los datos de los productos
 *     tags:
 *       - Producto
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 datos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_Producto_PK:
 *                         type: string
 *                       Tipo_Producto:
 *                         type: string
 *                       Nombre_Producto:
 *                         type: string
 *                       Descripcion:
 *                         type: string
 *                       Precio_Proveedor:
 *                         type: number
 *                       Precio_Venta:
 *                         type: number
 *                       Foto_Producto:
 *                         type: string
 *                       Estado:
 *                         type: string
 */
rutaDatos.get("/Datos", productosController.Datos);

/**
 * @swagger
 * /BorrarDatos/{id}:
 *   delete:
 *     summary: Eliminar un producto y sus registros asociados por ID
 *     tags:
 *       - Producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto y registros asociados eliminados correctamente
 */
rutaDatos.delete("/BorrarDatos/:id", productosController.BorrarDatos);

/**
 * @swagger
 * /BorrarInventario/{id}:
 *   delete:
 *     summary: Eliminar el inventario de un producto por ID
 *     tags:
 *       - Producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto cuyo inventario se eliminará
 *     responses:
 *       200:
 *         description: Inventario eliminado correctamente
 */
rutaDatos.delete("/BorrarInventario/:id", productosController.BorrarInventario);

/**
 * @swagger
 * /BuscarDatoPorId/{id}:
 *   get:
 *     summary: Buscar un producto por ID o nombre
 *     tags:
 *       - Producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID o nombre del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
rutaDatos.get("/BuscarDatoPorId/:id", productosController.BuscarDatoPorId);

/**
 * @swagger
 * /ActualizarProducto/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags:
 *       - Producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre_Producto:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Precio_Proveedor:
 *                 type: number
 *               Precio_Venta:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 */
rutaDatos.put("/ActualizarProducto/:id", productosController.ActualizarProducto);

/**
 * @swagger
 * /AgregarProducto:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags:
 *       - Producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ID_Producto_PK:
 *                 type: string
 *               Nombre_Producto:
 *                 type: string
 *               ID_Tipo_Producto_FK:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               Precio_Proveedor:
 *                 type: number
 *               Precio_Venta:
 *                 type: number
 *               Foto_Producto:
 *                 type: string
 *               ID_Estado_FK:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto agregado correctamente
 */
rutaDatos.post("/AgregarProducto",productosController.upload.single('Foto_Producto'), productosController.AgregarProducto);
/**
 * @swagger
 * /VerificarDuplicado/{id}:
 *   get:
 *     summary: Verificar si hay un ID de producto duplicado
 *     tags:
 *       - Producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a verificar
 *     responses:
 *       200:
 *         description: Se encontró el producto con el ID proporcionado
 *       404:
 *         description: No se encontró un producto con el ID proporcionado
 */
rutaDatos.get("/VerificarDuplicado/:id", productosController.VerificarDuplicado);

module.exports = rutaDatos;