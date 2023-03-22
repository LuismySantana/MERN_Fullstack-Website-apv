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


const getPatientsList = (req, res) => {
    res.json({
        msg: "Get all patients"
    })
}



export {
    addNewPatient,
    getPatientsList
}