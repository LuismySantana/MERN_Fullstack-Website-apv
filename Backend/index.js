//? Recuerda que este es el PUNTO DE PARTIDA de la aplicacion. Mediante npm run start tal como lo pusimos ejecutamos este script y en él debemos inicializar nuestro servidor de Express

import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import veterinaryRoutes from "./routes/veterinaryRoutes.js";


const app = express();

// Hacemos la búsqueda de todas las variables de entorno
dotenv.config();

// Tras iniciar el servidor, conectamos a la bbdd
dbConnect();




/*
    app.use("/", (req, res) => { // Así recogemos los distintos endpoints de nuestro servidor. En el caso de use sirve para escuchar a partir de todas las posibles llamadas HTTP (get, post, put, patch y delete) y la ruta "/" implica el inicio de la app, es decir la conexión inicial de la aplicación
        res.send("Hola mundo") // Como estamos en un use, bajo cualquier peticion de la web siempre devolveremos "hola mundo"  
    });
*/


// Punto de ruta para los endpoints de veterinarios
app.use("/api/veterinaries", veterinaryRoutes)



const port = process.env.PORT || 4000; // De esta forma recogemos el puerto de nuestro servidor en el deployment

app.listen(port, () => {
    
    console.log("Server online in port 4000");
    
}); // Puerto por el que escuchará el server

























/*
    * Important info: 
        Modules:
        - Express es el framework de Node que CREA el servidor con todos sus endpoints, etc
        - Nodemon es un plugin que me resetea la ejecución de Node de forma automatica tras cada cambio
        - dotenv es para recoger variables de entorno
*/