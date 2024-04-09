const db = require("../../models/sigfviDBModelo").promise();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../img"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

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

    const productosConImagen = result.map((producto) => {
      return {
        ...producto,
        Foto_Url: `http://localhost:3001/img/${producto.Foto_Producto}`,
      };
    });

    console.log("Enviando respuesta...");
    res.json({ datos: productosConImagen });
  } catch (error) {
    console.error("No se pudo hacer la consulta", error);
    res.status(500).json({ error: "No se pudo hacer la consulta" });
  }
};

const BorrarDatos = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      `DELETE FROM Entrada_Producto WHERE Producto_Inventario = ?`,
      [id]
    );

    await db.query(
      `DELETE FROM Salida_producto_Inventario WHERE ID_Inventario_FK IN 
      (SELECT ID_Inventario_PK FROM Inventario WHERE ID_Producto_FK = ?)`,
      [id]
    );

    await db.query(
      `DELETE FROM Detalle_Venta WHERE ID_Inventario_FK IN 
      (SELECT ID_Inventario_PK FROM Inventario WHERE ID_Producto_FK = ?)`,
      [id]
    );

    await db.query(`DELETE FROM Inventario WHERE ID_Producto_FK = ?`, [id]);

    await db.query(`DELETE FROM Producto WHERE ID_Producto_PK = ?`, [id]);

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
    WHERE
      P.ID_Producto_PK = ? OR
      P.Nombre_Producto LIKE ?;
    `;
    const [result] = await db.query(query, [id, `%${id}%`]);

    const productosConImagen = result.map((producto) => {
      return {
        ...producto,
        Foto_Url: `http://localhost:3001/img/${producto.Foto_Producto}`,
      };
    });

    if (result.length > 0) {
      console.log("Enviando respuesta...");
      res.json({ datos: productosConImagen });
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
    ID_Estado_FK,
  } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    const Foto_Producto = req.file.filename; // Debes declarar la variable antes de usarla

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

const AgregarProductoMovil = async (req, res) => {
  const {
    ID_Producto_PK,
    Nombre_Producto,
    ID_Tipo_Producto_FK,
    Descripcion,
    Precio_Proveedor,
    Precio_Venta,
    ID_Estado_FK,
  } = req.body;

  console.log(req.body);

  try {
    const query = `
      INSERT INTO producto 
      (ID_Producto_PK, Nombre_Producto, ID_Tipo_Producto_FK, Descripcion, Precio_Proveedor, Precio_Venta, ID_Estado_FK) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      ID_Producto_PK,
      Nombre_Producto,
      ID_Tipo_Producto_FK,
      Descripcion,
      Precio_Proveedor,
      Precio_Venta,
      ID_Estado_FK,
    ]);

    res.json({ mensaje: "Producto agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar el producto", error);
    res.status(500).json({ error: "No se pudo agregar el producto" });
  }
};

module.exports = {
  Datos,
  BorrarDatos,
  BuscarDatoPorId,
  BorrarInventario,
  ActualizarProducto,
  AgregarProducto,
  AgregarProductoMovil,
  VerificarDuplicado,
  upload,
};
