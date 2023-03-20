//? Aquí vamos a definir todas las rutas para gestionar los datos del modelo de veterinarios. En otras palabras, los endpoints para datos de veterinarios

import express from "express";
import { registerVeterinary, getVeterinaryProfile, verifyVeterinaryTokken, loginVeterinary } from "../controllers/veterinaryController.js";



const veterinaryRoutes = express.Router();


veterinaryRoutes.post("/register", registerVeterinary)
veterinaryRoutes.get("/verify/:email/:token", verifyVeterinaryTokken)
veterinaryRoutes.post("/login", loginVeterinary)
veterinaryRoutes.get("/profile", getVeterinaryProfile)



export default veterinaryRoutes;