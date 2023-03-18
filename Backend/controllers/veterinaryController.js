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
        res.status(400).json(error);
    }
};


const getVeterinaryProfile = (req, res) => {
    res.json(                           // Send es para enviar información al navegador pero una API debe devolver info en JSON asi que usamos .json()
        {
            message: "Get user profile"
        }
    )
};



export {
    registerVeterinary,
    getVeterinaryProfile
}