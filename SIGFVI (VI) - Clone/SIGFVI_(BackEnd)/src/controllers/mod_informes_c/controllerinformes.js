const db = require("../../models/sigfviDBModelo");
const consultaDeudor = (req, res) => {
    // Obtener la fecha de registro desde la solicitud (si se proporciona)
    const fechaRegistro = req.query.fechaRegistro;

    // Construir la consulta SQL base
    let query = `SELECT 
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
        Estado e ON cd.ID_Estado_FK = e.ID_Estado_PK`;

    // Si se proporciona una fecha de registro, agregar la cláusula WHERE para filtrar por esa fecha
    if (fechaRegistro) {
        // Se asume que la fecha de registro está en formato YYYY-MM-DD
        query += ` WHERE DATE(scd.Fecha_Cancelacion_Pedido) = '${fechaRegistro}'`;
    } // else {
    //     // Si no se proporciona una fecha de registro, retornar un error
    //     return res.status(400).json({ error: 'Se debe proporcionar una fecha de registro.' });
    // }

    // Finalizar la consulta SQL con la cláusula ORDER BY
    query += ` ORDER BY cd.ID_Deudor_PK ASC`;

    // Ejecutar la consulta en la base de datos
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
    const fechaFactura = req.query.fechaFactura;

    let query = `
        SELECT 
            v.ID_Venta_PK, 
            f.Fecha_Factura,
            m.Nombre_Metodo AS Nombre_Metodo_Pago,
            v.IVA, 
            v.Total_Pedido
        FROM 
            Venta v
        INNER JOIN Facturacion f ON v.ID_Venta_PK = f.ID_Venta_Realizada_FK
        INNER JOIN Metodo_de_pago m ON v.ID_Metodo_Pago_FK = m.ID_Metodo_Pago_PK`;

    if (fechaFactura) {
        query += ` WHERE DATE(f.Fecha_Factura) = '${fechaFactura}'`;
    }

    db.query(query, (err, result) => {
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
