//? Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";
import sendRegisterEmail from "../helpers/sendRegisterEmail.js";
import sendResetPasswordEmail from "../helpers/sendResetPasswordEmail.js";
import Veterinary from "../models/Veterinary.js";



const registerVeterinary = async (req, res) => {
    try {
        // El mail es unico, asi que debemos revisar si 
        const { email, name } = req.body;
        const emailExists = await Veterinary.findOne({email}) // email: email --> email | findOne me devuelve el primer registro que cumpla x condicion, si no hubiera, deuvelve null

        if (emailExists) {
            // Así lanzamos un error de respuesta
            res.status(400).json({
                message: "El usuario ya está registrado"
            });

        } else {
            // Guardamos un nuevo veterinario (usando el model de Veterinaries que ya creamos)
            const newVet = new Veterinary(req.body); // En req.body ya tenemos el objeto con los datos en cuestion, como estos respetan los nombres de las varaibles del modelo los asigna de forma automatica
            const savedVetInfo = await newVet.save();

            //Enviamos email con token de confirmacion
            sendRegisterEmail({
                email,
                name,
                token: savedVetInfo.token
            });

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
            response.message = "Este usuario no existe";

        } else if (userToVerify.validatedUser) {
            response.status = 400;
            response.message = "Este usuario ya está validado";

        } else if (userToVerify.token !== token) {
            response.status = 401;
            response.message = "Token inválido";

        } else {
            userToVerify.token = null;
            userToVerify.validatedUser = true;

            await userToVerify.save(); // Así reescribimos el usuario

            response.status = 200;
            response.message = "Usuario verificado correctamente";
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
            response.token = generateJWT(logUser.id);
        }

    } catch (error) {
        response.status = 500;
        response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}


const getVeterinaryProfile = (req, res) => {
    res.json(
        {
            status: 200,
            userInfo: req.loggedVet
        }
    )
}


// El usuario envía su email para resetear la contraseña y le envia email con su token
const resetPasswordRequest = async (req, res) => {
    const email = req.body.email;
    const response = {};

    try {
        const userToReset = await Veterinary.findOne({email});

        if (!userToReset) {
            response.status = 404;
            response.message = "Usuario no encontrado";

        } else if (!userToReset.validatedUser) {
            response.status = 403;
            response.message = "Usuario no validado aún";

        } else {
            // Ya que ya tenemos el registro de token, podemos aprovecharlo para este caso y no afectaría con el que tenemos para validacion de email puesto que 1º siempre se revisa si el mail ya esta verificado
            userToReset.token = generateToken();
            await userToReset.save();

            // Enviamos mail de password reset
            sendResetPasswordEmail(userToReset);

            response.status = 200;
            response.message = "Te hemos enviado un email con las instrucciones";
            
        }
        
        
    } catch (error) {
        response.status = 500;
        response.message = error.message;

    } finally {
        res.status(response.status).json(response);
    }
}


// Validamos el token del usuario cuando trata de cambiar su password
const validateResetToken = async (req, res) => {
    const { email, token } = req.params;
    const response = {};

    try {
        const userToReset = await Veterinary.findOne({email});
    
        if(!userToReset) {
            response.status = 404;
            response.message = "Usuario no encontrado";
    
        } else if (userToReset.token !== token) {
            response.status = 403;
            response.message = "Token no válido";

        } else {
            response.status = 200;
            response.message = "Permiso concedido";
        }
        
    } catch (error) {
        response.status = 500;
        response.message = error.message;
    
    } finally {
        res.status(response.status).json(response);
    }
}


const resetPasswordAction = async (req, res) => {
    const { email, token, password } = req.body;
    const response = {};

    try {
        const userToReset = await Veterinary.findOne({email});
        
        if(!userToReset) {
            response.status = 404;
            response.message = "Usuario no encontrado";
    
        } else if (userToReset.token !== token) {
            response.status = 403;
            response.message = "Token no válido";
    
        } else {
            userToReset.token = null;
            userToReset.password = password;

            await userToReset.save();
            
            response.status = 200;
            response.message = "Conntraseña modificada correctamente";
        }
        
    } catch (error) {
        response.status = 500;
        response.message = error.message;
        
    } finally {
        res.status(response.status).json(response);
    }
}
     


export {
    registerVeterinary,
    getVeterinaryProfile,
    verifyVeterinaryTokken,
    loginVeterinary,
    resetPasswordRequest,
    validateResetToken,
    resetPasswordAction
}