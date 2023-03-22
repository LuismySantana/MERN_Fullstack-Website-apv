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
} from "../controllers/veterinaryController.js";



const veterinaryRoutes = express.Router();

// Rutas públicas
veterinaryRoutes.post("/register", registerVeterinary);
veterinaryRoutes.get("/verify/:email/:token", verifyVeterinaryTokken);
veterinaryRoutes.post("/login", loginVeterinary);
veterinaryRoutes.post("/password-reset", resetPasswordRequest);
veterinaryRoutes.route("/password-reset/:email/:token").get(validateResetToken);
veterinaryRoutes.route("/password-reset/reset").post(resetPasswordAction);

// Rutas privadas
veterinaryRoutes.get("/profile", checkAuthentication, getVeterinaryProfile);



export default veterinaryRoutes;