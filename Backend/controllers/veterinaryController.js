//? Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

import Veterinary from "../models/Veterinary.js";

// TODO: Lo último que hicimos fue crear una request valida para registerVeterinary en Thunder client que ya pasara los parametros obligatorios en el body.
// TODO: Ahora lo que toca es aprender a almacenar los registros con moongose. Mañana le damos que esta chulo


const registerVeterinary = (req, res) => {
    const { email, password, name } = req.body;
    
    console.log(email, password, name);

    try {
        // Guardamos un nuevo veterinario

        
    } catch (error) {
        console.log
    }
    
    res.json(                           // Send es para enviar información al navegador pero una API debe devolver info en JSON asi que usamos .json()
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