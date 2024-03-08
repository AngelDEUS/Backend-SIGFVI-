const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const datosRouter = require("./Routes/datosRouter");
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", datosRouter);

<<<<<<< HEAD
const PORT = process.env.PORT || 3003;
=======
const PORT = process.env.PORT || 3001;
>>>>>>> 881f8ae262aae192c2e398f16e903e1f8d4751fa

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});
