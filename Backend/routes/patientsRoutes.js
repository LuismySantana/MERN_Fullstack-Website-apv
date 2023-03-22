import express from "express";
import { 
    addNewPatient,
    getPatientsList
} from "../controllers/patientsController.js";



const patientsRoutes = express.Router();

// Todas son rutas protegidas ya que los pacientes solo pueden ser gestionados por sus respectivos Veterinarios
patientsRoutes.route("/")
    .get(addNewPatient)
    .post(getPatientsList);



export default patientsRoutes;