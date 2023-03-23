//? Recuerda que este es el PUNTO DE PARTIDA de la aplicacion. Mediante npm run start tal como lo pusimos ejecutamos este script y en él debemos inicializar nuestro servidor de Express

import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import veterinariesRoutes from "./routes/veterinariesRoutes.js";
import patientsRoutes from "./routes/patientsRoutes.js";



// Iniciamos el servidor de Express
const app = express();


// Le decimos al servidor que nuestros request siempre se recogeran en JSON
app.use(express.json());


// Hacemos la búsqueda de todas las variables de entorno
dotenv.config();


// Tras iniciar y configurar el servidor, conectamos a la bbdd
dbConnect();


// Punto de ruta para los endpoints de veterinarios
app.use("/api/veterinaries", veterinariesRoutes);
app.use("/api/patients", patientsRoutes);


const port = process.env.PORT || 4000; // De esta forma recogemos el puerto de nuestro servidor en el deployment

app.listen(port, () => {
    console.log("Server online in port 4000");
});



/*
    * Important info: 
        Modules:
        - Express es el framework de Node que CREA el servidor con todos sus endpoints, etc
        - Nodemon es un plugin que me resetea la ejecución de Node de forma automatica tras cada cambio
        - dotenv es para recoger variables de entorno
        - bcrypt sirve para encriptar/desencriptar passwords
        - jsonwebtoken sirve para crear JWT, en este proyecto se usara para crear las verificaciones de sesion de usuario
        - mongoose es el ORM para bases de datos MongoDB
*/