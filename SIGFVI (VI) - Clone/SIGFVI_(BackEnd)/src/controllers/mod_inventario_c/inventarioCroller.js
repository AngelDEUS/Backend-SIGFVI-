const db = require("../../models/sigfviDBModelo").promise();

const consultaDatos = async (req, res) => {
    try {
      console.log("Obteniendo datos...");
      const query = `
      SELECT 
          P.ID_Producto_PK,
          P.Nombre_Producto,
          TP.Nombre_Tipo_Producto,
          P.Descripcion,
          P.Precio_Proveedor,
          P.Precio_Venta,
          SUM(I.Stock) AS Stock
      FROM 
          Producto AS P
      JOIN 
          Tipo_Producto AS TP ON P.ID_Tipo_Producto_FK = TP.ID_Tipo_Producto_PK
      JOIN 
          Inventario AS I ON P.ID_Producto_PK = I.ID_Producto_FK
      GROUP BY 
          P.ID_Producto_PK, P.Nombre_Producto, TP.Nombre_Tipo_Producto, P.Descripcion;
  `;
      const [result] = await db.query(query);
      console.log("Enviando respuesta...");
      res.json({ datos: result });
    } catch (error) {
      console.error("No se pudo hacer la consulta", error);
      res.status(500).json({ error: "No se pudo hacer la consulta" });
    }
  };


module.exports = {
    consultaDatos,
  }