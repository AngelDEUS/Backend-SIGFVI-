const db = require("../../models/sigfviDBModelo").promise();

const consultaDatos = async (req, res) => {
  try {
    console.log("Obteniendo datos...");

    const query =(`
      SELECT 
          P.ID_Producto_PK,
          P.Nombre_Producto,
          TP.Nombre_Tipo_Producto,
          P.Descripcion,
          P.Foto_Producto,
          P.Precio_Proveedor,
          P.Precio_Venta,
          I.Stock
      FROM 
          Producto AS P
      JOIN 
          Tipo_Producto AS TP ON P.ID_Tipo_Producto_FK = TP.ID_Tipo_Producto_PK
      JOIN 
          Inventario AS I ON P.ID_Producto_PK = I.ID_Producto_FK
      WHERE 
          P.ID_Estado_FK = 1
      `);
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

const BuscarInventario = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const query = `
    SELECT 
        P.ID_Producto_PK,
        P.Nombre_Producto,
        TP.Nombre_Tipo_Producto,
        P.Descripcion,
        P.Foto_Producto,
        P.Precio_Proveedor,
        P.Precio_Venta,
        I.Stock
    FROM 
        Producto AS P
    JOIN 
        Tipo_Producto AS TP ON P.ID_Tipo_Producto_FK = TP.ID_Tipo_Producto_PK
    JOIN 
        Inventario AS I ON P.ID_Producto_PK = I.ID_Producto_FK
    WHERE 
        P.ID_Estado_FK = 1
        AND (P.ID_Producto_PK = ? OR P.Nombre_Producto LIKE ?)
    `;
    const [result] = await db.query(query, [id, `%${id}%`]);

    const productosConImagen = result.map(producto => {
      return {
        ...producto,
        Foto_Url: `http://localhost:3001/img/${producto.Foto_Producto}`
      };
    });

    if (result.length > 0) {
      console.log("Enviando respuesta de inventario...");
      res.json({ datos: productosConImagen });
    } else {
      res.status(404).json({ mensaje: "No se encontró el dato" });
    }
  } catch (error) {
    console.error("No se pudo realizar la búsqueda", error);
    res.status(500).json({ error: "No se pudo realizar la búsqueda" });
  }
};

const reportarProducto = async (req, res) => {
  try {
    const { ID_Producto_PK, Descripcion_Salida, Cantidad_Reportada } = req.body;

    const fechaSalida = new Date().toISOString().split("T")[0];
    const horaSalida = new Date().toLocaleTimeString().split(" ")[0];

    const [inventarioResult] = await db.query(
      `
            SELECT ID_Inventario_PK
            FROM Inventario
            WHERE ID_Producto_FK = ?;
        `,
      [ID_Producto_PK]
    );

    if (inventarioResult.length === 0) {
      throw new Error(
        "No se encontró el inventario para el producto especificado."
      );
    }

    const ID_Inventario_FK = inventarioResult[0].ID_Inventario_PK;

    await db.query(
      `
            INSERT INTO Salida_producto_Inventario (Descripcion_Salida, Cantidad_Salida, Fecha_Salida, Hora_Salida, ID_Inventario_FK)
            VALUES (?, ?, ?, ?, ?);
        `,
      [
        Descripcion_Salida,
        Cantidad_Reportada,
        fechaSalida,
        horaSalida,
        ID_Inventario_FK,
      ]
    );

    await db.query(
      `
            UPDATE Inventario
            SET Stock = Stock - ?
            WHERE ID_Inventario_PK = ?;
        `,
      [Cantidad_Reportada, ID_Inventario_FK]
    );

    res.json({ mensaje: "Reporte realizado exitosamente." });
  } catch (error) {
    console.error("Error al realizar el reporte", error);
    res.status(500).json({ error: "Error al realizar el reporte." });
  }
};

const registrarEntradaProducto = async (req, res) => {
  try {
    const { productos, proveedorId } = req.body;
    const fechaEntrada = new Date().toISOString().split("T")[0];
    const horaEntrada = new Date().toLocaleTimeString().split(" ")[0];

    for (const producto of productos) {
      const [inventarioResult] = await db.query(
        `
          SELECT ID_Inventario_PK
          FROM Inventario
          WHERE ID_Producto_FK = ?;
        `,
        [producto.id]
      );

      if (inventarioResult.length > 0) {
        await db.query(
          `
            UPDATE Inventario
            SET Stock = Stock + ?
            WHERE ID_Producto_FK = ?;
          `,
          [producto.cantidad, producto.id]
        );
      } else {
        await db.query(
          `
            INSERT INTO Inventario (Stock, ID_Producto_FK)
            VALUES (?, ?);
          `,
          [producto.cantidad, producto.id]
        );
      }

      await db.query(
        `
          INSERT INTO Entrada_Producto (Cantidad_Entrada, Fecha_Entrada_Producto, Hora_Entrada_Producto, ID_Registro_Proveedor_Fk, Producto_Inventario)
          VALUES (?, ?, ?, ?, ?);
        `,
        [producto.cantidad, fechaEntrada, horaEntrada, proveedorId, producto.id]
      );
    }

    res.json({ mensaje: "Productos ingresados exitosamente." });
  } catch (error) {
    console.error("Error al ingresar los productos", error);
    res.status(500).json({ error: "Error al ingresar los productos." });
  }
};

module.exports = {
  consultaDatos,
  reportarProducto,
  registrarEntradaProducto,
  BuscarInventario,
};
