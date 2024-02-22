const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usuarioRouter = require("./routes/datosRouter");
const app = express();

// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// Route configuration
app.use("/", usuarioRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
