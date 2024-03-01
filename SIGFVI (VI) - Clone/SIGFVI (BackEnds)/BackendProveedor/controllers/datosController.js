const db = require("../Models/conexion").promise();

const obtenerProveedores = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT rp.ID_Registro_Proveedor_PK,rp.Nombre_Empresa,rp.Dia_Visita,rp.Telefono_Contacto,rp.Estado_ID_Estado_PK,
        e.Nombre_Estado 
        FROM Registro_Proveedor rp
        inner join Estado e
        on rp.Estado_ID_Estado_PK = e.ID_Estado_PK;`);
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

const cambioEstadoProveedor = async(req,res)=>{//esta funcion es exactamente igual que la que hay en el backend de admins
    const {id} = req.params;
    const {state} = req.body;
  
    try {
        const estado = `UPDATE Registro_Proveedor SET Estado_ID_Estado_PK=? WHERE ID_Registro_Proveedor_PK=?;`;
        await db.query(estado,[state,id]);
        res.json({message: "Estado cambiado"})
    } catch (error) {
        console.error('Edtado no cambiado',error);
        res.json('Edtado no cambiado',error);
    }
  }

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
    eliminarProveedor,
    cambioEstadoProveedor
};
