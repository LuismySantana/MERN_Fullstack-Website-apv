import Patient from "../models/Patient.js";



const addNewPatient = async (req, res) => {
    const newPatient = new Patient(req.body);
    newPatient.veterinary = req.loggedVet._id;

    try {
        const savedPatient = await newPatient.save();

        res.json({
            status: 200,
            savedPatient
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}


const getPatientsList = async (req, res) => {
    try {
        const patientsList = await Patient.find().where("veterinary").equals(req.loggedVet);
        res.json({
            status: 200,
            patientsList
        });
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}



export {
    addNewPatient,
    getPatientsList
}