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
    Producto.Descripcion,
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
    Producto.Descripcion,
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
    

-- -------------------------------------------->>>>>
-- -----> Vista de los deudores [BUSQUEDA GENERAL].
SELECT 
	CD.ID_Deudor_PK AS 'ID',
    CONCAT_WS('',CD.Primer_Nombre, '', CD.Segundo_Nombre) AS 'Nombres',
    CONCAT_WS('',CD.Primer_Apellido, '', CD.Segundo_Apellido) AS 'Apellidos',
    CD.Direccion_Deudor,
    CD.Telefono_Deudor,
    Estado.Nombre_Estado
FROM   
	Cuenta_Deudor CD
JOIN 
	Estado ON CD.ID_Estado_FK = ID_Estado_PK
WHERE 
	CD.ID_Estado_FK = 1;

-- -----> Vista de los deudores [BUSQUEDA POR NOMBRE].
SELECT 
	CD.ID_Deudor_PK AS 'ID',
    CONCAT_WS('',CD.Primer_Nombre, '', CD.Segundo_Nombre) AS 'Nombres',
    CONCAT_WS('',CD.Primer_Apellido, '', CD.Segundo_Apellido) AS 'Apellidos',
    CD.Direccion_Deudor,
    CD.Telefono_Deudor,
    Estado.Nombre_Estado
FROM   
	Cuenta_Deudor CD
JOIN 
	Estado ON CD.ID_Estado_FK = ID_Estado_PK
WHERE
	ID_Deudor_PK = 3;

-- -----> Vista de los deudores [BUSQUEDA POR ID].
SELECT 
	CD.ID_Deudor_PK AS 'ID',
    CONCAT_WS('',CD.Primer_Nombre, '', CD.Segundo_Nombre) AS 'Nombres',
    CONCAT_WS('',CD.Primer_Apellido, '', CD.Segundo_Apellido) AS 'Apellidos',
    CD.Direccion_Deudor,
    CD.Telefono_Deudor,
    Estado.Nombre_Estado
FROM Cuenta_Deudor CD
JOIN 
	Estado ON CD.ID_Estado_FK = ID_Estado_PK
WHERE
	CD.Primer_Nombre LIKE '%C%' OR CD.Primer_Apellido LIKE '%C%';
    
SELECT * FROM Cuenta_Deudor;


-- ----------------------------> CONSULTAS PAGAR .
-- -----> Consulta de los Metodos De pago con Estado Activo.
SELECT * FROM Metodo_de_pago;
SELECT 
	MP.Nombre_Metodo,
    MP.Referencia
FROM 
	Metodo_de_pago MP
JOIN
	Estado AS E ON MP.ID_Estado_FK = E.ID_Estado_PK
WHERE
	MP.ID_Estado_FK = 1;
    
-- UPDATE Metodo_de_pago SET ID_Estado_FK = 0 WHERE ID_Metodo_Pago_PK = 4;
