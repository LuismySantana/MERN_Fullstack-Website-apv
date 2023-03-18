//? Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

import Veterinary from "../models/Veterinary.js";


const registerVeterinary = async (req, res) => {

    try {
        // Guardamos un nuevo veterinario (usando el model de Veterinaries que ya creamos)
        const newVet = new Veterinary(req.body); // En req.body ya tenemos el objeto con los datos en cuestion, como estos respetan los nombres de las varaibles del modelo los asigna de forma automatica
        
        const isSavedNewVet = await newVet.save();
        
    } catch (error) {
        console.log(error);
    }
    
    res.json(  // Send es para enviar información al navegador pero una API debe devolver info en JSON asi que usamos .json()
        {
            message: "Register a new Veterinary"
        }
    )
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