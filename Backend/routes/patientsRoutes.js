import express from "express";
import { myFunc } from "../controllers/patientsController.js";



const patientsRoutes = express.Router();

patientsRoutes.get("/rutita", myFunc)



export default patientsRoutes;