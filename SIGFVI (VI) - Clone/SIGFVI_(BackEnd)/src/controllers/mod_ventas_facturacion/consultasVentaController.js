/*
    * Controlador de las Consultas usadas en el módulo de ventas.
*/
const db = require('../../models/sigfviDBModelo');

const ObtenerProductosVenta = (req, res) => {
    console.log("\n-----> Obteniendo datos de productos...");
    db.query(`
    SELECT 
        Producto.ID_Producto_PK,
        Producto.Nombre_Producto,
        Tipo_Producto.Nombre_Tipo_Producto,
        Producto.Descripcion,
        Producto.Precio_Venta,
        SUM(Inventario.Stock) AS Stock_Total,    
        Inventario.ID_Inventario_PK AS 'Inventario_ID'
    FROM 
        Inventario
    JOIN 
        Producto ON Inventario.ID_Producto_FK = Producto.ID_Producto_PK
    JOIN
        Tipo_Producto ON Producto.ID_Tipo_Producto_FK = Tipo_Producto.ID_Tipo_Producto_PK
    GROUP BY 
        Inventario.ID_Inventario_PK,
        Producto.ID_Producto_PK, 
        Producto.Nombre_Producto,
        Tipo_Producto.Nombre_Tipo_Producto,
        Producto.Descripcion,
        Producto.Precio_Venta
    HAVING 
        Stock_Total > 0;

    `, (err, result) => {
        if (err) {
            console.error("Error al obtener datos de productos", err);
            res.status(500).json({ error: "No se pudieron obtener los datos de productos" });
        } else {
            console.log("-----> Enviando respuesta de productos...\n");
            res.json({ productos: result });
        }
    });
};

// Endpoint para buscar productos por nombre
const BuscarProductoPorNombre = (req, res) => {
    const { nombre } = req.params;
    console.log("\n---> Buscando productos por nombre...");
    db.query(
        `
        SELECT 
            Producto.ID_Producto_PK,
            Producto.Nombre_Producto,
            Tipo_Producto.Nombre_Tipo_Producto,
            Producto.Descripcion,
            Producto.Precio_Venta,
            SUM(Inventario.Stock) AS Stock_Total,    
            Inventario.ID_Inventario_PK AS 'Inventario_ID'
        FROM 
            Inventario
        JOIN 
            Producto ON Inventario.ID_Producto_FK = Producto.ID_Producto_PK
        JOIN
            Tipo_Producto ON Producto.ID_Tipo_Producto_FK = Tipo_Producto.ID_Tipo_Producto_PK
        WHERE
            Producto.Nombre_Producto LIKE ?
        GROUP BY 
            Inventario.ID_Inventario_PK,
            Producto.ID_Producto_PK, 
            Producto.Nombre_Producto,
            Tipo_Producto.Nombre_Tipo_Producto,
            Producto.Descripcion,
            Producto.Precio_Venta
        `,
        [`%${nombre}%`],
        (err, result) => {
            if (err) {
                console.error("Error al buscar productos por nombre", err);
                res.status(500).json({ error: "No se pudieron buscar los productos por nombre" });
            } else {
                console.log("---> Enviando respuesta de productos encontrados por nombre...\n");
                res.json({ productos: result });
            }
        }
    );
};

// Endpoint para buscar productos por ID
const BuscarProductoPorID = (req, res) => {
    const { id } = req.params; // Usamos req.params en lugar de req.body
    console.log("\n-----> Buscando producto por ID...");
    db.query(
        `
        SELECT 
            Producto.ID_Producto_PK,
            Producto.Nombre_Producto,
            Tipo_Producto.Nombre_Tipo_Producto,
            Producto.Descripcion,
            Producto.Precio_Venta,
            SUM(Inventario.Stock) AS Stock_Total,    
            Inventario.ID_Inventario_PK AS 'Inventario_ID'
        FROM 
            Inventario
        JOIN 
            Producto ON Inventario.ID_Producto_FK = Producto.ID_Producto_PK
        JOIN
            Tipo_Producto ON Producto.ID_Tipo_Producto_FK = Tipo_Producto.ID_Tipo_Producto_PK
        WHERE
            Producto.ID_Producto_PK = ? 
        GROUP BY 
            Inventario.ID_Inventario_PK,
            Producto.ID_Producto_PK, 
            Producto.Nombre_Producto,
            Tipo_Producto.Nombre_Tipo_Producto,
            Producto.Descripcion,
            Producto.Precio_Venta;
        `,
        [id], // Usamos directamente el ID sin ningún operador
        (err, result) => {
            if (err) {
                console.error("Error al buscar producto por ID", err);
                res.status(500).json({ error: "No se pudo buscar el producto por ID" });
            } else {
                console.log("------> Enviando respuesta del producto encontrado por ID...\n");
                res.json({ producto: result[0] });
            }
        }
    );
};


module.exports = {
    ObtenerProductosVenta,
    BuscarProductoPorNombre,
    BuscarProductoPorID
};
