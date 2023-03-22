//? Aquí vamos a definir todas las rutas para gestionar los datos del modelo de veterinarios. En otras palabras, los endpoints para datos de veterinarios

import express from "express";
import checkAuthentication from "../middleware/checkAuthentication.js";
import {
	registerVeterinary,
	getVeterinaryProfile,
	verifyVeterinaryTokken,
	loginVeterinary,
	resetPasswordRequest,
	validateResetToken,
	resetPasswordAction
} from "../controllers/veterinariesController.js";



const veterinariesRoutes = express.Router();

// Rutas públicas
veterinariesRoutes.post("/register", registerVeterinary);
veterinariesRoutes.get("/verify/:email/:token", verifyVeterinaryTokken);
veterinariesRoutes.post("/login", loginVeterinary);
veterinariesRoutes.post("/password-reset", resetPasswordRequest);
veterinariesRoutes.route("/password-reset/:email/:token").get(validateResetToken);
veterinariesRoutes.route("/password-reset/reset").post(resetPasswordAction);

// Rutas privadas
veterinariesRoutes.get("/profile", checkAuthentication, getVeterinaryProfile);



export default veterinariesRoutes;