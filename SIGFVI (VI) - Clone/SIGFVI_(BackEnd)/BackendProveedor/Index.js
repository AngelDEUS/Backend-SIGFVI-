const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const datosRouter = require("./Routes/datosRouter");
const app = express();

const corsOptions = {
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", datosRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
