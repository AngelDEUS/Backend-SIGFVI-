const db = require("../../models/sigfviDBModelo");

const consultaDatos = async (req, res) => {
  try {
      console.log("Obteniendo datos...");

      // Asegúrate de utilizar con.promise() para obtener una versión compatible con promesas
      const [result] = await db.promise().query(`
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
      `);

      console.log("Enviando respuesta...");
      res.json({ datos: result });
  } catch (error) {
      console.error("No se pudo hacer la consulta", error);
      res.status(500).json({ error: "No se pudo hacer la consulta" });
  }
};

const reportarProducto = async (req, res) => {
  try {
      const { ID_Producto_PK, Descripcion_Salida, Cantidad_Reportada } = req.body;

      // Obtener la fecha y hora actuales
      const fechaSalida = new Date().toISOString().split('T')[0];
      const horaSalida = new Date().toLocaleTimeString();

      // Obtener el ID_Inventario_FK basándonos en el ID_Producto_FK
      const [inventarioResult] = await db.promise().query(`
          SELECT ID_Inventario_PK
          FROM Inventario
          WHERE ID_Producto_FK = ?;
      `, [ID_Producto_PK]);

      if (inventarioResult.length === 0) {
          throw new Error("No se encontró el inventario para el producto especificado.");
      }

      const ID_Inventario_FK = inventarioResult[0].ID_Inventario_PK;

      // Insertar el reporte en la tabla Salida_producto_Inventario
      await db.promise().query(`
          INSERT INTO Salida_producto_Inventario (Descripcion_Salida, Fecha_Salida, Hora_Salida, ID_Inventario_FK)
          VALUES (?, ?, ?, ?);
      `, [Descripcion_Salida, fechaSalida, horaSalida, ID_Inventario_FK]);

      // Actualizar la cantidad en la tabla Inventario (restar la cantidad reportada)
      await db.promise().query(`
          UPDATE Inventario
          SET Stock = Stock - ?
          WHERE ID_Inventario_PK = ?;
      `, [Cantidad_Reportada, ID_Inventario_FK]);

      res.json({ mensaje: "Reporte realizado exitosamente." });
  } catch (error) {
      console.error("Error al realizar el reporte", error);
      res.status(500).json({ error: "Error al realizar el reporte." });
  }
};



module.exports = {
    consultaDatos,
    reportarProducto,
  }