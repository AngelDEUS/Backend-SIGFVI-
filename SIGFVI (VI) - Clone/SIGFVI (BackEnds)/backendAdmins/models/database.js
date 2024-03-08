const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "0000",
=======
  password: "",
>>>>>>> origin/mod_usuarios_fs
  database: "SIGFVI_V2",
});

db.connect((err) => {
  if (err) {
    console.error("Errorr al conectar en la base de datos", err);
    return;
  }
  console.log("Conexion Existosa a la base de datos.");
});

process.on("SIGINT", () => {
  db.end();
  process.exit();
});

module.exports = db;