/*
    * Controlador de las Consultas usadas en el módulo de ventas.
*/
const db = require('../../models/sigfviDBModelo').promise();


// Consultar todos los deudores en la venta.
const getAllDeudoresVentas = async (req, res) => {
    try {
        console.log("Obteniendo datos de todos los deudores en la venta...");
        const query = `
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
            Estado ON CD.ID_Estado_FK = ID_Estado_PK; `;

        const [result] = await db.query(query);
        console.log("\nEnviando respuesta...");
        res.json({ deudores_venta: result });
    } catch (error) {
        console.error("\nNo se pudo hacer la consulta", error);
        res.status(500).json({ error: "\nNo se pudo hacer la consulta" });
    }
};

// Consultar por ID de los deudores en la venta.
const getIDDeudoresVentas = (req, res) => {
    const { ID_Deudor_PK } = req.params; // Usamos req.params en lugar de req.body
    console.log("\n---> Buscando deudores por ID...");
    db.query(
        `
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
            CD.ID_Deudor_PK = ?;
        `,
        [ID_Deudor_PK],
        (err, result) => {
            if (err) {
                console.error("Error al buscar deudores por nombre", err);
                res.status(500).json({ error: "No se pudieron buscar los deudores por nombre" });
            } else {
                console.log("---> Enviando respuesta de deudores encontrados por nombre...\n");
                res.json({ deudores: result });
            }
        }
    );
};
// Consultar por NOMBRE de los deudores en la venta.
const getNombreDeudoresVentas = (req, res) => {
    const { nombre } = req.params; // Usamos req.params en lugar de req.body
    console.log("\n---> Buscando deudores por ID...");
    db.query(
        `
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
           CD.ID_Deudor_PK LIKE ?
        `,
        [`%${nombre}%`],
        (err, result) => {
            if (err) {
                console.error("Error al buscar deudores por nombre", err);
                res.status(500).json({ error: "No se pudieron buscar los deudores por nombre" });
            } else {
                console.log("---> Enviando respuesta de deudores encontrados por nombre...\n");
                res.json({ deudores: result });
            }
        }
    );
};

module.exports = {
    getAllDeudoresVentas,
    getIDDeudoresVentas,
    getNombreDeudoresVentas,
}