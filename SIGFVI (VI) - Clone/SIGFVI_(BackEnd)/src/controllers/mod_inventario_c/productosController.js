const { response } = require("express");

const db = require("../../models/sigfviDBModelo").promise();



// Método para buscar todos los productos:
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

// Método par buscar un producto por nombre y coincidencia:
async function getProductoNombre(req, res) {
  try {
    const Nombre_Producto = req.params.nombre; // cambiar a minúscula 'nombre' en lugar de 'Nombre_Producto'
    const result = await db.query(`SELECT * FROM producto WHERE Nombre_Producto LIKE '%${Nombre_Producto}%';`);
    res.json(result[0]);
    console.log('Resultados encontrados: ', result[0]);
  } catch (error) {
    console.error('\x1b[31m', error, '\x1b[0m\n');
    res.status(500).send('Error al obtener el Nombre del Producto específico.');
  }
}



// Método para borrar un producto:
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


// Método para buscar un prodcuto por ID:
const BuscarDatoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM producto WHERE ID_Producto_PK = ?`;
    const [result] = await db.query(query, [id]);

    if (result.length > 0) {
      res.json({ dato: result[0] });
    } else {
      res.status(404).json({ mensaje: "No se encontró el dato" });
    }
  } catch (error) {
    console.error("No se pudo realizar la búsqueda", error);
    res.status(500).json({ error: "No se pudo realizar la búsqueda" });
  }
};


// Método para actualizar un prodcuto por ID:
const ActualizarProducto = async (req, res) => {
  const { id } = req.params;
  const {
    Nombre_Producto,
    Cantida_Neto_producto,
    Precio_Proveedor,
    Precio_Venta,
  } = req.body;

  try {
    const query = `
      UPDATE producto 
      SET Nombre_Producto=?, Cantida_Neto_producto=?, Precio_Proveedor=?, Precio_Venta=?
      WHERE ID_Producto_PK=?
    `;
    await db.query(query, [
      Nombre_Producto,
      Cantida_Neto_producto,
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


// Método para Agregar/Crear un producto:
const AgregarProducto = async (req, res) => {
  const {
    ID_Producto_PK,
    Nombre_Producto,
    ID_Tipo_Producto_FK,
    Cantida_Neto_producto,
    Precio_Proveedor,
    Precio_Venta,
    Foto_Producto,
    ID_Estado_FK,
  } = req.body;

  try {
    const query = `
      INSERT INTO producto 
      (ID_Producto_PK, Nombre_Producto, ID_Tipo_Producto_FK, Cantida_Neto_producto, Precio_Proveedor, Precio_Venta, Foto_Producto, ID_Estado_FK) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      ID_Producto_PK,
      Nombre_Producto,
      ID_Tipo_Producto_FK,
      Cantida_Neto_producto,
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

module.exports = {
  Datos,
  getProductoNombre,
  BorrarDato,
  BuscarDatoPorId,
  ActualizarProducto,
  AgregarProducto,
};

//react Axios Y cors