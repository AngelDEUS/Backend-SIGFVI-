/*
    * Index principal.
*/

// Exportaciones de modulos y dependencias necesarios para el BackEnd
const express = require('express');
const path = require("path"); 
const bodyParser = require('body-parser');
const cors = require('cors');
const {swaggerJSDOCs} = require('./swagger.js');

// ---> Modulos de Ventas y Facturación:
const pedidosRouter = require('./routers/mod_ventas_facturacion_r/pedidosRouter');
const metodoPagoRouter = require('./routers/mod_ventas_facturacion_r/metodoPagoRouter');
const routerConsultas = require('./routers/mod_ventas_facturacion_r/consulatasImportRouter.js')
const pagarVentaRouter = require('./routers/mod_ventas_facturacion_r/pagarVentaRouter.js');
const routerFactura = require('./routers/mod_ventas_facturacion_r/facturacionRouter.js');

// --> Modúlo de Productos e Inventario
const inventarioRouter = require('./routers/mod_inventario_r/inventarioRouter.js');
const productoRouter = require('./routers/mod_inventario_r/productoRouter');

// Modulo de Usuarios.
const empleadoRouter = require('./routers/mod_usuarios_r/empleadoRouter.js');
const proveedorRouter = require('./routers/mod_usuarios_r/proveedorRouter.js');
const adminRouter = require('./routers/mod_usuarios_r/administradorRouter.js');

// ---> Rutas diferentes
const rutaGraficas = require('./routers/mod_dashboard_graficas/dashboard_graficas.js')
//modulo informes
const informesRouter = require('./routers/mod_informes_r/informesRouter.js')


// - Uses
const app = express();
const PORT = process.env.PORT || 3001;
// - Cors Options
const optionsCors = {
    origin: `http://localhost:3000 `|| `exp://192.168.0.6:8081`,
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200,  
};
app.use(cors(optionsCors)); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/img', express.static(path.join(__dirname, 'img')));


// Modulo de ventas y facturacion.
app.use('/', pedidosRouter); 
app.use('/', metodoPagoRouter);
app.use('/pagoventa', pagarVentaRouter);
app.use('/facturacion', routerFactura);
app.use('/vyf', routerConsultas);

// Modulo de productos en inventario.
app.use('/producto', productoRouter); 
app.use('/inventario', inventarioRouter);

// Modulo de Usuario.
app.use('/usuario', empleadoRouter); // Empleados
app.use('/usuario', proveedorRouter); // Proveedores
app.use('/usuario', adminRouter); // Administradores
// app.use('/read', adminRouter); // Administradores

app.use('/grafica', rutaGraficas); //Graficas dashboard

//modulo informes
app.use('/informes', informesRouter); // Empleados
 
app.get("/", (req, res) => { // Mensajes de pagina principal.
    res.send("¡Hola! Este es el servidor backend!");
    console.log("¡Hola! Este es el servidor backend!");
});

const fechaVenta = new Date().toISOString().split('T')[0];
const horaVenta = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;



// - Listen del puerto.
app.listen(PORT, ()=>{
    
    swaggerJSDOCs(app, PORT);

    console.log(`\n\n     El servidor funcionando en el puerto: \x1b[33m[${PORT}]\x1b[33m.`);
    console.log(`\n     Local:                  http://localhost:${PORT}\x1b[0m\n`);
    console.log(`     Fecha actual: [${fechaVenta}], Hora actual: [${horaVenta}].\n`);
});
