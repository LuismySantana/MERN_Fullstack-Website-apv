import express from "express";
import checkAuthentication from "../middleware/checkAuthentication.js";
import { 
    addNewPatient,
    getPatientsList
} from "../controllers/patientsController.js";



const patientsRoutes = express.Router();

// Todas son rutas protegidas ya que los pacientes solo pueden ser gestionados por sus respectivos Veterinarios
patientsRoutes.route("/")
    .post(checkAuthentication, addNewPatient)
    .get(checkAuthentication, getPatientsList);



export default patientsRoutes;