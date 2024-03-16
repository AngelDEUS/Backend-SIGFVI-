const db = require("../../models/sigfviDBModelo").promise();

const getProductoStock = async (req, res) => {
    try {
      const consulta = `
        SELECT
          P.ID_Producto_PK AS ID_Producto,
          P.Nombre_Producto AS Nombre,
          I.Stock AS Stock
        FROM
          Producto P
        JOIN
          Inventario I ON P.ID_Producto_PK = I.ID_Producto_FK;
      `;
  
      const [resultados] = await db.query(consulta);
  
      res.json(resultados);
    } catch (error) {
      console.error("No se pudo hacer la consulta", error);
      res.status(500).json({ error: "No se pudo hacer la consulta" });
    }
  };


  const prodmasVendidos = async (req, res) => {
    try {
        const consulta = `
            SELECT 
            P.ID_Producto_PK AS ID_Producto,
            P.Nombre_Producto AS Nombre,
            SUM(DV.Cantidad_Producto) AS Cantidad_Vendida
        FROM
            Detalle_Venta DV
                INNER JOIN
            Inventario I ON DV.ID_Inventario_FK = I.ID_Inventario_PK
                INNER JOIN
            Producto P ON I.ID_Producto_FK = P.ID_Producto_PK
        GROUP BY
            P.ID_Producto_PK , P.Nombre_Producto
        ORDER BY
            SUM(DV.Cantidad_Producto) DESC;
        `;
        
        const [resultados] = await db.query(consulta);
        
        res.json(resultados);
    } catch (error) {
        console.error("Error al obtener los productos más vendidos:", error);
        res.status(500).json({ error: "Error al obtener los productos más vendidos" });
    }
};

const productosStockBajo = async (req, res) => {
  try {
    const consulta = `
      SELECT
        P.ID_Producto_PK AS ID_Producto,
        P.Nombre_Producto AS Nombre,
        I.Stock
      FROM
        Producto P
      INNER JOIN
        Inventario I ON P.ID_Producto_PK = I.ID_Producto_FK
      WHERE
        I.Stock < 4;
    `;
    const [filas] = await db.query(consulta);
    res.json(filas);
  } catch (error) {
    console.error('Error al obtener los productos con stock bajo:', error);
    res.status(500).json({ error: 'Error al obtener los productos con stock bajo' });
  }
};

  
  module.exports = {
    getProductoStock,
    prodmasVendidos,
    productosStockBajo,
  };
  