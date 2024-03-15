
// import swaggerJSDOCS from "swagger-jsdoc";
// import swaggerUI from "swagger-ui-express";
// //Configuracion
// //Configuracion 
// const options = {
//     definition = {

//         openapi: "3.0.0",
//         info = {
//             title: "API con conexion a MySQL",
//             version: "1.0.0",
//             description: "Ejemplo conectandose MySQL y separando las rutas",
//             contact: {
//                 name: "API Support",
//                 url:
//                     email: "supportADSO@example.com",
//             },
//         },
//         servers: [
//             {
//                 url: "http://localhost:9000",
//                 description: "Documentacion de mi API Rest ColectionHot",
//             }
//         ],
//     },
//     apis: ["./routes.js"],
// };

// const swagerSpec = swaggerJSDOC(options);

// const swaggerJSDOCS = (app, port) => {
//     app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagerSpec));
//     app.get("/api-docs.json", (req, res) => {
//     });
//     res.setHeader("contenType", "application/json"); res.send(swagerSpec);
//     console.log(
//     );
//     `Version No 1 de la documentacion estara disponible en http://localhost:${port}/api-docs`
// };
