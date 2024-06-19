/* 
**** Consultas -------> SIGFVI_V3
*/

USE SIGFVI_V3;

select * from Cuenta_Deudor;
update Cuenta_Deudor set ID_Estado_FK = 1 where ID_Deudor_PK = '222';
update Cuenta_Deudor set ID_Estado_FK = 1 where ID_Deudor_PK = '333';
update Cuenta_Deudor set ID_Estado_FK = 1 where ID_Deudor_PK = '444';
UPDATE Cuenta_Deudor SET ID_Estado_FK = 1;


update Cuenta_Deudor set ID_Estado_FK = ? where ID_Deudor_PK = ?;

select cd.ID_Deudor_PK as id,cd.Primer_Nombre,cd.Segundo_Nombre,cd.Primer_Apellido,cd.Segundo_Apellido,
        cd.Direccion_Deudor,cd.Telefono_Deudor,e.Nombre_Estado as estado,cd.ID_Estado_FK,scd.Total_Saldo_Deuda as saldo
        from Cuenta_Deudor cd
        inner join Saldo_Cuenta_Deudor scd
        on cd.ID_Deudor_PK = scd.ID_Deudor_FK
        inner join Estado e
        on cd.ID_Estado_FK=e.ID_Estado_PK
        ORDER BY cd.ID_Deudor_PK ASC;
        
select cd.ID_Deudor_PK as id,cd.Primer_Nombre,cd.Segundo_Nombre,cd.Primer_Apellido,cd.Segundo_Apellido,
        cd.Direccion_Deudor,cd.Telefono_Deudor,e.Nombre_Estado as estado,cd.ID_Estado_FK,scd.Total_Saldo_Deuda as saldo
        from Cuenta_Deudor cd
        inner join Saldo_Cuenta_Deudor scd
        on cd.ID_Deudor_PK = scd.ID_Deudor_FK
        inner join Estado e
        on cd.ID_Estado_FK=e.ID_Estado_PK
        WHERE cd.ID_Deudor_PK = 111
        ORDER BY cd.ID_Deudor_PK ASC;
        
SELECT 
    cd.ID_Deudor_PK as id,
    cd.Primer_Nombre,
    cd.Segundo_Nombre,
    cd.Primer_Apellido,
    cd.Segundo_Apellido,
    cd.Direccion_Deudor,
    cd.Telefono_Deudor,
    e.Nombre_Estado as estado,
    cd.ID_Estado_FK,
    scd.Total_Saldo_Deuda as saldo
FROM 
    Cuenta_Deudor cd
INNER JOIN 
    Saldo_Cuenta_Deudor scd ON cd.ID_Deudor_PK = scd.ID_Deudor_FK
INNER JOIN 
    Estado e ON cd.ID_Estado_FK = e.ID_Estado_PK
WHERE 
    cd.Primer_Nombre LIKE '%nombre_a_buscar%' OR
    cd.Segundo_Nombre LIKE '%nombre_a_buscar%' OR
    cd.Primer_Apellido LIKE '%apellido_a_buscar%' OR
    cd.Segundo_Apellido LIKE '%apellido_a_buscar%' OR
    cd.ID_Deudor_PK = id_a_buscar
ORDER BY 
    cd.ID_Deudor_PK ASC;

        
        
        