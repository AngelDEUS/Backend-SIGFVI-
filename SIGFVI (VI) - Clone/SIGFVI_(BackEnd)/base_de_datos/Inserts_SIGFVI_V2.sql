/* 
**** INSERTS -------> SIGFVI_V2
*/

USE SIGFVI_V2;

 -- #1 -- Estado
INSERT INTO Estado(ID_Estado_PK, Nombre_Estado)
	VALUES  (0,'Inactivo'),
			(1,'Activo'),
			(2,'Cancelado');

 -- #2 -- Tipo_Producto
INSERT INTO Tipo_Producto(ID_Tipo_Producto_PK, Nombre_Tipo_Producto)
    VALUES  (1,'Botella'),
            (2,'Lata'),
            (3,'Paquete'),
            (4,'Caja');
 
 
 -- #3 -- Producto
INSERT INTO Producto (ID_Producto_PK, ID_Tipo_Producto_FK, Nombre_Producto, Descripcion, Precio_Proveedor, Precio_Venta, Foto_Producto, ID_Estado_FK)
 VALUES ('AGU-001', 1, 'Agua Mineral', '600 ml', 1000.00, 1500.00, 'url_agua_mineral.jpg', 0),
        ('ARR-001', 2, 'Arroz', '5 kilos', 5000.00, 6000.00, 'url_arroz.jpg', 0),
        ('POK-001', 3, 'Poker', '330 ml', 2500.00, 3000.00, 'url_cerveza.jpg', 0),
        ('JUG-001', 1, 'Jugo de Naranja', '1 Litro', 3000.00, 4000.00, 'url_jugo_naranja.jpg', 0),
        ('PAQ-001', 2, 'Paquete de Galletas', '30 gramos', 2000.00, 2500.00, 'url_galletas.jpg', 0),
        ('REF-001', 3, 'Refresco en Lata', '330 ml', 1500.00, 2000.00, 'url_refresco_lata.jpg', 0),
        ('ACE-001', 1, 'Aceite de Cocina', '1 Litro', 8000.00, 10000.00, 'url_aceite.jpg', 0),
        ('PAQ-003', 2, 'Paquete de Pasta', '500 gramos', 4000.00, 5000.00, 'url_pasta.jpg', 0),
        ('CER-001', 3, 'Cerveza Light', '330 ml', 3000.00, 3500.00, 'url_cerveza_light.jpg', 0),
        ('BOT-001', 1, 'Botella de Vino', '1 litro', 25000.00, 30000.00, 'url_vino.jpg', 0);

SELECT * FROM Producto;
 -- #4 -- Tipo_Cargo
INSERT INTO Tipo_Cargo(ID_Tipo_Cargo_PK, Nombre_Tipo_cargo,Estado_ID_Estado_PK)
	VALUES  (1,'Super-Administrador',0),
			(2,'Gerente',0),
			(3,'Empleado',0);

 -- #5 -- Tipo_identificacion
 INSERT INTO Tipo_identificacion(ID_Tipo_Identificacion_PK,Nombre_Identificacion)
	VALUES  (1,'CC'),
			(2,'CE');

 -- #6 -- Usuario
 /*INSERT INTO Usuario(ID_Numero_Identificacion_PK,ID_Tipo_Identificacion_FKPK,Nombre_Usuario,Segundo_Nombre_Usuario,Apellido_Usuario,Segundo_Apellido_Usuario,Numero_Contacto_Usuario,Email_Usuario,Password_Usuario,ID_Tipo_Cargo_FK,ID_Estado_FK)
	VALUES ('SW10053-1*',1,'SuperUser','-','_1','.','3153851945','empresa1@gmail.com','...***0000ñ',1,0);*/
INSERT INTO Usuario(ID_Numero_Identificacion_PK,ID_Tipo_Identificacion_FKPK,Nombre_Usuario,Segundo_Nombre_Usuario,Apellido_Usuario,Segundo_Apellido_Usuario,Numero_Contacto_Usuario,Email_Usuario,Password_Usuario,ID_Tipo_Cargo_FK,ID_Estado_FK)    
	VALUES ('SW10053-1*',1,'SuperUser','-','_1','.','3153851945','empresa1@gmail.com','$2b$08$CVWjEaDJaTBEm8Vo4ARc7eU9m24sJ4MDon6s1OgqlBaNUjKd/TPPq',1,0); /*Admon123*/
  INSERT INTO Usuario 
	VALUES 	('35684579',1,'Luz','Estela','Rodriguez','Linares','3124352560','lstlinares@hotmail.com','$2b$08$XJd1gI0V1vWXNXHjX.3XTOxt82mIQ8Te3qx8U.TiM9FujleeXGN0i',2,0), /*Jesus01*/
			('1006865674',1,'Fransico','Arnulfo','Aristizabal','Rodriguez','3194584239', 'Fra.Aris@gmail.com','$2b$08$hEwWwvSGwMQwfsOBK/60VOf5mdNTguAHScAWCjhh3jq6PEoDg/XVq',3,0), /*0000*/
			('10564454999999994',2,'Jean','Carlo','Beltran','Amaya','3155758594', 'jean.carl@gmail.com','$2b$08$hEwWwvSGwMQwfsOBK/60VOf5mdNTguAHScAWCjhh3jq6PEoDg/XVq',3,1); /*0000*/
 
 -- #7 -- Registro_Proveedor
 INSERT INTO Registro_Proveedor(Nombre_Empresa,Dia_Visita,Telefono_Contacto,Estado_ID_Estado_PK)
	VALUES  ('Babaria','Lunes - Miercoles','3144441157',0),
			('Fritolay','Martes - Viernes','3228524525',0),
			('Alpina','Jueves - Sabado','311444444',0),
			('Margarita','Lunes - Miercoles','3114159755',1);
 
 -- #8 -- Cuenta_Deudor
 INSERT INTO Cuenta_Deudor(ID_Deudor_PK, Primer_Nombre,Segundo_Nombre,Primer_Apellido,Segundo_Apellido,Direccion_Deudor,Telefono_Deudor,ID_Estado_FK)
	VALUES  ('111','Omar','Ferney','Badillo','de la Cruz', 'Tv 7 #25-3L','3181475823',0),
			('222','Camila','Valentina','Gómez','Pérez','Carrera 56 #89-34','23456789',0),
            ('333','Juan','Carlos','Rodríguez','Sánchez','Calle 67 #12-45',' 45678901',0),
            ('444','Oscar','Eduardo','Ramírez','Torres','Carrera 12 #23-45','56789012',1),
            ('555','Valeria','Isabel','Castro','Ruiz','Calle 78 #56-12','67890123',0),
            ('666','María','José','González','Vargas','Carrera 45 #67-89','78901234',1),
            ('777','Andrés','Felipe','López','Pérez','Avenida 23 #34-56','89012345',1);

 -- #9 -- Metodo_de_pago
 INSERT INTO Metodo_de_pago(Nombre_Metodo, Tipo_Metodo_Pago, Referencia, ID_Estado_FK)
	VALUES  ('Efectivo','Fisico','',0),
			('Nequi','Electronico','123-456-789-000',0),
			('Daviplata','Electronico','123-000-456-789',0),
			('Tarjeta','Electronico','123-456-000-789',1);
SELECT * FROM Metodo_de_pago;

SELECT * FROM producto WHERE Nombre_Producto LIKE '%%';
SELECT * FROM Metodo_de_pago WHERE Nombre_Metodo LIKE '%Tarjeta%';


            
-- #10 -- Saldo_Cuenta_Deudor
INSERT INTO Saldo_Cuenta_Deudor(ID_Deudor_FK,Fecha_Cancelacion_Pedido,Total_Saldo_Deuda)
	VALUES  ('111','2023-03-24',50000);
INSERT INTO Saldo_Cuenta_Deudor(ID_Deudor_FK,Fecha_Cancelacion_Pedido,Total_Saldo_Deuda)
	VALUES  ('222','2023-03-24',50000),
			('333','2023-08-01',20000),
			('444','2023-03-02',5000),
			('555','2023-09-13',40000),
			('666','2023-05-24',300000),
			('777','2023-02-17',28500);
            
-- #11 -- Pedido
INSERT INTO Pedido(ID_Metodo_Pago_FK,Fecha_Pedido,Hora_Pedido,IVA,Total_Pedido,ID_Estado_FK,ID_Saldo_PK)
	VALUES  (1,'2023-03-24','10:20:12',0.19,((50000)+(IVA*50000)),1,1);
INSERT INTO Pedido(ID_Metodo_Pago_FK,Fecha_Pedido,Hora_Pedido,IVA,Total_Pedido,ID_Estado_FK,ID_Saldo_PK)
	VALUES  (1,'2023-03-24','10:30:20',19,((50000)+(IVA*(50000)/100)),0,1);
INSERT INTO Pedido(ID_Metodo_Pago_FK,Fecha_Pedido,Hora_Pedido,IVA,Total_Pedido,ID_Estado_FK,ID_Saldo_PK)    
	VALUES	(1,'2023-03-24','18:11:33',19,((50000)+(IVA*(50000)/100)),0,2),
			(1,'2023-08-01','13:20:20',19,((20000)+(IVA*(20000)/100)),0,3),
			(1,'2023-03-02','15:50:19',19,((5000)+(IVA*(5000)/100)),0,4),
			(3,'2023-09-13','11:11:11',19,((40000)+(IVA*(40000)/100)),0,5),
			(2,'2023-05-24','23:50:20',19,((300000)+(IVA*(300000)/100)),0,6),
			(1,'2023-02-17','14:13:28',19,((28500)+(IVA*(28500)/100)),0,7);
    
select * from Venta_Realizada;    
-- #12 -- Venta_Realizada
INSERT INTO Venta_Realizada(ID_Saldo_Cuenta_Deudor_FK,ID_Pedido_FK)
	VALUES  (1,1);
INSERT INTO Venta_Realizada(ID_Saldo_Cuenta_Deudor_FK,ID_Pedido_FK)
	VALUES  (1,4),
			(2,5),
			(3,6),
			(4,7),
			(5,8),
			(6,2),
			(7,3);

select * from Venta_Realizada;
select * from Pedido;

-- #13 -- Facturacion
INSERT INTO Facturacion(Fecha_Factura,Hora_Factura,ID_Venta_Realizada_FK)
	VALUES  ('2023-03-25','15:08:20',1),
			('2023-03-25','13:20:11',2),
			('2023-03-25','23:50:01',3),
			('2023-08-05','20:10:50',4),
			('2023-03-03','17:23:58',5),
			('2023-09-14','16:32:20',6),
			('2023-05-25','13:57:10',7),
			('2023-02-17','06:09:09',8);

-- #14 -- Inventario
INSERT INTO Inventario (Stock, ID_Producto_FK)
    VALUES ( 90, 'AGU-001'),
            ( 40, 'ARR-001'),
            ( 180, 'POK-001'),
            ( 70, 'JUG-001'),
            ( 180, 'POK-001'),
            ( 80, 'ARR-001'),
            ( 120, 'PAQ-001');
    
SELECT * FROM Inventario;
select * from Producto;
    
-- #15 -- Tipo_Informe_Venta
INSERT INTO Tipo_Informe_Venta(ID_Informe_Venta_PF,ID_Factura_FK)
	VALUES  (1,1),
			(2,2),
			(3,3),
			(4,4),
			(5,5),
			(6,6),
			(7,7),
			(8,8);
            
SELECT * FROM Facturacion;
SELECT * FROM inventario;
SELECT * FROM usuario;

-- #16 -- Salida_producto_Inventario
INSERT INTO Salida_producto_Inventario(Descripcion_Salida,Fecha_Salida,Hora_Salida,ID_Inventario_FK,ID_Ident_Usu_FK,ID_Tipo_Ident_Usu_FKPK)
	VALUES  ('Se rompio el panquete de lado izquierdo','2023-03-16','10:18:20',4,'1006865674',1);
INSERT INTO Salida_producto_Inventario(Descripcion_Salida,Fecha_Salida,Hora_Salida,ID_Inventario_FK,ID_Ident_Usu_FK,ID_Tipo_Ident_Usu_FKPK)
	VALUES  ('Se paso la fecha de caducidad','2023-08-23','09:50:15',3,'1006865674',1);

-- #17 -- Tipo_Informe_Inventario
INSERT INTO Tipo_Informe_Inventario(ID_Informe_Inventario_PK,ID_Salida_producto_Inventario_FK,ID_Inventario_FK)
	VALUES  (1,1,4),
			(2,1,3);
SELECT * FROM Tipo_Informe_Inventario;

-- #18 -- Entrada_Producto
INSERT INTO Entrada_Producto(Fecha_Entrada_Producto,Hora_Entrada_Producto,ID_Inventario_FK)
	VALUES  ('2023-08-09','09:20:10',2),
			('2023-08-09','09:23:00',1),
			('2023-08-09','09:25:50',2),
			('2023-08-10','09:30:35',3),
			('2023-08-10','09:40:27',4);

select * from Entrada_Producto;
select * from Producto;
select * from Inventario;
    
-- #19 -- Tipo_Informe_Empleado;
INSERT INTO Tipo_Informe_Empleado(ID_Entrada_Producto_FK,ID_Salida_producto_Inventario_FK)
	VALUES  (1,1),
			(3,2);
select * from Tipo_Informe_Empleado;

-- #20 -- Detalle_Pedido;
INSERT INTO Detalle_Pedido(Cantidad_Producto,SubTotal,Pedido_ID_Pedido_FK,ID_Inventario_FK)
	VALUES  (50,(Cantidad_Producto*1000),4,2);
    
INSERT INTO Detalle_Pedido(Cantidad_Producto,SubTotal,Pedido_ID_Pedido_FK,ID_Inventario_FK)
	VALUES  (10,(Cantidad_Producto*3000),7,3),
			(30,(Cantidad_Producto*2500),6,4),
			(123,(Cantidad_Producto*3000),8,5);

select * from producto;
select * from pedido;
select * from inventario;

-- #21 -- Tipo_Informe_Cuenta_Deudor;
INSERT INTO Tipo_Informe_Cuenta_Deudor(ID_Saldo_Cuenta_Deudor_FK)
	VALUES  (1),
			(2),
			(3),
			(4),
			(5),
			(6),
			(7);
SELECT * FROM Saldo_Cuenta_Deudor;


-- #22 -- Registro_Proveedor_has_Producto;
INSERT INTO Registro_Proveedor_has_Producto(ID_Registro_Proveedor_FKPK, ID_Producto_FKPK)
	VALUES  (1,'AGU-001'),
			(2,'ARR-001'),
			(3,'POK-001'),
			(4,'JUG-001');
    
SELECT * FROM registro_proveedor;
SELECT * FROM producto;

INSERT INTO Inventario (Stock, ID_Producto_FK)
    VALUES ( 1, 'BOT-001');



