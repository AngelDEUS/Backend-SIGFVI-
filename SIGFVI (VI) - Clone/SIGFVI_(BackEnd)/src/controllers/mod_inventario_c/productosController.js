const db = require("../../models/sigfviDBModelo").promise();

const Datos = async (req, res) => {
  try {
    console.log("Obteniendo datos...");
    const query = `
    SELECT
      P.ID_Producto_PK,
      P.Nombre_Producto,
      TP.Nombre_Tipo_Producto AS Tipo_Producto,
      P.Descripcion,
      P.Precio_Proveedor,
      P.Precio_Venta,
      P.Foto_Producto,
      E.Nombre_Estado AS Estado
    FROM
      Producto P
    JOIN
      Tipo_Producto TP ON P.ID_Tipo_Producto_FK = TP.ID_Tipo_Producto_PK
    JOIN
      Estado E ON P.ID_Estado_FK = E.ID_Estado_PK
    ORDER BY
      CASE WHEN E.Nombre_Estado = 'Activo' THEN 0 ELSE 1 END;
    `;
    const [result] = await db.query(query);
    console.log("Enviando respuesta...");
    res.json({ datos: result });
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.status(500).json({ error: "No se pudo hacer la consulta" });
  }
};

const BorrarDatos = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      `DELETE FROM entrada_producto WHERE Producto_Inventario = ?`,
      [id]
    );

    await db.query(
      `DELETE FROM salida_producto_inventario WHERE ID_Inventario_FK IN (SELECT ID_Inventario_PK FROM inventario WHERE ID_Producto_FK = ?)`,
      [id]
    );

    await db.query(`DELETE FROM inventario WHERE ID_Producto_FK = ?`, [id]);

    await db.query(`DELETE FROM producto WHERE ID_Producto_PK = ?`, [id]);

    res.json({
      mensaje: "Producto y registros asociados eliminados exitosamente",
    });
  } catch (error) {
    console.error("No se pudo borrar los datos", error);
    res.status(500).json({ error: "No se pudo borrar los datos" });
  }
};
const BorrarInventario = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM inventario WHERE ID_Producto_FK = ?`;
    await db.query(query, [id]);
    res.json({ mensaje: "Inventario eliminado exitosamente" });
  } catch (error) {
    console.error("No se pudo borrar el inventario", error);
    res.status(500).json({ error: "No se pudo borrar el inventario" });
  }
};

const BuscarDatoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT * FROM producto 
      WHERE ID_Producto_PK = ? OR Nombre_Producto LIKE ?
    `;
    const [result] = await db.query(query, [id, `%${id}%`]);

    if (result.length > 0) {
      res.json({ datos: result });
    } else {
      res.status(404).json({ mensaje: "No se encontró el dato" });
    }
  } catch (error) {
    console.error("No se pudo realizar la búsqueda", error);
    res.status(500).json({ error: "No se pudo realizar la búsqueda" });
  }
};

const ActualizarProducto = async (req, res) => {
  const { id } = req.params;
  const {
    Nombre_Producto,
    Descripcion,
    Precio_Proveedor,
    Precio_Venta,
    ID_Estado_FK,
  } = req.body;

  try {
    const query = `
      UPDATE producto 
      SET Nombre_Producto=?, Descripcion=?, Precio_Proveedor=?, Precio_Venta=?, ID_Estado_FK=?
      WHERE ID_Producto_PK=?
    `;
    await db.query(query, [
      Nombre_Producto,
      Descripcion,
      Precio_Proveedor,
      Precio_Venta,
      ID_Estado_FK,
      id,
    ]);
    res.json({ mensaje: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("No se pudo actualizar el producto", error);
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
};

const AgregarProducto = async (req, res) => {
  const {
    ID_Producto_PK,
    Nombre_Producto,
    ID_Tipo_Producto_FK,
    Descripcion,
    Precio_Proveedor,
    Precio_Venta,
    Foto_Producto,
    ID_Estado_FK,
  } = req.body;

  try {
    const query = `
      INSERT INTO producto 
      (ID_Producto_PK, Nombre_Producto, ID_Tipo_Producto_FK, Descripcion, Precio_Proveedor, Precio_Venta, Foto_Producto, ID_Estado_FK) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      ID_Producto_PK,
      Nombre_Producto,
      ID_Tipo_Producto_FK,
      Descripcion,
      Precio_Proveedor,
      Precio_Venta,
      Foto_Producto,
      ID_Estado_FK,
    ]);

    res.json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar el producto", error);
    res.status(500).json({ error: "No se pudo agregar el producto" });
  }
};

const VerificarDuplicado = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `SELECT COUNT(*) AS count FROM producto WHERE ID_Producto_PK = ?`;
    const [result] = await db.query(query, [id]);

    const isDuplicate = result[0].count > 0;

    res.json({ duplicate: isDuplicate });
  } catch (error) {
    console.error("Error verifying duplicate ID:", error);
    res.status(500).json({ error: "Error verifying duplicate ID" });
  }
};

module.exports = {
  Datos,
  BorrarDatos,
  BuscarDatoPorId,
  BorrarInventario,
  ActualizarProducto,
  AgregarProducto,
  VerificarDuplicado,
};

//react Axios Y cors
