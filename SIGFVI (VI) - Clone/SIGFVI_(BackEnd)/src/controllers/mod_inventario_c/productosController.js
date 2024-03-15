const db = require("../../models/sigfviDBModelo").promise();

const Datos = async (req, res) => {
  try {
    console.log("Obteniendo datos...");
    const query = `SELECT * FROM producto`;
    const [result] = await db.query(query);
    console.log("Enviando respuesta...");
    res.json({ datos: result });
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.status(500).json({ error: "No se pudo hacer la consulta" });
  }
};

const BorrarDato = async (req, res) => {
  const { id } = req.params; 
  try {
    const query = `DELETE FROM producto WHERE ID_Producto_PK = ?`;
    await db.query(query, [id]);
    res.json({ mensaje: "Dato eliminado exitosamente" });
  } catch (error) {
    console.error("No se pudo borrar el dato", error);
    res.status(500).json({ error: "No se pudo borrar el dato" });
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
  } = req.body;

  try {
    const query = `
      UPDATE producto 
      SET Nombre_Producto=?, Descripcion=?, Precio_Proveedor=?, Precio_Venta=?
      WHERE ID_Producto_PK=?
    `;
    await db.query(query, [
      Nombre_Producto,
      Descripcion,
      Precio_Proveedor,
      Precio_Venta,
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
  BorrarDato,
  BuscarDatoPorId,
  BorrarInventario,
  ActualizarProducto,
  AgregarProducto,
  VerificarDuplicado,
};

//react Axios Y cors