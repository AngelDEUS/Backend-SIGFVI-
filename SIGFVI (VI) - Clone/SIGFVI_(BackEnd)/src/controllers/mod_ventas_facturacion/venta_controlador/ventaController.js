/*
    * Controlador del pago y validacion de la venta en el módulo de ventas.
*/
const db = require('../../../models/sigfviDBModelo').promise();

// ENDPOINT para Crear una nueva venta:
const createVenta = async (req, res) => {
    const { ID_Metodo_Pago_FK, IVA, SubTotal_Venta, Total_Pedido, ID_Saldo_PK, ID_Estado_FK } = req.body;
    try {
        console.log("--> Creando nueva venta...");
        const query = `
            INSERT INTO Venta (ID_Metodo_Pago_FK, IVA, SubTotal_Venta, Total_Pedido, ID_Saldo_PK, ID_Estado_FK)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await db.query(query, [ID_Metodo_Pago_FK, IVA, SubTotal_Venta, Total_Pedido, ID_Saldo_PK, ID_Estado_FK]);
        console.log("\n---> Venta creada exitosamente.");
        res.json({ message: "Venta creada exitosamente." });
    } catch (error) {
        console.error("\nNo se pudo crear la venta.", error);
        res.status(500).json({ error: "\nNo se pudo crear la venta." });
    }
};

// ENDPOINT para Crear una nueva venta:
const createDetalleVenta = async (req, res) => {
    const { ID_Venta_FK, Cantidad_Producto, SubTotal_detalle, ID_Inventario_FK } = req.body;
    try {
        console.log("--> Creando nuevo detalle de venta...");
        const query = `
            INSERT INTO Detalle_Venta (ID_Venta_FK, Cantidad_Producto, SubTotal_detalle, ID_Inventario_FK)
            VALUES (?, ?, ?, ?)`;
        const result = await db.query(query, [ID_Venta_FK, Cantidad_Producto, SubTotal_detalle, ID_Inventario_FK]);
        console.log("\n---> Detalle de venta creado exitosamente.");
        res.json({ message: "Detalle de venta creado exitosamente." });
    } catch (error) {
        console.error("\nNo se pudo crear el detalle de venta.", error);
        res.status(500).json({ error: "\nNo se pudo crear el detalle de venta." });
    }
};

// Exportar los endpoints
module.exports = {
    createVenta,
    createDetalleVenta
};
