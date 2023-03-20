//? Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

import Veterinary from "../models/Veterinary.js";



const registerVeterinary = async (req, res) => {
    try {
        // El mail es unico, asi que debemos revisar si 
        const { email } = req.body;
        const emailExists = await Veterinary.findOne({email}) // email: email --> email | findOne me devuelve el primer registro que cumpla x condicion, si no hubiera, deuvelve null

        if (emailExists) {
            // Así lanzamos un error de respuesta
            res.status(400).json({
                message: "User already exists"
            });

        } else {
            // Guardamos un nuevo veterinario (usando el model de Veterinaries que ya creamos)
            const newVet = new Veterinary(req.body); // En req.body ya tenemos el objeto con los datos en cuestion, como estos respetan los nombres de las varaibles del modelo los asigna de forma automatica
            const savedVetInfo = await newVet.save();
            res.json(savedVetInfo);
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
};


const verifyVeterinaryTokken = async (req, res) => {
    const response = {};

    try {
        const { email, token } = req.params;

        const userToVerify = await Veterinary.findOne({email});

        if (!userToVerify) {
            response.status = 400;
            response.message = "The user does not exists";

        } else if (userToVerify.validatedUser) {
            response.status = 400;
            response.message = "This user is already validated";

        } else if (userToVerify.token !== token) {
            response.status = 401;
            response.message = "Incorrect token";

        } else {
            userToVerify.token = null;
            userToVerify.validatedUser = true;

            await userToVerify.save(); // Así reescribimos el usuario

            response.status = 200;
            response.message = "User verified";
            response.email = email
        }

    } catch (error) {
        response.status = 500;
        response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}


const loginVeterinary = async (req, res) => {
    const response = {};

    try {

        const { email, password } = req.body;

        const logUser = await Veterinary.findOne({ email }); 

        if (!logUser) {
            response.status = 403;
            response.message = "The user does not exists";

        } else if (!logUser.validatedUser) {
            response.status = 403;
            response.message = "This user email is not validated yet";

        } else if (!await logUser.checkPassword(password)) {
            response.status = 403;
            response.message = "Incorrect password";
            
        } else {
            response.status = 200;
            response.message = "User logged correctly";
            response.email = email
        }

    } catch (error) {
        response.status = 500;
        response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}


const getVeterinaryProfile = (req, res) => {
    res.json(                           // Send es para enviar información al navegador pero una API debe devolver info en JSON asi que usamos .json()
        {
            message: "Get user profile"
        }
    )
}



export {
    registerVeterinary,
    getVeterinaryProfile,
    verifyVeterinaryTokken,
    loginVeterinary
}