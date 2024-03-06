const express = require("express");
const bodyParser = require("body-parser");
const datosRouter = require("./router/datosRouter");
const app = express();
const cors = require('cors')

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: 'GET,POST,PUT,DELETE',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.get("/Read",datosRouter);

app.get("/Read/:id",datosRouter);

app.post("/Create",datosRouter);

app.put('/Update/:id',datosRouter);

app.delete('/Delete/:id',datosRouter);

app.get('/consdeudor',datosRouter);

app.post('/createdeudor',datosRouter);

app.put('/updatedeudor/:id',datosRouter);

app.delete("/deletedeudor/:id",datosRouter);

app.put('/updatesaldo/:id',datosRouter);

app.put('/cambiarestado/:id',datosRouter);

app.put('/cambioestadoadmin/:id',datosRouter)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `\nEl servidor funcionando en el puerto \x1b[33m${PORT}\x1b[33m\x1b[33m.`
  );
});
