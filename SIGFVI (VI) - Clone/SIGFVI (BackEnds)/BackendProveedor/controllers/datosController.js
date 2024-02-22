const db = require("../Models/conexion").promise();

const obtenerProveedores = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM Registro_Proveedor');
        res.json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener proveedores.' });
    }
};


const obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT * FROM Registro_Proveedor WHERE ID_Registro_Proveedor_PK = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener el proveedor.' });
    }
};



const crearProveedor = async (req, res) => {
    try {
        const { body } = req;
        const [result] = await db.query('INSERT INTO Registro_Proveedor SET ?', [body]);
        res.json({ message: 'Proveedor creado correctamente', id: result.insertId });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al crear el proveedor.' });
    }
};


const actualizarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        await db.query('UPDATE Registro_Proveedor SET ? WHERE ID_Registro_Proveedor_PK = ?', [body, id]);
        res.json({ message: 'Proveedor actualizado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al actualizar el proveedor.' });
    }
};

const eliminarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Registro_Proveedor WHERE ID_Registro_Proveedor_PK = ?', [id]);
        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al eliminar el proveedor.' });
    }
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
};
