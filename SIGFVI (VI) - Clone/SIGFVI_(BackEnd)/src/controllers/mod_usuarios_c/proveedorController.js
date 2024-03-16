const db = require("../../models/sigfviDBModelo").promise();

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
    const { Nombre_Empresa, Dia_Visita, Telefono_Contacto, Estado_ID_Estado_PK } = req.body;

    try {
        const createQuery = "INSERT INTO Registro_Proveedor(Nombre_Empresa, Dia_Visita, Telefono_Contacto, Estado_ID_Estado_PK) VALUES (?, ?, ?, 1)";
        const [result] = await db.query(createQuery, [Nombre_Empresa, Dia_Visita, Telefono_Contacto, Estado_ID_Estado_PK]);

        res.json({ message: 'Proveedor creado correctamente', id: result.insertId });
    } catch (error) {
        console.error(`Error: ${error}`);
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

const cambioEstadoProveedor = async(req,res)=>{
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

const verificarTelefonoExistente = async (req, res) => {
    try {
        const { telefono } = req.body;
        const query = 'SELECT Telefono_Contacto FROM Registro_Proveedor WHERE Telefono_Contacto = ? LIMIT 1';
        const [rows] = await db.query(query, [telefono]);

        if (rows.length > 0) {
            return res.status(200).json({ exists: true, message: 'El número de teléfono ya existe.' });
        }

        return res.status(200).json({ exists: false, message: 'El número de teléfono está disponible.' });
    } catch (error) {
        console.error('Error al verificar el número de teléfono:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = {
    obtenerProveedores,
    obtenerProveedorPorId,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor,
    cambioEstadoProveedor,
    verificarTelefonoExistente
};
