/*
    * Controlador del pago y validacion de la venta en el módulo de ventas.
*/
const db = require('../../models/sigfviDBModelo').promise();


// ----> CONSULTAS PARA EL PAGO Y VALIDACION

// Consulta de los metodos de pago activos.
const getAllMetodoPagoActivo = async (req, res) => {
    try {
        console.log("--> Obteniendo datos de todos los metodos de pago activos para el pago...");
        const query = `
            SELECT MP.ID_Metodo_Pago_PK, MP.Nombre_Metodo, MP.Referencia
            FROM Metodo_de_pago MP
            JOIN Estado AS E ON MP.ID_Estado_FK = E.ID_Estado_PK
            WHERE MP.ID_Estado_FK = 1`;
        const [result] = await db.query(query);
        console.log("\n---> Enviando respuesta de los Metodos de Pago activos...");
        res.json({ metodos_pago_activos: result });
    } catch (error) {
        console.error("\nNo se pudo hacer la consulta de los Metodos de Pago activos.", error);
        res.status(500).json({ error: "\nNo se pudo hacer la consulta de los Metodos de Pago activos." });
    }
};

// Consulta del último ID de venta
const getUltimoIdVenta = async (req, res) => {
    try {
        console.log("--> Obteniendo el último ID de venta...");
        const query = `
            SELECT MAX(ID_Venta_PK) AS Ultimo_ID_Venta
            FROM Venta`;
        const [result] = await db.query(query);
        console.log("\n---> Enviando respuesta con el último ID de venta...");
        res.json({ ultimo_id_venta: result[0].Ultimo_ID_Venta });
    } catch (error) {
        console.error("\nNo se pudo obtener el último ID de venta.", error);
        res.status(500).json({ error: "\nNo se pudo obtener el último ID de venta." });
    }
};


module.exports = {
    getAllMetodoPagoActivo,
    getUltimoIdVenta,
}