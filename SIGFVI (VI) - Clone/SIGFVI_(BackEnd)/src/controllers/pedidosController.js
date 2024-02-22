/*
    * Controlador del modulo de ventas.
*/

const db = require('../models/sigfviDBModelo');


// CONSULTAR PEDIDOS;
function getPedidos(req, res) {
    db.query(`SELECT * FROM Pedido`,
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener las Venta Realizadas.');
            } else {
                res.send(result);
            }
        });
};


// BUSCAR PEDIDO POR ID:
function getPedidoId(req, res) {
    const ID_Pedido_PK = req.params.id;

    db.query(`SELECT * FROM Pedido WHERE ID_Pedido_PK=?`, [ID_Pedido_PK],
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener empleado');
            } else {
                res.send(result);
            }
        });
};


// CREAR PEDIDO:
function createPedidos(req, res) {
    const { ID_Metodo_Pago_FK, Fecha_Pedido, Hora_Pedido, IVA, Total_Pedido, ID_Estado_FK, ID_Saldo_PK } = req.body;

    db.query(`INSERT INTO Pedido(ID_Metodo_Pago_FK,Fecha_Pedido,Hora_Pedido,IVA,Total_Pedido,ID_Estado_FK,ID_Saldo_PK) VALUES (?,?,?,?,?,?,?)`,
        [ID_Metodo_Pago_FK, Fecha_Pedido, Hora_Pedido, IVA, Total_Pedido, ID_Estado_FK, ID_Saldo_PK],
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('\nError al crear el Pedido');
            } else {
                db.query('SELECT * FROM Pedido WHERE ID_Pedido_PK = ?', result.insertId, (err, rows) => {
                    if (err) {
                        console.error('\x1b[31m', err, '\x1b[0m\n');
                        res.status(500).send('\nError al obtener el Pedido recién insertado');
                    } else {
                        // Envía el objeto recién insertado como respuesta al cliente
                        res.status(200).json(rows[0]);
                        console.log('pedido registrado con éxito!!');
                    }
                });
            }
        });
}


// ACTUALIZAR PEDIDO POR ID:
function updatePedido(req, res) {
    const ID_Pedido_PK = req.params.id;
    const { Fecha_Pedido, Hora_Pedido, IVA, Total_Pedido, ID_Estado_FK, ID_Saldo_PK } = req.body;

    // Construimos la consulta de actualización basada en los campos proporcionados en la solicitud
    let updateQuery = 'UPDATE Pedido SET ';
    const updateValues = [];

    /*  construir de manera dinamiza la consulta
        Evaluamos si el valor ya existe la consulta y lo guardamos en un array. */

    if (Fecha_Pedido !== undefined) {
        updateQuery += 'Fecha_Pedido=?, ';
        updateValues.push(Fecha_Pedido);
    }
    if (Hora_Pedido !== undefined) {
        updateQuery += 'Hora_Pedido=?, ';
        updateValues.push(Hora_Pedido);
    }
    if (IVA !== undefined) {
        updateQuery += 'IVA=?, ';
        updateValues.push(IVA);
    }
    if (Total_Pedido !== undefined) {
        updateQuery += 'Total_Pedido=?, ';
        updateValues.push(Total_Pedido);
    }
    if (ID_Estado_FK !== undefined) {
        updateQuery += 'ID_Estado_FK=?, ';
        updateValues.push(ID_Estado_FK);
    }
    if (ID_Saldo_PK !== undefined) {
        updateQuery += 'ID_Saldo_PK=?, ';
        updateValues.push(ID_Saldo_PK); 
    }

    console.log("\x1b[30m   Consulta dinamica antes de quitar coma: \x1b[33m",updateQuery, '\x1b[0m\n');
    // eliminar la coma final, si existe. Para evitar sintaxis error.
    updateQuery = updateQuery.replace(/,\s*$/, ' '); // Expresion regular, para borrar la coma
    console.log("\x1b[30m   Despues de quitar coma: \x1b[33m",updateQuery, '\x1b[0m\n');
    
    updateQuery += 'WHERE ID_Pedido_PK = ?';
    updateValues.push(ID_Pedido_PK); // a;adimos al final la id del pedido.

    // Ejecutamos la consulta de actualización [updateQuery y updateValues].
    db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
            console.error('\x1b[31m', err, '\x1b[0m\n');
            res.status(500).send('Error al actualizar el pedido.');
        } else {
            console.log('\x1b[32mPedido actualizado con éxito!!\x1b[0m');
            res.status(200).json({ message: 'Pedido actualizado exitosamente' });
        }
    });
}


// ELIMINAR PEDIDO POR ID:
function deletePedidoId(req, res) {
    const ID_Pedido_PK = req.params.id;

    db.query(`DELETE FROM Pedido WHERE ID_Pedido_PK=?`, [ID_Pedido_PK],
        (err, result) => {
            if (err) {
                console.error('\x1b[31m', err, '\x1b[0m\n');
                res.status(500).send('Error al obtener pedido');
            } else {
                res.send('Pedido eliminado con éxito!!...');
                console.log('\x1b[31m\nPedido eliminado con éxito!!...');
            }
        });
};

module.exports = {
    getPedidos,
    getPedidoId,
    createPedidos,
    updatePedido,
    deletePedidoId,
};