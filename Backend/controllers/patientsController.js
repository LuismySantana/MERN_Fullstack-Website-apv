import Patient from "../models/Patient.js";



const addNewPatient = async (req, res) => {
    const newPatient = new Patient(req.body);
    newPatient.veterinary = req.loggedVet._id;

    try {
        const savedPatient = await newPatient.save();

        res.json({
            status: 200,
            savedPatient: savedPatient.getPublicData()
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
        const patients = await Patient.find().where("veterinary").equals(req.loggedVet).select(
            "-createdAt -updatedAt -__v"
        );

        res.json({
            status: 200,
            patients
        });
        
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}


const getPatient = async (req, res) => {
    const response = {};

    try {
        const searchedPatient = await Patient.findById(req.params.id);

        if (!searchedPatient) {
            response.status = 404;
            response.message = "Patient not found.";

        } else {
            // Recordemos que las ID se guardan como ObjectId, es necesario parsearlos a string para compararlos sin errores
            if (searchedPatient.veterinary.toString() === req.loggedVet._id.toString()) {
                response.status = 200;
                response.data = searchedPatient;

            } else {
                response.status = 403;
                response.message = "You don`t have access to this patient.";
            }

        }
        
    } catch (error) {
            response.status = 500;
            response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}


const updatePatient = async (req, res) => {
    const response = {};

    try {
        const searchedPatient = await Patient.findById(req.params.id);

        if (!searchedPatient) {
            response.status = 404;
            response.message = "Patient not found.";

        } else {
            if (searchedPatient.veterinary.toString() === req.loggedVet._id.toString()) {
                
                // Actualizamos los datos
                const { petName, symptoms, dischargeDate, ownerName, ownerEmail } = req.body;
                
                searchedPatient.petName = petName || searchedPatient.petName;
                searchedPatient.symptoms = symptoms || searchedPatient.symptoms;
                searchedPatient.dischargeDate = dischargeDate || searchedPatient.dischargeDate;
                searchedPatient.ownerName = ownerName || searchedPatient.ownerName;
                searchedPatient.ownerEmail = ownerEmail || searchedPatient.ownerEmail;

                searchedPatient.save();
                
                response.status = 200;
                response.updatedPatient = searchedPatient.getPublicData();

            } else {
                response.status = 403;
                response.message = "You don`t have access to this patient.";
            }

        }
        
    } catch (error) {
            response.status = 500;
            response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}


const deletePatient = async (req, res) => {
    const response = {};

    try {
        const searchedPatient = await Patient.findById(req.params.id);

        if (!searchedPatient) {
            response.status = 404;
            response.message = "Paciente no encontrado";

        } else {
            if (searchedPatient.veterinary.toString() === req.loggedVet._id.toString()) {

                // Eliminamos al paciente
                searchedPatient.deleteOne();
                
                response.status = 200;
                response.message = "Paciente eliminado correctamente";

            } else {
                response.status = 403;
                response.message = "No tienes acceso a este paciente";
            }

        }
        
    } catch (error) {
            response.status = 500;
            response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}



export {
    addNewPatient,
    getPatientsList,
    getPatient,
    updatePatient,
    deletePatient
}