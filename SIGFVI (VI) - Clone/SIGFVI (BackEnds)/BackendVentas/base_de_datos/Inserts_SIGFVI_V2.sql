/* 
**** INSERTS -------> SIGFVI_V2
*/

USE SIGFVI_V2;

 -- #1 -- Estado
INSERT INTO Estado(ID_Estado_PK, Nombre_Estado)
	VALUES  (0,'Activo'),
			(1,'Inactivo'),
			(3,'Cancelado');

 -- #2 -- Tipo_Producto
 INSERT INTO Tipo_Producto(ID_Tipo_Producto_PK, Nombre_Tipo_Producto)
	VALUES  (1,'Embotellado'),
			(2,'Enlatado'),
			(3,'Empaquetado'),
			(4,'Encajado');
 
 -- #3 -- Producto
 INSERT INTO Producto(ID_Producto_PK, ID_Tipo_Producto_FK, Nombre_Producto, Cantida_Neto_producto, Precio_Proveedor, Precio_Venta, Fecha_Vencimiento, Foto_Producto, ID_Estado_FK)
	VALUES  ('EMRC001',1,'Ron Caldas',750,40000,50000,'2023-12-08','PROYECTO SIGFVI (IV)\View\img\Imagenes_PROD\1',0);
 INSERT INTO Producto(ID_Producto_PK, ID_Tipo_Producto_FK, Nombre_Producto, Cantida_Neto_producto, Precio_Proveedor, Precio_Venta, Fecha_Vencimiento, Foto_Producto, ID_Estado_FK)
	VALUES  ('ENPk001',2,'Poker',250,1600,2000,'2024-01-09','PROYECTO SIGFVI (IV)\View\img\Imagenes_PROD\2',0),
			('EMCT001',3,'Cheese-Tris',75,1000,1500,'2023-10-01','PROYECTO SIGFVI (IV)\View\img\Imagenes_PROD\3',0),
			('ENNL001',4,'Nectar 1L',1000,3000,38000,'2024-2-20','PROYECTO SIGFVI (IV)\View\img\Imagenes_PROD\4',0),
			('ENFr002',4,'Fruper',200,800,1200,'2023-11-13','PROYECTO SIGFVI (IV)\View\img\Imagenes_PROD\5',1);
            
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
	VALUES ('SW10053-1*',1,'SuperUser','-','_1','.','3153851945','empresa1@gmail.com',hex(aes_encrypt('...***0000ñ',"xd")),1,0);
  INSERT INTO Usuario 
	VALUES 	('35684579',1,'Luz','Estela','Rodriguez','Linares','3124352560','lstlinares@hotmail.com',hex(aes_encrypt('Jesus01',"xd")),2,0),
			('1006865674',1,'Fransico','Arnulfo','Aristizabal','Rodriguez','3194584239', 'Fra.Aris@gmail.com',hex(aes_encrypt('123456789',"xd")),3,0),
			('10564454999999994',2,'Jean','Carlo','Beltran','Amaya','3155758594', 'jean.carl@gmail.com',hex(aes_encrypt('j123',"xd")),3,1);
 
 -- #7 -- Registro_Proveedor
 INSERT INTO Registro_Proveedor(ID_Registro_Proveedor_PK,Nombre_Empresa,Dia_Visita,Telefono_Contacto,Estado_ID_Estado_PK)
	VALUES  (1, 'Babaria','Lunes - Miercoles','3144441157',0),
			(2, 'Fritolay','Martes - Viernes','3228524525',0),
			(3, 'Alpina','Jueves - Sabado','311444444',0),
			(4, 'Margarita','Lunes - Miercoles','3114159755',1);
 
 -- #8 -- Cuenta_Deudor
 INSERT INTO Cuenta_Deudor(Primer_Nombre,Segundo_Nombre,Primer_Apellido,Segundo_Apellido,Direccion_Deudor,Telefono_Deudor,ID_Estado_FK)
	VALUES  ('Omar','Ferney','Badillo','de la Cruz', 'Tv 7 #25-3L','3181475823',0),
			('Camila','Valentina','Gómez','Pérez','Carrera 56 #89-34','23456789',0),
            ('Juan','Carlos','Rodríguez','Sánchez','Calle 67 #12-45',' 45678901',0),
            ('Oscar','Eduardo','Ramírez','Torres','Carrera 12 #23-45','56789012',1),
            ('Valeria','Isabel','Castro','Ruiz','Calle 78 #56-12','67890123',0),
            ('María','José','González','Vargas','Carrera 45 #67-89','78901234',1),
            ('Andrés','Felipe','López','Pérez','Avenida 23 #34-56','89012345',1);

 -- #9 -- Metodo_de_pago
 INSERT INTO Metodo_de_pago(ID_Metodo_Pago_PK,Nombre_Metodo)
	VALUES  (1,'Efectivo'),
			(2,'Nequi'),
			(3,'Daviplata');
            
-- #10 -- Saldo_Cuenta_Deudor
INSERT INTO Saldo_Cuenta_Deudor(ID_Deudor_FK,Fecha_Cancelacion_Pedido,Total_Saldo_Deuda)
	VALUES  (1,'2023-03-24',50000);
INSERT INTO Saldo_Cuenta_Deudor(ID_Deudor_FK,Fecha_Cancelacion_Pedido,Total_Saldo_Deuda)
	VALUES  (2,'2023-03-24',50000),
			(3,'2023-08-01',20000),
			(4,'2023-03-02',5000),
			(5,'2023-09-13',40000),
			(6,'2023-05-24',300000),
			(7,'2023-02-17',28500);
            
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
INSERT INTO Inventario(Cantidad_Lote,Stock,ID_Estado_FK,ID_Producto_FK)
	VALUES  (2,4,1,'EMCT001');
INSERT INTO Inventario(Cantidad_Lote,Stock,ID_Estado_FK,ID_Producto_FK)
	VALUES  (3,6,1,'EMRC001'),
			(4,10,1,'ENFr002'),
			(3,8,1,'ENNL001'),
			(6,6,1,'ENPk001');
SELECT * FROM producto;
    
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

-- #18 -- Entrada_Producto
INSERT INTO Entrada_Producto(ID_Entrada_Producto_PK,Fecha_Entrada_Producto,Hora_Entrada_Producto,ID_Producto_FK)
	VALUES  (1,'2023-08-09','09:20:10','EMRC001'),
			(2,'2023-08-09','09:23:00','ENPk001'),
			(3,'2023-08-09','09:25:50','EMCT001'),
			(4,'2023-08-10','09:30:35','ENFr002'),
			(5,'2023-08-10','09:40:27','ENNL001');
    
-- #19 -- Tipo_Informe_Empleado;
INSERT INTO Tipo_Informe_Empleado(ID_Entrada_Producto_FK,ID_Salida_producto_Inventario_FK)
	VALUES  (1,1),
			(3,2);

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
	VALUES  (1,'EMCT001'),
			(2,'EMRC001'),
			(3,'ENFr002'),
			(4,'ENNL001');
    
SELECT * FROM registro_proveedor;
SELECT * FROM producto;

