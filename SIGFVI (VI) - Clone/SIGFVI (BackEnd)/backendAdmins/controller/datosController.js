const db = require("../models/database").promise();

const Get = async (req, res) => {
  try {
    const query =  `select u.ID_Numero_Identificacion_PK as id, ti.Nombre_Identificacion as tipoId,u.Nombre_Usuario,
    u.Segundo_Nombre_Usuario,u.Apellido_Usuario,Segundo_Apellido_Usuario,u.Numero_Contacto_Usuario as telefono,
    u.Email_Usuario,Password_Usuario as contrasena,tc.Nombre_Tipo_cargo as cargo,ID_Estado_FK as estado
    from usuario u 
    inner join Tipo_Cargo tc
    on tc.ID_Tipo_Cargo_PK = u.ID_Tipo_Cargo_FK
    inner join Tipo_identificacion ti
    on u.ID_Tipo_Identificacion_FKPK = ti.ID_Tipo_Identificacion_PK
    where  u.ID_Tipo_Cargo_FK = 2;`;
    const [result] = await db.query(query);
    res.json(result);
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.json({ error: ".No se pudo hacer la consulta" });
  }
};

const getUpdate = async (req,res)=>{
  const {id}= req.params;
  try {
    const consulta = `select ID_Numero_Identificacion_PK as id,ID_Tipo_Identificacion_FKPK as tipoId,
    Nombre_Usuario,Segundo_Nombre_Usuario,Apellido_Usuario,Segundo_Apellido_Usuario,
    Numero_Contacto_Usuario,Email_Usuario,Password_Usuario
    from usuario where ID_Numero_Identificacion_PK = ?;`;
    const [resultado] = await db.query(consulta,[id]);
    res.json(resultado);
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.json({ error: ".No se pudo hacer la consulta" });
  }
}

const Post = async (req,res) =>{
    const { id,tipoid,name1,name2,lastname1,lastname2,cel,email,contrasena } = req.body;
  
    try {
      const create = "INSERT INTO Usuario VALUES (?,?,?,?,?,?,?,?,hex(aes_encrypt(?,'xd')),2,1);";
  
      await db.query(create, [id,tipoid,name1,name2,lastname1,lastname2,cel,email,contrasena]);
  
      res.json({mensaje: "Datos agregados exitosamente c:"})
  
    } catch (error) {
      console.error('datos no ingresados :c',error);
    }
  }

const Put =async (req,res)=>{
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

const Delete = async (req, res) => {
    const {id} = req.params;
  
    try {
      const delit = 'delete from Usuario where ID_Numero_Identificacion_PK = ?;';
  
      await db.query(delit, [id])
  
      res.json({message:"Delete donne"})
    } catch (error) {
      console.error('data no delited',error);
    }
  };

module.exports={
    Get,
    getUpdate,
    Post,
    Put,
    Delete
}