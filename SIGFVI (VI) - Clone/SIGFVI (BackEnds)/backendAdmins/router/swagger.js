const swaggerJSDOC =require("swagger-jsdoc") ;
const swaggerUI =require("swagger-ui-express") ;

//Configuracion
const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title:"API con conexion a MySQL",
            version: "1.0.0",
            description: "Ejemplo conectandose MySQL y separado rutas",
            contact: {
                name:"Api Support",
                url: "",
                email: "correo@ejemplo.com"
            },
        },

        server:[
            {
                url: "http://localhost:9000",
                description:"Documentacion de API"
            },
        ],
    },
    apis: ["./datosRouter"]
};

const swaggerSpec = swaggerJSDOC(options);
const swaggerJSDOCs = (app, port)=>{
    app.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("api-docs.json",(req,res)=>{
        res.setHeader("contentType","application/json");
        res.send(swaggerSpec);
    });
    console.log(`Version1 dela cocumentacion en http://localhost:${port}/api-docs`);
};

module.exports={
    swaggerJSDOCs
}