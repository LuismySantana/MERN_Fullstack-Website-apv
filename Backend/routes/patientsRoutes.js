import express from "express";
import checkAuthentication from "../middlewares/checkAuthentication.js";
import { 
    addNewPatient,
    getPatientsList,
    getPatient,
    updatePatient,
    deletePatient
} from "../controllers/patientsController.js";



// Todas son rutas protegidas ya que los pacientes solo pueden ser gestionados por sus respectivos Veterinarios
const patientsRoutes = express.Router();

// Crear pacientes y recoger listado de los mismos de un vet
patientsRoutes.route("/")
    .post(checkAuthentication, addNewPatient)
    .get(checkAuthentication, getPatientsList);

// RUD de pacientes
patientsRoutes.route("/:id")
    .get(checkAuthentication, getPatient)
    .put(checkAuthentication, updatePatient)
    .delete(checkAuthentication, deletePatient);



export default patientsRoutes;