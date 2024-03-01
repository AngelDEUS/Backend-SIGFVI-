/*
    * Controlador del Método de Pago.
*/

const db = require('../../models/sigfviDBModelo');


// CONSULTAR METODOS DE PAGO:
function getMetodoPagos(req, res) {
    db.query(`SELECT * FROM Metodo_de_pago`,
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener los Métodos de Pagos.');
            } else {
                res.send(result);
            }
        })
}

// CONSULTAR MEDOTOD DE PAGO POR ID:
function getMetodoPagoId(req, res) {
    const ID_Metodo_Pago_PK = req.params.id;

    db.query(`SELECT * FROM Metodo_de_pago WHERE ID_Metodo_Pago_PK=?`, [ID_Metodo_Pago_PK],
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener el Método de Pago específico.');
            } else {
                res.send(result);
            }
        })
}

// CONSULTAR MEDOTOD DE PAGO POR NOMBRE METODO PAGO:
function getMetodoPagoNombre(req, res) {
    const Nombre_Metodo = req.params.nombre;
    db.query(`SELECT * FROM Metodo_de_pago WHERE Nombre_Metodo LIKE '%${Nombre_Metodo}%';`, 
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener el Método de Pago específico.');
            } else {
                res.json(result); 
                console.log('Resultados encontrados: ', result);
            }
        });
}

// CREAR NUEVO METODO DE PAGO:
function createMetodoPago(req, res) {
    const { Nombre_Metodo, Tipo_Metodo_Pago, Referencia, ID_Estado_FK } = req.body;

    db.query(`INSERT INTO Metodo_de_pago(Nombre_Metodo, Tipo_Metodo_Pago, Referencia, ID_Estado_FK) VALUES (?,?,?,?)`,
        [Nombre_Metodo, Tipo_Metodo_Pago, Referencia, ID_Estado_FK],
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('\nError al crear el Método de Pago.');
            } else {
                db.query('SELECT * FROM Metodo_de_pago WHERE ID_Metodo_Pago_PK = ?', result.insertId, (err, rows) => {
                    if (err) {
                        console.error('\x1b[31m', err, '\x1b[0m\n');
                        res.status(500).send('\nError al obtener el Método de Pago recién insertado.');
                    } else {
                        // Envía el objeto recién insertado como respuesta al cliente
                        res.status(200).json(rows[0]);
                        console.log('Método de Pago registrado con éxito!!');
                    }
                });
            }
        });
}

// ACTUALIZAR METODO DE PAGO:
function updateMetodoPago(req, res) {
    const ID_Metodo_Pago_PK = req.params.id;
    const { Nombre_Metodo, Tipo_Metodo_Pago, Referencia, ID_Estado_FK} = req.body;

    // Construimos la consulta de actualización basada en los campos proporcionados en la solicitud
    let updateQuery = 'UPDATE Metodo_de_pago SET ';
    const updateValues = [];

    /*  construir de manera dinamiza la consulta
        Evaluamos si el valor ya existe la consulta y lo guardamos en un array. */

    if (Nombre_Metodo !== undefined) {
        updateQuery += 'Nombre_Metodo=?, ';
        updateValues.push(Nombre_Metodo);
    }
    if (Tipo_Metodo_Pago !== undefined) {
        updateQuery += 'Tipo_Metodo_Pago=?, ';
        updateValues.push(Tipo_Metodo_Pago);
    }
    if (Referencia !== undefined) {
        updateQuery += 'Referencia=?, ';
        updateValues.push(Referencia);
    }
    if (ID_Estado_FK !== undefined) {
        updateQuery += 'ID_Estado_FK=?, ';
        updateValues.push(ID_Estado_FK);
    }

    console.log("\x1b[30m   Consulta dinamica antes de quitar coma: \x1b[33m", updateQuery, '\x1b[0m\n');
    // eliminar la coma final, si existe. Para evitar sintaxis error.
    updateQuery = updateQuery.replace(/,\s*$/, ' '); // Expresion regular, para borrar la coma
    console.log("\x1b[30m   Despues de quitar coma: \x1b[33m", updateQuery, '\x1b[0m\n');

    updateQuery += 'WHERE ID_Metodo_Pago_PK = ?';
    updateValues.push(ID_Metodo_Pago_PK); // a;adimos al final la id del pedido.

    // Ejecutamos la consulta de actualización [updateQuery y updateValues].
    db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
            console.error('\x1b[31m', err, '\x1b[0m\n');
            res.status(500).send('Error al actualizar el Método de Pago.');
        } else {
            console.log('\x1b[32mMétodo de Pago actualizado con éxito!!\x1b[0m');
            res.status(200).json({ message: 'Método de Pago actualizado exitosamente' });
        }
    });
}

// ELIMINAR METODO DE PAGO:
function deleteMetodoPago(req, res) {
    const ID_Metodo_Pago_PK = req.params.id;

    db.query(`DELETE FROM Metodo_de_pago WHERE ID_Metodo_Pago_PK=?`, [ID_Metodo_Pago_PK],
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener Método de Pago.');
            } else {
                res.send('Método de Pago eliminado con éxito!!...');
                console.log('\x1b[31m\nMétodo de Pago eliminado con éxito!!...');
            }
        });
}

module.exports = {
    getMetodoPagos,
    getMetodoPagoId,
    getMetodoPagoNombre,
    createMetodoPago,
    updateMetodoPago,
    deleteMetodoPago,
}