import Patient from "../models/Patient.js";



const addNewPatient = (req, res) => {
    res.json({
        msg: "Add new patient"
    })
}


const getPatientsList = (req, res) => {
    res.json({
        msg: "Get all patients"
    })
}



export {
    addNewPatient,
    getPatientsList
}