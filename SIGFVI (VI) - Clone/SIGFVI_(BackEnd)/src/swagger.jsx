const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

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
        url: "http://localhost:3001/api",
        description: "Documentación de la API",
      },
    ],
  },
  apis: ["./routers/mod_inventario_r/productoRouter.js"],
};

const swaggerSpec = swaggerJSDOC(options);

const swaggerJSDOCs = (app, port) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`
    Versión No 1 de la documentación estará disponible en http://localhost:${port}/api-docs
  `);
};

module.exports = {
  swaggerJSDOCs,
};
