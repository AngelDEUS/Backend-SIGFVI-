/* 
**** DML * CONSULTAS -------> SIGFVI_V2
*/

USE SIGFVI_V2;

-- Simples
SELECT * FROM Estado; -- #1
SELECT * FROM Tipo_Producto; -- #2
SELECT * FROM Producto; -- #3
SELECT * FROM Tipo_Cargo; -- #4
SELECT * FROM Tipo_identificacion; -- #5
SELECT * FROM Usuario; -- #6
SELECT * FROM Registro_Proveedor; -- #7
SELECT * FROM Cuenta_Deudor; -- #8
SELECT * FROM Metodo_de_pago; -- #9
SELECT * FROM Saldo_Cuenta_Deudor; -- #10

SELECT * FROM Pedido; -- #11
SELECT * FROM Pedido WHERE ID_Pedido_PK = 21; -- #11

SELECT * FROM Venta_Realizada; -- #12
SELECT * FROM Facturacion; -- #13
SELECT * FROM Inventario; -- #14
SELECT * FROM Tipo_Informe_Venta; -- #15
SELECT * FROM Salida_producto_Inventario; -- #16
SELECT * FROM Tipo_Informe_Inventario; -- #17
SELECT * FROM Entrada_Producto; -- #18
SELECT * FROM Tipo_Informe_Empleado; -- #19
SELECT * FROM Detalle_Pedido; -- #20
SELECT * FROM Tipo_Informe_Cuenta_Deudor; -- #21
SELECT * FROM Registro_Proveedor_has_Producto; -- #22

-- INNER JOINS
-- > Ver usuarios con el nombre de identificacion y tipo de cargo
SELECT U.ID_Numero_Identificacion_PK, TI.Nombre_Identificacion as 'Tipo de Identificacion', U.Nombre_Usuario, U.Apellido_Usuario, U.Numero_Contacto_Usuario, U.Email_Usuario, TC.Nombre_Tipo_cargo
FROM Usuario U
INNER JOIN Tipo_identificacion TI
ON U.ID_Tipo_Identificacion_FKPK = TI.ID_Tipo_Identificacion_PK
INNER JOIN Tipo_Cargo TC
ON TC.ID_Tipo_Cargo_PK = U.ID_Tipo_Cargo_FK;

/*
SELECT * FROM Usuario;
SELECT * FROM tipo_cargo;
*/

-- ---> Mostrar Producto y cuanto stock hay.
SELECT P.ID_Producto_PK, P.Nombre_Producto, P.Precio_Proveedor, P.Precio_Venta, P.Fecha_Vencimiento, I.Stock
FROM inventario I
INNER JOIN producto P
ON I.ID_Producto_FK = P.ID_Producto_PK;

/*
SELECT * FROM producto;
SELECT * FROM inventario;
*/
-- ---> Cuales son los pedidos relacionados a la factura.
SELECT F.ID_Factura_PK, F.Fecha_Factura, F.Hora_Factura, VR.ID_Venta_Realizada_PK AS 'ID de Venta', P.ID_Pedido_PK, MP.Nombre_Metodo AS 'Metodo de Pago', P.Total_Pedido
FROM facturacion F
INNER JOIN venta_realizada VR
ON F.ID_Venta_Realizada_FK = VR.ID_Venta_Realizada_PK
INNER JOIN pedido P
ON VR.ID_Pedido_FK = ID_Pedido_PK
INNER JOIN metodo_de_pago MP
ON P.ID_Metodo_Pago_FK = MP.ID_Metodo_Pago_PK;

/*
SELECT * FROM facturacion;
SELECT * FROM venta_realizada;
SELECT * FROM pedido;
SELECT * FROM detalle_pedido;
SELECT * FROM metodo_de_pago;
*/

/*consulta desencriptando contraseñas*/

select tdoc_usu,id_usu,nombres,apellidos,aes_decrypt(unhex(password),"hunter2")
	from usuario;
    
    
select ID_Numero_Identificacion_PK, ID_Tipo_Identificacion_FKPK, Nombre_Usuario, Segundo_Nombre_Usuario, Apellido_Usuario, Segundo_Apellido_Usuario, Numero_Contacto_Usuario, Email_Usuario,aes_decrypt(unhex(Password_Usuario),"xd"), ID_Tipo_Cargo_FK, ID_Estado_FK
	from usuario;

select ID_Numero_Identificacion_PK, Email_Usuario,Password_Usuario, ID_Tipo_Cargo_FK, ID_Estado_FK
	from usuario;
select * from usuario;
describe usuario;
