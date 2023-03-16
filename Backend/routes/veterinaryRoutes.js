//? Aquí vamos a definir todas las rutas para gestionar los datos del modelo de veterinarios. En otras palabras, los endpoints para datos de veterinarios

import express from "express";



const veterinaryRoutes = express.Router();


veterinaryRoutes.get("/", (req, res) => {
    res.send("Que lo que")
})



export default veterinaryRoutes;