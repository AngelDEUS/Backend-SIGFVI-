const db = require("../../models/sigfviDBModelo").promise();
<<<<<<< HEAD
=======
const bcrypt = require('bcrypt');
>>>>>>> origin/Login

const obtenerUsuarios = async (req, res) => {
    try {
        const [result] = await db.query(`select u.ID_Numero_Identificacion_PK as id, ti.Nombre_Identificacion as tipoId,u.Nombre_Usuario,
        u.Segundo_Nombre_Usuario,u.Apellido_Usuario,Segundo_Apellido_Usuario,u.Numero_Contacto_Usuario as telefono,
        u.Email_Usuario,Password_Usuario as contrasena,tc.Nombre_Tipo_cargo as cargo,ID_Estado_FK,e.Nombre_Estado as estado
        from usuario u 
        inner join Tipo_Cargo tc
        on tc.ID_Tipo_Cargo_PK = u.ID_Tipo_Cargo_FK
        inner join Tipo_identificacion ti
        on u.ID_Tipo_Identificacion_FKPK = ti.ID_Tipo_Identificacion_PK
        inner join Estado e
        on u.ID_Estado_FK=e.ID_Estado_PK
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

  const salt = await bcrypt.genSalt(8)
  const hashContra = await bcrypt.hash(contrasena,salt);

  try {
    const create = "INSERT INTO Usuario VALUES (?,?,?,?,?,?,?,?,?,3,1);";

    await db.query(create, [id,tipoid,name1,name2,lastname1,lastname2,cel,email,hashContra]);

    res.json({mensaje: "Datos agregados exitosamente c:"})

  } catch (error) {
    console.error('datos no ingresados :c',error);
  }
};

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

const cambioEstadoEmpleado = async(req,res)=>{//esta funcion es exactamente igual que la que hay en el backend de admins
    const {id} = req.params;
    const {state} = req.body;

    try {
        const estado = `UPDATE usuario SET ID_Estado_FK = ? WHERE ID_Numero_Identificacion_PK = ? ;`;
        await db.query(estado,[state,id]);
        res.json({message: "Estado cambiado"})
    } catch (error) {
        console.error('Edtado no cambiado',error);
        res.json('Edtado no cambiado',error);
    }
  }

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    cambioEstadoEmpleado
};
