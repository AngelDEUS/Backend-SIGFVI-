const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require('path')
// const pruebaDeRutas = require('./routers/mod_usuarios_r/administradorRouter')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Conexión con API MySQL",
      version: "1.0.0",
      description:
        "Documentación de los endpoints",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Documentación de la API",
      },
    ],
  },
  apis: [path.join(__dirname, "./routers/mod_usuarios_r/*.js"),
  path.join(__dirname, "./routers/mod_informes_r/*.js"),
  path.join(__dirname, "./routers/mod_ventas_facturacion_r/*.js"),
  path.join(__dirname, "./routers/mod_dashboard_graficas/*.js"),
  path.join(__dirname, "./routers/mod_inventario_r/*.js"),
  path.join(__dirname, "./routers/global_r/*.js"),
]
};

const swaggerSpec = swaggerJSDOC(options);
console.log("Esto es:  ", swaggerSpec)

const swaggerJSDOCs = (app, port) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`
  \x1b[32m----------------------------------------------------------
    Documentación disponible en: 
    
    http://localhost:${port}/api-docs
  ----------------------------------------------------------
  \x1b[0m
`);
};

module.exports = {
  swaggerJSDOCs,
};