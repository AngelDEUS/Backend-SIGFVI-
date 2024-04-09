/*
    * Controlador del pago y validacion de la venta en el módulo de ventas.
*/
const db = require('../../../models/sigfviDBModelo').promise();

// ENDPOINT para Crear una nueva facturación
const createFactura = async (req, res) => {
    const { ID_Venta_Realizada_FK } = req.body;
    const fechaFactura = new Date().toISOString().split('T')[0];
    const horaFactura = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    try {
        console.log("--> Creando nueva factura...");
        const query = `
            INSERT INTO Facturacion (Fecha_Factura, Hora_Factura, ID_Venta_Realizada_FK)
            VALUES (?, ?, ?)`;
        const result = await db.query(query, [fechaFactura, horaFactura, ID_Venta_Realizada_FK]);
        console.log("\n---> Factura creada exitosamente.");
        res.json({ message: "Factura creada exitosamente." });
    } catch (error) {
        console.error("\nNo se pudo crear la factura.", error);
        res.status(500).json({ error: "\nNo se pudo crear la factura." });
    }
};

// ENDPOINT para Crear un nuevo detalle de facturación
const createDetalleFactura = async (req, res) => {
    const { ID_Factura_FK, ID_Detalle_Venta_FK } = req.body;
    try {
        console.log("--> Creando nuevo detalle de facturación...");
        const query = `
            INSERT INTO Detalle_Factura (ID_Factura_FK, ID_Detalle_Factura_Venta_FK)
            VALUES (?, ?, ?, ?)`;
        const result = await db.query(query, [ ID_Factura_FK, ID_Detalle_Venta_FK]);
        console.log("\n---> Detalle de facturación creado exitosamente.");
        res.json({ message: "Detalle de facturación creado exitosamente." });
    } catch (error) {
        console.error("\nNo se pudo crear el detalle de facturación.", error);
        res.status(500).json({ error: "\nNo se pudo crear el detalle de facturación." });
    }
};

// Exportar los endpoints
module.exports = {
    createFactura,
    createDetalleFactura,
};
