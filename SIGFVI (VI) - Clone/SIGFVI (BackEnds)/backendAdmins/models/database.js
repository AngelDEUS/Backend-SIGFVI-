const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "",
=======
<<<<<<< HEAD
  password: "0000",
=======
  password: "",
>>>>>>> origin/mod_usuarios_fs
>>>>>>> 881f8ae262aae192c2e398f16e903e1f8d4751fa
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