const express = require("express");
const bodyParser = require("body-parser");
const datosRouter = require("./Routers/datosRouter");
const rutaDatosInventario = require("./Routers/consultas");
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/", datosRouter);
app.use("/", rutaDatosInventario);

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(
    `\nEl servidor funcionando en el puerto \x1b[33m${PORT}\x1b[33m\x1b[33m.`
  );
});