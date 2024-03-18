/* 
**** INSERTS -------> SIGFVI_V3
*/
USE SIGFVI_V3;
-- ----------

 -- #1 -- Estado
INSERT INTO Estado(ID_Estado_PK, Nombre_Estado)
	VALUES  (0,'Inactivo'),
			(1,'Activo'),
			(2,'Cancelado'),
			(3,'Asignado A Deudor');
            
 -- #2 -- Tipo_Producto
INSERT INTO Tipo_Producto(ID_Tipo_Producto_PK, Nombre_Tipo_Producto)
    VALUES  (1,'Botella'),
            (2,'Lata'),
            (3,'Paquete'),
            (4,'Caja');
 
 
 -- #3 -- Producto
INSERT INTO Producto (ID_Producto_PK, ID_Tipo_Producto_FK, Nombre_Producto, Descripcion, Precio_Proveedor, Precio_Venta, Foto_Producto, ID_Estado_FK)
 VALUES ('AGU-001', 1, 'Agua Mineral', '600 ml', 1000.00, 1500.00, 'url_agua_mineral.jpg', 1),
        ('ARR-001', 2, 'Arroz', '5 kilos', 5000.00, 6000.00, 'url_arroz.jpg', 0),
        ('POK-001', 3, 'Poker', '330 ml', 2500.00, 3000.00, 'url_cerveza.jpg', 0),
        ('JUG-001', 1, 'Jugo de Naranja', '1 Litro', 3000.00, 4000.00, 'url_jugo_naranja.jpg', 1),
        ('PAQ-001', 2, 'Paquete de Galletas', '30 gramos', 2000.00, 2500.00, 'url_galletas.jpg', 1),
        ('REF-001', 3, 'Refresco en Lata', '330 ml', 1500.00, 2000.00, 'url_refresco_lata.jpg', 1),
        ('ACE-001', 1, 'Aceite de Cocina', '1 Litro', 8000.00, 10000.00, 'url_aceite.jpg', 1),
        ('PAQ-003', 2, 'Paquete de Pasta', '500 gramos', 4000.00, 5000.00, 'url_pasta.jpg', 1),
        ('CER-001', 3, 'Cerveza Light', '330 ml', 3000.00, 3500.00, 'url_cerveza_light.jpg', 1),
        ('BOT-001', 1, 'Botella de Vino', '1 litro', 25000.00, 30000.00, 'url_vino.jpg', 1);

-- SELECT * FROM Producto;


 -- #4 -- Tipo_Cargo
INSERT INTO Tipo_Cargo(ID_Tipo_Cargo_PK, Nombre_Tipo_cargo,Estado_ID_Estado_PK)
	VALUES  (1,'Super-Administrador',1),
			(2,'Gerente',1),
			(3,'Empleado',1);


 -- #5 -- Tipo_identificacion
 INSERT INTO Tipo_identificacion(ID_Tipo_Identificacion_PK,Nombre_Identificacion)
	VALUES  (1,'CC'),
			(2,'CE');


 -- #6 -- Usuario
INSERT INTO Usuario(ID_Numero_Identificacion_PK,ID_Tipo_Identificacion_FKPK,Nombre_Usuario,Segundo_Nombre_Usuario,Apellido_Usuario,Segundo_Apellido_Usuario,Numero_Contacto_Usuario,Email_Usuario,Password_Usuario,ID_Tipo_Cargo_FK,ID_Estado_FK)
    VALUES ('SW10053-1',1,'SuperUser','-','_1','.','3153851945','empresa1@gmail.com','$2b$08$CVWjEaDJaTBEm8Vo4ARc7eU9m24sJ4MDon6s1OgqlBaNUjKd/TPPq',1,1); /*Admon123*/
INSERT INTO Usuario 
    VALUES     ('35684579',1,'Luz','Estela','Rodriguez','Linares','3124352560','lstlinares@hotmail.com','$2b$08$XJd1gI0V1vWXNXHjX.3XTOxt82mIQ8Te3qx8U.TiM9FujleeXGN0i',2,1), /*Jesus01*/
            ('1006865674',1,'Fransico','Arnulfo','Aristizabal','Rodriguez','3194584239', 'Fra.Aris@gmail.com','$2b$08$hEwWwvSGwMQwfsOBK/60VOf5mdNTguAHScAWCjhh3jq6PEoDg/XVq',3,1), /*0000*/
            ('10564454999999994',2,'Jean','Carlo','Beltran','Amaya','3155758594', 'jean.carl@gmail.com','$2b$08$hEwWwvSGwMQwfsOBK/60VOf5mdNTguAHScAWCjhh3jq6PEoDg/XVq',3,0); /*0000*/
 
 INSERT INTO Usuario values('444444',1,'Maycol','teush','Cardona','Ashe','3134352560','teush@hotmail.com','$2b$08$hEwWwvSGwMQwfsOBK/60VOf5mdNTguAHScAWCjhh3jq6PEoDg/XVq',2,1); /*0000*/
 
 select ID_Estado_FK from Usuario where ID_Tipo_Cargo_FK = 2;
 SELECT ID_Numero_Identificacion_PK as id,Password_Usuario as contrasena,ID_Tipo_Cargo_FK as rol,Nombre_Usuario,Apellido_Usuario,ID_Estado_FK as estado
 FROM Usuario WHERE ID_Numero_Identificacion_PK = 444444;
 
 -- #7 -- Registro_Proveedor
INSERT INTO Registro_Proveedor(Nombre_Empresa,Dia_Visita,Telefono_Contacto,Estado_ID_Estado_PK)
	VALUES  ('Babaria','Lunes - Miercoles','3144441157',1),
			('Fritolay','Martes - Viernes','3228524525',1),
			('Alpina','Jueves - Sabado','311444444',1),
			('Margarita','Lunes - Miercoles','3114159755',0);

 
-- #8 -- Cuenta_Deudor
 INSERT INTO Cuenta_Deudor(ID_Deudor_PK, Primer_Nombre,Segundo_Nombre,Primer_Apellido,Segundo_Apellido,Direccion_Deudor,Telefono_Deudor,ID_Estado_FK)
    VALUES  ('111','Omar','Ferney','Badillo','de la Cruz', 'Tv 7 #25-3L','3181475823',0),
            ('222','Camila','Valentina','Gómez','Pérez','Carrera 56 #89-34','23456789',0),
            ('333','Juan','Carlos','Rodríguez','Sánchez','Calle 67 #12-45',' 45678901',0),
            ('444','Oscar','Eduardo','Ramírez','Torres','Carrera 12 #23-45','56789012',1),
            ('555','Valeria','Isabel','Castro','Ruiz','Calle 78 #56-12','67890123',0),
            ('666','María','José','González','Vargas','Carrera 45 #67-89','78901234',1),
            ('777','Andrés','Felipe','López','Pérez','Avenida 23 #34-56','89012345',1);


-- #9 -- Saldo_Cuenta_Deudor
INSERT INTO Saldo_Cuenta_Deudor(ID_Deudor_FK,Fecha_Cancelacion_Pedido,Total_Saldo_Deuda)
    VALUES  ('111','2023-03-24',50000),
            ('222','2023-03-24',50000),
            ('333','2023-08-01',20000),
            ('444','2023-03-02',5000),
            ('555','2023-09-13',40000),
            ('666','2023-05-24',300000),
            ('777','2023-02-17',28500); 
            
-- #10 -- Inventario.
INSERT INTO Inventario (Stock, ID_Producto_FK)
    VALUES ( 90, 'AGU-001'),
            ( 180, 'POK-001'),
            ( 70, 'JUG-001'),
            ( 80, 'ARR-001'),
            ( 120, 'PAQ-001'),
			(3, 'REF-001'),
            ( 1, 'BOT-001');
            
            
-- #11 -- Salida_producto_Inventario
INSERT INTO Salida_producto_Inventario(Descripcion_Salida,Cantidad_Salida,Fecha_Salida,Hora_Salida,ID_Inventario_FK)
    VALUES  ('Producto Vencido',13,'2023-03-16','10:18:20',2),
			('Producto Vencido',13,'2023-03-14','10:18:20',4);


-- #12 -- Entrada_Producto
INSERT INTO Entrada_Producto(Cantidad_Entrada,Fecha_Entrada_Producto,Hora_Entrada_Producto,ID_Registro_Proveedor_Fk,Producto_Inventario)
    VALUES  (20, '2023-08-09', '09:20:10', 2, 'BOT-001'),
			(40, '2024-03-15', '10:18:53', 1, 'POK-001'),
            (10, '2024-03-16', '08:42:35', 1, 'ARR-001'),
            (20, '2023-08-09', '09:20:10', 2, 'BOT-001');
		
    
-- #13 -- Metodo_de_pago
INSERT INTO Metodo_de_pago(Nombre_Metodo, Tipo_Metodo_Pago, Referencia, ID_Estado_FK)
	VALUES  ('Efectivo','Fisico','',1),
			('Nequi','Electronico','123-456-789-000',1),
			('Daviplata','Electronico','123-000-456-789',1),
			('Tarjeta','Electronico','123-456-000-789',0);   
-- SELECT * FROM Metodo_de_pago;  
            
-- # 14 -- Venta
INSERT INTO Venta (ID_Metodo_Pago_FK, IVA, SubTotal_Venta, Total_Pedido, ID_Saldo_PK, ID_Estado_FK)
VALUES (1, 19, 10000, 11900, 1, 1),
       (2, 19, 5000, 5950, NULL, 1),
       (3, 19, 7500, 8925, 2, 1),
       (1, 19, 12000, 14280, 3, 1),
       (2, 19, 3000, 3570, NULL, 1),
       (3, 19, 4500, 5355, 4, 1),
       (1, 19, 8000, 9520, 5, 1);

SELECT * FROM Venta;

-- # 15 -- Detalle_Venta
INSERT INTO Detalle_Venta (ID_Venta_FK, Cantidad_Producto, SubTotal_detalle, ID_Inventario_FK)
VALUES (1, 2, 2000, 1),
       (1, 3, 3000, 2),
       (2, 1, 5000, 3),
       (3, 2, 6000, 4),
       (4, 4, 8000, 5),
       (5, 1, 2000, 6),
       (6, 3, 3000, 7),
       (7, 2, 4000, 7);
       
SELECT * FROM Detalle_Venta;

-- # 16 -- Facturacion
INSERT INTO Facturacion (Fecha_Factura, Hora_Factura, ID_Venta_Realizada_FK)
VALUES ('2024-03-15', '12:30:00', 1),
       ('2024-03-15', '14:00:00', 2),
       ('2024-03-16', '10:45:00', 3),
       ('2024-03-16', '11:30:00', 4),
       ('2024-03-17', '09:15:00', 5),
       ('2024-03-17', '12:00:00', 6),
       ('2024-03-18', '15:30:00', 7);


-- # 17 -- Detalle_Facturacion
INSERT INTO Detalle_Facturacion (Cantidad_Producto, SubTotal, ID_Factura_FK, ID_Detalle_Venta_FK)
VALUES (2, 2000, 1, 1),
       (3, 3000, 1, 2),
       (1, 5000, 2, 3),
       (2, 6000, 3, 4),
       (4, 8000, 4, 5),
       (1, 2000, 5, 6),
       (3, 3000, 6, 7),
       (2, 4000, 7, 8);
       
	