const db = require("../../models/sigfviDBModelo");

const consultaDeudor = (req, res) => {
    const query = `SELECT 
        cd.ID_Deudor_PK AS id,
        cd.Primer_Nombre,
        cd.Segundo_Nombre,
        cd.Primer_Apellido,
        cd.Segundo_Apellido,
        e.Nombre_Estado AS estado,
        cd.ID_Estado_FK,
        scd.Total_Saldo_Deuda AS saldo,
        scd.Fecha_Cancelacion_Pedido
    FROM 
        Cuenta_Deudor cd
    INNER JOIN 
        Saldo_Cuenta_Deudor scd ON cd.ID_Deudor_PK = scd.ID_Deudor_FK
    INNER JOIN 
        Estado e ON cd.ID_Estado_FK = e.ID_Estado_PK
    ORDER BY 
        cd.ID_Deudor_PK ASC;
    `;

    db.query(query, (error, result) => {
        if (error) {
            console.error(`No se pudo hacer la consulta: ${error}`);
            res.status(500).json({ error: 'Error al obtener datos de deudores.' });
        } else {
            res.json(result);
        }
    });
};

const obtenerUsuarios = (req, res) => {
    const query = `
        SELECT 
            u.ID_Numero_Identificacion_PK as id, 
            ti.Nombre_Identificacion as tipoId, 
            u.Nombre_Usuario, 
            u.Segundo_Nombre_Usuario, 
            u.Apellido_Usuario, 
            u.Segundo_Apellido_Usuario, 
            u.Numero_Contacto_Usuario as telefono, 
            u.Email_Usuario, 
            u.Password_Usuario as contrasena, 
            tc.Nombre_Tipo_cargo as cargo, 
            u.ID_Estado_FK, 
            e.Nombre_Estado as estado 
        FROM 
            usuario u 
        INNER JOIN 
            Tipo_Cargo tc ON tc.ID_Tipo_Cargo_PK = u.ID_Tipo_Cargo_FK 
        INNER JOIN 
            Tipo_identificacion ti ON u.ID_Tipo_Identificacion_FKPK = ti.ID_Tipo_Identificacion_PK 
        INNER JOIN 
            Estado e ON u.ID_Estado_FK = e.ID_Estado_PK 
        WHERE  
            u.ID_Tipo_Cargo_FK = 3;`;

    db.query(query, (error, result) => {
        if (error) {
            console.error(`Error: ${error}`);
            res.status(500).json({ error: 'Error al obtener usuarios.' });
        } else {
            res.json(result);
        }
    });
};

const consultaDatos = (req, res) => {
    const query = `
        SELECT 
            P.ID_Producto_PK, 
            P.Nombre_Producto, 
            TP.Nombre_Tipo_Producto, 
            P.Descripcion, 
            P.Precio_Proveedor, 
            P.Precio_Venta, 
            SUM(I.Stock) AS Stock 
        FROM 
            Producto AS P 
        JOIN 
            Tipo_Producto AS TP ON P.ID_Tipo_Producto_FK = TP.ID_Tipo_Producto_PK 
        JOIN 
            Inventario AS I ON P.ID_Producto_PK = I.ID_Producto_FK 
        GROUP BY 
            P.ID_Producto_PK, P.Nombre_Producto, TP.Nombre_Tipo_Producto, P.Descripcion;`;

    db.query(query, (error, result) => {
        if (error) {
            console.error("No se pudo hacer la consulta", error);
            res.status(500).json({ error: "No se pudo hacer la consulta" });
        } else {
            res.json({ datos: result });
        }
    });
};

const ObtenerProductosVenta = (req, res) => {
    db.query(`
    SELECT 
    v.ID_Venta_PK, 
    m.Nombre_Metodo AS Nombre_Metodo_Pago,
    v.IVA, 
    v.Total_Pedido, 
    v.ID_Estado_FK, 
    v.ID_Saldo_PK 
FROM 
    Venta v
INNER JOIN Metodo_de_pago m ON v.ID_Metodo_Pago_FK = m.ID_Metodo_Pago_PK;`, (err, result) => {
        if (err) {
            console.error("Error al obtener datos de productos", err);
            res.status(500).json({ error: "No se pudieron obtener los datos de productos" });
        } else {
            res.json({ ventas: result });
        }
    });
};


module.exports = {
    consultaDeudor,
    obtenerUsuarios,
    consultaDatos,
    ObtenerProductosVenta
};
