create database producto;
use producto;

CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE colecciones (
    id_coleccion SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE pieza (
    id_pieza SERIAL PRIMARY KEY,
    categoria INT REFERENCES categorias(id_categoria),
    coleccion INT REFERENCES colecciones(id_coleccion),
    descripcion VARCHAR(255) NOT NULL,
    valorCompra DECIMAL(10, 2),
    fechaCompra DATE,
    foto VARCHAR(255) 
);

-- ---: INSERTS :-->

	-- 1 : categorias : ---->
INSERT INTO categorias (descripcion) 
	VALUES	('Comun'),
			('Demandado'),
			('Importado');
        
    
    -- 2 : colecciones : ---->
INSERT INTO colecciones (descripcion) 
	VALUES	('Vehiculos JDM'),
			('Vehiculos Tradicionales');
			
        

            
    -- 3 : colecciones : ---->
INSERT INTO pieza (categoria, coleccion, descripcion, valorCompra, fechaCompra, foto) 
	VALUES	(2, 1, 'Honda Civic Type R', 25900.99, '2023-05-15', 'civic.jpg'),
			(1, 2, 'Renault Clio', 5900.99, '2023-06-20', 'clio.jpg'),
			(3, 1, 'Mitsubishi Lancer', 39000.99, '2023-04-10', 'lancer.jpg'),
			(2, 2, 'Toyota Chaser', 29000.99, '2023-03-02', 'chaser.jpg'),
			(3, 1, 'Nissan Silvia 15', 39000.99, '2023-07-18', 's15.jpg');
            
            
	-- CONSULTAS DE TABLAS :---->
		SELECT * FROM categorias;
		SELECT * FROM colecciones;
		SELECT * FROM pieza;
        
drop database producto;
delete from pieza where id_pieza = 1;