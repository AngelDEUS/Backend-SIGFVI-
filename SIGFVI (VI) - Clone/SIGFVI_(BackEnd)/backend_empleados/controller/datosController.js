const db = require("../models/conexion").promise();

const obtenerUsuarios = async (req, res) => {
    try {
        const [result] = await db.query(`select u.ID_Numero_Identificacion_PK as id, ti.Nombre_Identificacion as tipoId,u.Nombre_Usuario,
        u.Segundo_Nombre_Usuario,u.Apellido_Usuario,Segundo_Apellido_Usuario,u.Numero_Contacto_Usuario as telefono,
        u.Email_Usuario,Password_Usuario as contrasena,tc.Nombre_Tipo_cargo as cargo,ID_Estado_FK as estado
        from usuario u 
        inner join Tipo_Cargo tc
        on tc.ID_Tipo_Cargo_PK = u.ID_Tipo_Cargo_FK
        inner join Tipo_identificacion ti
        on u.ID_Tipo_Identificacion_FKPK = ti.ID_Tipo_Identificacion_PK
        where  u.ID_Tipo_Cargo_FK = 3;`);
        res.json(result);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener usuarios.' });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('SELECT * FROM Usuario WHERE ID_Numero_Identificacion_PK = ?', [id]);
        res.json(result[0] || {});
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al obtener el usuario.' });
    }
};

const crearUsuario = async (req, res) => {
    const { id,tipoid,name1,name2,lastname1,lastname2,cel,email,contrasena } = req.body;
    try {
        const consulta=`INSERT INTO Usuario(ID_Numero_Identificacion_PK,ID_Tipo_Identificacion_FKPK,Nombre_Usuario,Segundo_Nombre_Usuario,Apellido_Usuario,Segundo_Apellido_Usuario,Numero_Contacto_Usuario,Email_Usuario,Password_Usuario,ID_Tipo_Cargo_FK,ID_Estado_FK)    
        values(?,?,?,?,?,?,?,?,hex(aes_encrypt(?,"xd")),3,1);`

        await db.query(consulta,[id,tipoid,name1,name2,lastname1,lastname2,cel,email,contrasena])
        
        res.json({ message: 'Usuario creado correctamente', id });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
};

/*const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        await db.query('UPDATE Usuario SET ? WHERE ID_Numero_Identificacion_PK = ?', [body, id]);
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al actualizar el usuario.' });
    }
};*/
const actualizarUsuario =async (req,res)=>{
    const {id}= req.params;
    const {name1,name2,lastname1,lastname2,cel,email,contrasena}= req.body;
    console.log(req.body);

    try {
        const update = 'UPDATE Usuario SET Nombre_Usuario = ?,Segundo_Nombre_Usuario = ?,Apellido_Usuario = ?,Segundo_Apellido_Usuario = ?,Numero_Contacto_Usuario = ?,Email_Usuario = ? ,Password_Usuario = ? WHERE ID_Numero_Identificacion_PK = ?;';

        await db.query(update, [name1,name2,lastname1,lastname2,cel,email,contrasena,id]);

        res.json({ mensaje: "Actualizacion done"})
    } catch (error) {
        console.error('Datos no updated :c →→ ',error);
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Usuario WHERE ID_Numero_Identificacion_PK = ?', [id]);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Error al eliminar el usuario.' });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
