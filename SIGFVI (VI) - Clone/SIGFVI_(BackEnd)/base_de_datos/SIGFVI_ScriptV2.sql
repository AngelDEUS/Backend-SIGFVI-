-- Active: 1695004089364@@127.0.0.1@3306@sigfvi_v2
/* 
**** 1: Se borraron campos de la tabla inventario
*/

CREATE DATABASE SIGFVI_V2;
-- DROP DATABASE SIGFVI_V2;
USE SIGFVI_V2;

-- #1 Estado -------------->

CREATE TABLE
    Estado (
        ID_Estado_PK TINYINT NOT NULL COMMENT 'Campo que contiene la clave unica del registro del estado.',
        Nombre_Estado VARCHAR(25) NOT NULL COMMENT 'Campo que contien el Nombre del estado.',
        PRIMARY KEY (ID_Estado_PK)
    );

-- #2 Tipo_Producto -------------->

CREATE TABLE
    Tipo_Producto (
        ID_Tipo_Producto_PK TINYINT NOT NULL COMMENT 'Campo con la llave primaria del tipo de producto.',
        Nombre_Tipo_Producto VARCHAR(45) NOT NULL COMMENT 'Campo con el nombre del tipo de producto.',
        PRIMARY KEY (ID_Tipo_Producto_PK)
    );

-- #3 Producto -------------->

CREATE TABLE
    Producto (
        ID_Producto_PK VARCHAR(15) NOT NULL COMMENT 'Campo como llave primaria de tipo varchar del producto.',
        ID_Tipo_Producto_FK TINYINT NOT NULL,
        Nombre_Producto VARCHAR(25) NOT NULL COMMENT 'Campo con el nombre del producto.',
        Descripcion varchar(20) NOT NULL COMMENT 'Campo con una descripcion basica del producto.',
        Precio_Proveedor DECIMAL(11, 2) UNSIGNED NOT NULL COMMENT 'Campo con el precio inicial de compra a el proveedor.',
        Precio_Venta DECIMAL(11, 2) UNSIGNED NOT NULL COMMENT 'Campo con el precio de venta al cliente.',
        Foto_Producto VARCHAR(255) NOT NULL COMMENT 'Campo en donde se almacena la url o direccion de alojamiento de la imagen.',
        ID_Estado_FK TINYINT NOT NULL COMMENT 'Campo de la llave foranea que viene desde la tabla Estado(ID_Estado_PK).',
        PRIMARY KEY (ID_Producto_PK),
        FOREIGN KEY (ID_Estado_FK) REFERENCES Estado (ID_Estado_PK),
        FOREIGN KEY (ID_Tipo_Producto_FK) REFERENCES Tipo_Producto (ID_Tipo_Producto_PK)
    );

-- #4 Tipo_Cargo -------------->

CREATE TABLE
    Tipo_Cargo (
        ID_Tipo_Cargo_PK TINYINT NOT NULL COMMENT 'Campo con la llave primaria del ID del tipo de cargo autoincrementable.',
        Nombre_Tipo_cargo VARCHAR(45) NOT NULL COMMENT 'Campo con el nombre del tipo del cargo.',
        Estado_ID_Estado_PK TINYINT NOT NULL COMMENT 'Campo con el estado actual del tipo de cargo',
        PRIMARY KEY (ID_Tipo_Cargo_PK),
        FOREIGN KEY (Estado_ID_Estado_PK) REFERENCES Estado (ID_Estado_PK)
    );

-- #5 Tipo_identificacion -------------->

CREATE TABLE
    Tipo_identificacion (
        ID_Tipo_Identificacion_PK TINYINT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del ID del tipo de identificacion autoincrementable.',
        Nombre_Identificacion VARCHAR(45) NOT NULL COMMENT 'Campo del nombre del tipo de identificacion.',
        PRIMARY KEY (ID_Tipo_Identificacion_PK)
    );

-- #6 Usuario -------------->

CREATE TABLE
    Usuario (
        ID_Numero_Identificacion_PK VARCHAR(25) NOT NULL COMMENT 'Campo con la llave primaria del numero de identificacion del Usuario.',
        ID_Tipo_Identificacion_FKPK TINYINT NOT NULL COMMENT 'Campo con la llave primaria auxiliar compuesta con el tipo de identificacion',
        Nombre_Usuario VARCHAR(45) NOT NULL COMMENT 'Campo con el primer nombre del usuario.',
        Segundo_Nombre_Usuario VARCHAR(45) NULL DEFAULT NULL COMMENT 'Campo con el segundo nombre del usuario.',
        Apellido_Usuario VARCHAR(45) NOT NULL COMMENT 'Campo con el primer apellido de usuario.',
        Segundo_Apellido_Usuario VARCHAR(45) NULL DEFAULT NULL COMMENT 'Campo con el segundo apellido de usuario.',
        Numero_Contacto_Usuario VARCHAR(10) NOT NULL COMMENT 'Campo con el numero del contacto de un usuario de tipo cadena de texto.',
        Email_Usuario VARCHAR(45) NOT NULL COMMENT 'Campo con el correo electorinico del usuario.',
        Password_Usuario VARCHAR(45) NOT NULL COMMENT 'Campo con la password de ingreso a el sistema del usuario.',
        ID_Tipo_Cargo_FK TINYINT NOT NULL COMMENT 'Campo con el tipo del cargo asignado a el Usuario como llave foranea',
        ID_Estado_FK TINYINT NOT NULL COMMENT 'Campo para el estado actual del Usuario',
        PRIMARY KEY (
            ID_Numero_Identificacion_PK,
            ID_Tipo_Identificacion_FKPK
        ),
        FOREIGN KEY (ID_Estado_FK) REFERENCES Estado (ID_Estado_PK),
        FOREIGN KEY (ID_Tipo_Cargo_FK) REFERENCES Tipo_Cargo (ID_Tipo_Cargo_PK),
        FOREIGN KEY (ID_Tipo_Identificacion_FKPK) REFERENCES Tipo_identificacion (ID_Tipo_Identificacion_PK)
    );

-- #7 Usuario -------------->

CREATE TABLE
    Registro_Proveedor (
        ID_Registro_Proveedor_PK INT AUTO_INCREMENT COMMENT 'Campo con el ID como identificador unico de cada Proveedor auto incrementable de tipo entero.',
        Nombre_Empresa VARCHAR(45) NOT NULL COMMENT 'Campo con el nombre del Proveedor.',
        Dia_Visita VARCHAR(60) NOT NULL COMMENT 'Campo de tipo varchar para almacenar el dia o los dias de la visita del proveedor.',
        Telefono_Contacto VARCHAR(12) NOT NULL COMMENT 'Campo de tipo varchar con el numero telefonico del proveedor.',
        Estado_ID_Estado_PK TINYINT NOT NULL COMMENT 'Campo para el estado actual del Registro de Proveedor',
        PRIMARY KEY (ID_Registro_Proveedor_PK),
        FOREIGN KEY (Estado_ID_Estado_PK) REFERENCES Estado (ID_Estado_PK)
    );

-- ALTER TABLE Registro_Proveedor MODIFY COLUMN ID_Registro_Proveedor_PK INT AUTO_INCREMENT;
-- #8 Cuenta_Deudor -------------->

CREATE TABLE
    Cuenta_Deudor (
        ID_Deudor_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del deudor auto incrementable.',
        Primer_Nombre VARCHAR(45) NOT NULL COMMENT 'Campo con el primer nombre de la cuenta del deudor.',
        Segundo_Nombre VARCHAR(45) NULL COMMENT 'Campo con el segundo nombre del deudor y puede estar vacio.',
        Primer_Apellido VARCHAR(45) NOT NULL COMMENT 'Campo con el primer apellido del deudor.',
        Segundo_Apellido VARCHAR(45) NULL COMMENT 'Campo con el segundo apellido del deudor y puede esta vacio.',
        Direccion_Deudor VARCHAR(45) NOT NULL COMMENT 'Campo con la direccion del deudor.',
        Telefono_Deudor VARCHAR(10) NOT NULL COMMENT 'Campo con el telefono de contacto del deudor.',
        ID_Estado_FK TINYINT NOT NULL COMMENT 'Campo para el estado actual de la Cuenta del Deudor',
        PRIMARY KEY (ID_Deudor_PK),
        FOREIGN KEY (ID_Estado_FK) REFERENCES Estado (ID_Estado_PK)
    );

-- #9 Metodo_de_pago -------------->

CREATE TABLE
    Metodo_de_pago (
        ID_Metodo_Pago_PK SMALLINT AUTO_INCREMENT NOT NULL COMMENT 'Campo con la llave primaria del metodo de pago',
        Nombre_Metodo VARCHAR(45) NOT NULL COMMENT 'Campo con el nombre del metodo de pago.',
        Tipo_Metodo_Pago VARCHAR(45) NOT NULL COMMENT 'Campo con el nombre del tipo de metodo de pago.',
        Referencia VARCHAR(45) COMMENT 'Campo con el nombre de la referencia del metodo de pago, puede estar vacio',
        ID_Estado_FK TINYINT NOT NULL COMMENT 'Campo con la llave foranea de la tabla Estado para los metodos de pagos.',
        PRIMARY KEY (ID_Metodo_Pago_PK),
        FOREIGN KEY (Id_Estado_FK) REFERENCES Estado(ID_Estado_PK)
    );

-- #10 Saldo_Cuenta_Deudor -------------->

CREATE TABLE
    Saldo_Cuenta_Deudor (
        ID_Saldo_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del ID del saldo de la cuenta del deudor auto incrementable.',
        ID_Deudor_FK INT NOT NULL COMMENT 'Campo con la llave foranea del ID de la cuenta del deudor asociada',
        Fecha_Cancelacion_Pedido DATE NOT NULL COMMENT 'Campo con la fecha oportuna para realizar el pago de la deuda, conciliada entre el deudor y el gerente.',
        Total_Saldo_Deuda INT NOT NULL COMMENT 'Campo en donde se suman todos los totales de los pedidos acumulados en la cuenta del deudor.',
        PRIMARY KEY (ID_Saldo_PK),
        FOREIGN KEY (ID_Deudor_FK) REFERENCES Cuenta_Deudor (ID_Deudor_PK)
    );

-- #11 Pedido -------------->

CREATE TABLE
    Pedido (
        ID_Pedido_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del pedido.',
        ID_Metodo_Pago_FK SMALLINT NOT NULL COMMENT 'Campo con el ID de la llave foranea del metodo de pago.',
        Fecha_Pedido DATE NOT NULL COMMENT 'Campo con la fecha en la que crea el pedido.',
        Hora_Pedido TIME NOT NULL COMMENT 'Campo con la hora en la que se crea el pedido.',
        IVA TINYINT(30) NOT NULL COMMENT 'Campo en donde se calcula el total del IVA segun el total del pedido.',
        Total_Pedido INT NOT NULL COMMENT 'Campo con el calculo del total de los subtotales del detalle del pedido.',
        ID_Estado_FK TINYINT NOT NULL COMMENT 'Campo con el estado actual del Pedido.',
        ID_Saldo_PK INT NULL COMMENT 'Campo con el ID del saldo de la cuenta de un deudor asignado.',
        PRIMARY KEY (ID_Pedido_PK),
        FOREIGN KEY (ID_Estado_FK) REFERENCES Estado (ID_Estado_PK),
        FOREIGN KEY (ID_Metodo_Pago_FK) REFERENCES Metodo_de_pago (ID_Metodo_Pago_PK),
        FOREIGN KEY (ID_Saldo_PK) REFERENCES Saldo_Cuenta_Deudor (ID_Saldo_PK)
    );

SELECT * FROM Pedido;

-- #12 Venta_Realizada -------------->

CREATE TABLE
    Venta_Realizada (
        ID_Venta_Realizada_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria de la venta realizada despues del pedido.',
        ID_Saldo_Cuenta_Deudor_FK INT NOT NULL COMMENT 'Campo con la llave foranea del ID del saldo de la cuenta del deudor referenciado.',
        ID_Pedido_FK INT NOT NULL COMMENT 'Campo con la llave foranea del pepido referenciado.',
        PRIMARY KEY (ID_Venta_Realizada_PK),
        FOREIGN KEY (ID_Saldo_Cuenta_Deudor_FK) REFERENCES Saldo_Cuenta_Deudor (ID_Saldo_PK),
        FOREIGN KEY (ID_Pedido_FK) REFERENCES Pedido (ID_Pedido_PK)
    );

-- #13 Facturacion -------------->

-- USE SIGFVI_V2;

CREATE TABLE
    Facturacion (
        ID_Factura_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria de la factura.',
        Fecha_Factura DATE NOT NULL COMMENT 'Campo en el que se ingresa la fecha en la que se genera la factura.',
        Hora_Factura TIME NOT NULL COMMENT 'Campo en el que se ingresa la hora en la que se genera la factura.',
        ID_Venta_Realizada_FK INT NOT NULL COMMENT 'Campo con la llave foranea del ID de la venta realizada referenciada a facturacion',
        PRIMARY KEY (ID_Factura_PK),
        FOREIGN KEY (ID_Venta_Realizada_FK) REFERENCES Venta_Realizada(ID_Venta_Realizada_PK)
    );

SELECT * FROM Facturacion;

-- #14 Inventario -------------->

-- DROP TABLE Inventario;

CREATE TABLE
    Inventario (
        ID_Inventario_PK SMALLINT(10) AUTO_INCREMENT NOT NULL COMMENT 'Campo que contiene la clave única del registro del inventario autoincrementable.',
        Stock INT UNSIGNED NOT NULL COMMENT 'Campo que calcula y agrupa la cantidad del stock de productos registrados.',
        ID_Producto_FK VARCHAR(15) NOT NULL COMMENT 'Campo con la llave foránea el ID del producto referenciado.',
        PRIMARY KEY (ID_Inventario_PK),
        FOREIGN KEY (ID_Producto_FK) REFERENCES Producto (ID_Producto_PK)
    );

-- #15 Tipo_Informe_Venta -------------->

CREATE TABLE
    Tipo_Informe_Venta (
        ID_Informe_Venta_PF INT NOT NULL COMMENT 'Campo con la llave primaria del informe de venta autoincrementable.',
        ID_Factura_FK INT NOT NULL COMMENT 'Campo con la llave foranea del ID de la factura',
        PRIMARY KEY (ID_Informe_Venta_PF),
        FOREIGN KEY (ID_Factura_FK) REFERENCES Facturacion (ID_Factura_PK)
    );

-- #16 Salida_producto_Inventario -------------->

CREATE TABLE
    Salida_producto_Inventario (
        ID_Salida_producto_Inventario_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del ID de la salida de un producto en el inventario autoincrementable.',
        Descripcion_Salida TEXT(400) NOT NULL COMMENT 'Campo con la descripcion detallada de la salida de un producto en el inventario',
        Fecha_Salida DATE NOT NULL COMMENT 'Campo con el ingreso de la fecha de la salida de un producto en el inventario.',
        Hora_Salida TIME NOT NULL COMMENT 'Campo con el ingreso de la hora de la salida de un producto en el inventario.',
        ID_Inventario_FK SMALLINT(10) NOT NULL COMMENT 'Campo con la llave foranea del Inventario',
        ID_Ident_Usu_FK VARCHAR(25) COMMENT 'Campo con la llave foranea del usuario',
        ID_Tipo_Ident_Usu_FKPK TINYINT COMMENT 'Campo con la llave compuesta con tipo de identificacion del usuario',
        PRIMARY KEY (
            ID_Salida_producto_Inventario_PK
        ),
        FOREIGN KEY (ID_Inventario_FK) REFERENCES Inventario (ID_Inventario_PK),
        FOREIGN KEY (
            ID_Ident_Usu_FK,
            ID_Tipo_Ident_Usu_FKPK
        ) REFERENCES Usuario (
            ID_Numero_Identificacion_PK,
            ID_Tipo_Identificacion_FKPK
        )
    );

-- #17 Tipo_Informe_Inventario -------------->

CREATE TABLE
    Tipo_Informe_Inventario (
        ID_Informe_Inventario_PK INT AUTO_INCREMENT NOT NULL COMMENT 'Campo con la llave primaria del tipo de informe del inventario autoincrementable.',
        ID_Salida_producto_Inventario_FK INT NOT NULL COMMENT 'Campo con la llave foranea con la ID de la salida del producto del inventario',
        ID_Inventario_FK SMALLINT(10) NOT NULL COMMENT 'Campo con la llave foranea del Inventario',
        PRIMARY KEY (ID_Informe_Inventario_PK),
        FOREIGN KEY (
            ID_Salida_producto_Inventario_FK
        ) REFERENCES Salida_producto_Inventario (
            ID_Salida_producto_Inventario_PK
        ),
        FOREIGN KEY (ID_Inventario_FK) REFERENCES Inventario (ID_Inventario_PK)
    );

-- #18 Entrada_Producto -------------->

CREATE TABLE
    Entrada_Producto (
        ID_Entrada_Producto_PK INT AUTO_INCREMENT NOT NULL COMMENT 'Campo con la llave primaria del ID de la entra del producto a el sistema',
        Fecha_Entrada_Producto DATE NOT NULL COMMENT 'Campo que almacena la fecha de entrada de un producto en el sistema.',
        Hora_Entrada_Producto TIME NOT NULL COMMENT 'Campo que almacena la hora de entrada de un producto en el sistema.',
        ID_Inventario_FK SMALLINT(10) NOT NULL COMMENT 'Campo con la llave foranea del ID del producto asociado',
        PRIMARY KEY (ID_Entrada_Producto_PK),
        FOREIGN KEY (ID_Inventario_FK) REFERENCES Inventario (ID_Inventario_PK)
    );
    -- ALTER TABLE Entrada_Producto AUTO_INCREMENT=0;
 --   DROP TABLE Tipo_Informe_Empleado;
 --   DROP TABLE Entrada_Producto;
    
    SELECT * FROM Inventario;
    DESCRIBE Inventario;
    
-- #19 Tipo_Informe_Empleado -------------->

CREATE TABLE
    Tipo_Informe_Empleado (
        ID_Tipo_Informe_Empleado_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del ID del Informe del empleado autoincrementable..',
        ID_Entrada_Producto_FK INT NOT NULL COMMENT 'Campo con el ID de la llave foranea de la entrada del producto',
        ID_Salida_producto_Inventario_FK INT NOT NULL COMMENT 'Campo con el ID de la llave foranea de la salida de producto del inventario ',
        PRIMARY KEY (ID_Tipo_Informe_Empleado_PK),
        FOREIGN KEY (ID_Entrada_Producto_FK) REFERENCES Entrada_Producto (ID_Entrada_Producto_PK),
        FOREIGN KEY (
            ID_Salida_producto_Inventario_FK
        ) REFERENCES Salida_producto_Inventario (
            ID_Salida_producto_Inventario_PK
        )
    );

-- #20 Detalle_Pedido -------------->

CREATE TABLE
    Detalle_Pedido (
        ID_Detalle_Pedido_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del detalle del pedido.',
        Cantidad_Producto SMALLINT NOT NULL COMMENT 'Campo con la cantidad de unidades de productos a que se descontaran en el inventario.',
        SubTotal INT NOT NULL COMMENT 'Campo con el sub-total del detalle del pedido segun la cantidad y el precio del producto.',
        Pedido_ID_Pedido_FK INT NOT NULL COMMENT 'Campo con el ID de la llave foranea del Pedido',
        ID_Inventario_FK SMALLINT(10) NOT NULL COMMENT 'Campo con el ID de la llave foranea del Inventario referenciado',
        PRIMARY KEY (ID_Detalle_Pedido_PK),
        FOREIGN KEY (Pedido_ID_Pedido_FK) REFERENCES Pedido (ID_Pedido_PK),
        FOREIGN KEY (ID_Inventario_FK) REFERENCES Inventario (ID_Inventario_PK)
    );

-- #21 Tipo_Informe_Cuenta_Deudor -------------->

CREATE TABLE
    Tipo_Informe_Cuenta_Deudor (
        ID_Tipo_Informe_Cuenta_Deudor_PK INT NOT NULL AUTO_INCREMENT COMMENT 'Campo con la llave primaria del tipo de informe de la cuenta del deudor.',
        ID_Saldo_Cuenta_Deudor_FK INT NOT NULL COMMENT 'Campo con el ID de la llave foranea del Saldo de la cuenta de un deudor',
        PRIMARY KEY (
            ID_Tipo_Informe_Cuenta_Deudor_PK
        ),
        FOREIGN KEY (ID_Saldo_Cuenta_Deudor_FK) REFERENCES Saldo_Cuenta_Deudor (ID_Saldo_PK)
    );

-- #22 Registro_Proveedor_has_Producto -------------->

CREATE TABLE
    Registro_Proveedor_has_Producto (
        ID_Registro_Proveedor_FKPK SMALLINT(3) NOT NULL COMMENT 'Campo con el ID del proveedor como relacion Identificable NtN',
        ID_Producto_FKPK VARCHAR(15) NOT NULL COMMENT 'Campo con el ID del Producto como relacion Identificable NtN',
        PRIMARY KEY (
            ID_Registro_Proveedor_FKPK,
            ID_Producto_FKPK
        ),
        FOREIGN KEY (ID_Registro_Proveedor_FKPK) REFERENCES Registro_Proveedor (ID_Registro_Proveedor_PK),
        FOREIGN KEY (ID_Producto_FKPK) REFERENCES Producto (ID_Producto_PK)
    );
    
    
    