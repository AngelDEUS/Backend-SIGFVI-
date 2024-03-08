/* 
**** Consultas Ventas -------> SIGFVI_V2
*/

USE SIGFVI_V2;


-- Vista para los productos y el estock total por ID (todos los resultado)
SELECT * FROM producto;
SELECT * FROM Inventario;
SELECT * FROM Tipo_Producto;
SELECT 
    Producto.ID_Producto_PK,
    Producto.Nombre_Producto,
    Tipo_Producto.Nombre_Tipo_Producto,
    Producto.Descripcion_Producto,
    Producto.Precio_Venta,
    SUM(Inventario.Stock) AS Stock_Total
FROM 
    Inventario
JOIN 
    Producto ON Inventario.ID_Producto_FK = Producto.ID_Producto_PK
JOIN
    Tipo_Producto ON Producto.ID_Tipo_Producto_FK = Tipo_Producto.ID_Tipo_Producto_PK
GROUP BY 
    Producto.ID_Producto_PK, 
    Producto.Nombre_Producto,
    Tipo_Producto.Nombre_Tipo_Producto,
    Producto.Descripcion_Producto,
    Producto.Precio_Venta;
    
    

-- Vista para los productos y el estock total por ID (por ID)
SELECT 
	Producto.ID_Producto_PK,
	Producto.Nombre_Producto,
	Tipo_Producto.Nombre_Tipo_Producto,
	Producto.Descripcion_Producto,
	Producto.Precio_Venta,
	SUM(Inventario.Stock) AS Stock_Total
FROM 
	Inventario
JOIN 
	Producto ON Inventario.ID_Producto_FK = Producto.ID_Producto_PK
JOIN
	Tipo_Producto ON Producto.ID_Tipo_Producto_FK = Tipo_Producto.ID_Tipo_Producto_PK
WHERE
	Producto.ID_Producto_PK = ?
GROUP BY 
	Producto.ID_Producto_PK, 
	Producto.Nombre_Producto,
	Tipo_Producto.Nombre_Tipo_Producto,
	Producto.Descripcion_Producto,
	Producto.Precio_Venta;
