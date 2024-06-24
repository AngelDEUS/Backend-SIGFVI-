/*
    * Adaptador de la base de Datos SIGFVI
    * (Posible mejora), Incluir variables de entorno para la Separación de credenciales.
    * (Posible mejora),  
    * podriamos mysql.createPool en lugar de mysql.createConnection, para evitar la saturacion y sobrecalentamiento de la base de datos
 */


const mysql = require("mysql2"); // importar el modulo de mysql
const nomDatabase = "SIGFVI_V3"; // nombre de la base de datos.

const DB_DATABASE = process.env.DB_DATABASE || "SIGFVI_V3";
const DB_PASSWORD = process.env.DB_PASSWORD || "0000";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";

// Conexion base de datos
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})


db.connect((err) => {
    if (err) {
        console.error('\n\x1b[31m', "Errorr al conectar en la base de datos.\n\n", err, '\x1b[0m\n');
        return
    }
    console.log(`\x1b[36m     Conexion Existosa a la base de datos. "${nomDatabase}"`, '\x1b[0m\n');
    
    console.log(process.env.DB_DATABASE);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
});

// Proceso importante, abre la conexion a la base de datos, cuando esta abirta recibe, y cuando no se cierra.
// Manejamos la se;a SIGINT
process.on("SIGINT", () => {
    db.end();
    process.exit();
});

module.exports = db;