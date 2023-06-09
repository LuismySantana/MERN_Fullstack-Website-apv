//? Aquí vamos a definir todas las rutas para gestionar los datos del modelo de veterinarios. En otras palabras, los endpoints para datos de veterinarios

import express from "express";
import checkAuthentication from "../middlewares/checkAuthentication.js";
import {
	registerVeterinary,
	getVeterinaryProfile,
	verifyVeterinaryTokken,
	loginVeterinary,
	resetPasswordRequest,
	validateResetToken,
	resetPasswordAction,
	updateVeterinaryProfile,
	changeVeterinaryPassword
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
veterinariesRoutes.put("/profile/:id", checkAuthentication, updateVeterinaryProfile);
veterinariesRoutes.put("/password-change", checkAuthentication, changeVeterinaryPassword);



export default veterinariesRoutes;