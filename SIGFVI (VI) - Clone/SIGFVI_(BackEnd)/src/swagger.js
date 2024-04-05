const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
// const pruebaDeRutas = require('./routers/mod_usuarios_r/proveedorRouter')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Conexión con API MySQL",
      version: "1.0.0",
      description:
        "Documentación de los endpoints de proveedor y descripción de rutas",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Documentación de la API",
      },
    ],
  },
  apis: ["./routers/mod_usuarios_r/proveedorRouter"]
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