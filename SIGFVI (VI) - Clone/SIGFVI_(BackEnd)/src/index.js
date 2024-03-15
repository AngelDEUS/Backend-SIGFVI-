/*
    * Index principal.
*/

// Exportaciones de modulos y dependencias necesarios para el BackEnd
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const swaggerDos = require('./swagger-jsdoc');

// ---> Modulos de Ventas y Facturación:
const pedidosRouter = require('./routers/mod_ventas_facturacion_r/pedidosRouter');
const metodoPagoRouter = require('./routers/mod_ventas_facturacion_r/metodoPagoRouter');
const routerConsultas = require('./routers/mod_ventas_facturacion_r/consulatasImportRouter.js')
const pagarVentaRouter = require('./routers/mod_ventas_facturacion_r/pagarVentaRouter.js');

// --> Modúlo de Productos e Inventario
const inventarioRouter = require('./routers/mod_inventario_r/inventarioRouter.js');
const productoRouter = require('./routers/mod_inventario_r/productoRouter');

// Modulo de Usuarios.
const empleadoRouter = require('./routers/mod_usuarios_r/empleadoRouter.js');
const proveedorRouter = require('./routers/mod_usuarios_r/proveedorRouter.js');
const adminRouter = require('./routers/mod_usuarios_r/administradorRouter.js');



// - Uses
const app = express();
const PORT = process.env.PORT || 3001;
// - Cors Options
const optionsCors = {
    origin: `http://localhost:3000`,
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200,  
};
app.use(cors(optionsCors)); // - Use de las opciones inicializadas del cors.

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Modulo de ventas y facturacion.
app.use('/', pedidosRouter); 
app.use('/', metodoPagoRouter);
app.use('/pagoventa', pagarVentaRouter);
app.use('/vyf', routerConsultas);

// Modulo de productos en inventario.
app.use('/producto', productoRouter); 
app.use('/inventario', inventarioRouter);

// Modulo de Usuario.
app.use('/usuario', empleadoRouter); // Empleados
app.use('/usuario', proveedorRouter); // Proveedores
app.use('/usuario', adminRouter); // Administradores
app.use('/usuario', adminRouter); // Administradores


app.get("/", (req, res) => { // Mensajes de pagina principal.
    res.send("¡Hola! Este es el servidor backend!");
    console.log("¡Hola! Este es el servidor backend!");
});


// - Listen del puerto.
app.listen(PORT, ()=>{
    console.log(`\n\n     El servidor funcionando en el puerto: \x1b[33m[${PORT}]\x1b[33m.`);
    console.log(`\n     Local:                  http://localhost:${PORT}\x1b[0m\n`);
});