const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SIGFVI_V2"

});

db.connect((err) =>{
    if(err){
        console.log("Error al conectara la base de datos", err);
        return;
    }
    console.log("Conectado a la base de datos")
});

process.on("SIGINT", () =>{
    db.end();
    process.exit();
});

module.exports = db;