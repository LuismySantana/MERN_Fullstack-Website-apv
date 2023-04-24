//? Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

import generateJWT from "../helpers/generateJWT.js";
import generateToken from "../helpers/generateToken.js";
import sendRegisterEmail from "../helpers/sendRegisterEmail.js";
import sendResetPasswordEmail from "../helpers/sendResetPasswordEmail.js";
import Veterinary from "../models/Veterinary.js";



const registerVeterinary = async (req, res) => {
    try {
        // El mail es unico, asi que debemos revisar si el usuario ya existe
        req.body.email = req.body.email.toLowerCase(); // Forzamos el lower case del email para evitar el case sensitive en estos en todos los casos

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
        req.params.email = req.params.email.toLowerCase();
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
        req.body.email = req.body.email.toLowerCase();
        const { email, password } = req.body;

        const logUser = await Veterinary.findOne({ email }); 

        if (!logUser) {
            response.status = 404;
            response.message = "Este usuario no existe";

        } else if (!await logUser.checkPassword(password)) {
            response.status = 403;
            response.message = "Contraseña incorrecta";
            
        } else if (!logUser.validatedUser) {
            response.status = 403;
            response.message = "Este usuario no está validado todavía";

        } else {
            response.status = 200;
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
            vetProfile: req.loggedVet
        }
    )
}


// El usuario envía su email para resetear la contraseña y le envia email con su token
const resetPasswordRequest = async (req, res) => {
    const email = req.body.email.toLowerCase();
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
            sendResetPasswordEmail({
                name: userToReset.name,
                token: userToReset.token,
                email
            });

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


// Validamos el token del usuario cuando trata de acceder a la página de cambiar su password
const validateResetToken = async (req, res) => {
    req.params.email = req.params.email.toLowerCase();
    const { email, token } = req.params;
    const response = {};

    try {
        const userToReset = await Veterinary.findOne({email, token});
    
        if(!userToReset) {
            response.status = 403;
            response.message = "Invalid token or email. Contact with support.";

        } else {
            response.status = 200;
            // No es necesario message ya que es sólo un validador de acceso
        }
        
    } catch (error) {
        response.status = 500;
        response.message = error.message;
    
    } finally {
        res.status(response.status).json(response);
    }
}


// Modificamos el password (volviendo a revisar el token)
const resetPasswordAction = async (req, res) => {
    req.body.email = req.body.email.toLowerCase();
    const { email, token, password } = req.body;
    const response = {};

    try {
        const userToReset = await Veterinary.findOne({email, token});
        
        if(!userToReset) {
            response.status = 403;
            response.message = "Ocurrió un error\nContacta con soporte";
    
        } else {
            userToReset.token = null;
            userToReset.password = password;

            await userToReset.save();
            
            response.status = 200;
            response.message = "Contraseña modificada correctamente";
        }
        
    } catch (error) {
        response.status = 500;
        response.message = error.message;
        
    } finally {
        res.status(response.status).json(response);
    }
}
     

// Modificar datos de veterinario
const updateVeterinaryProfile = async (req, res) => {
    req.body.email = req.body.email.toLowerCase();
    const { name, email, phone, website } = req.body;
    const response = {};

    try {
        const vetToUpdate = await Veterinary.findById(req.params.id); // Al buscar por id, si no encuentra, libera un error en ver de retornar null
                
        if(!vetToUpdate) { // Por tanto este if queda inutil, pero lo dejo para recordar este dato
            response.status = 404;
            response.message = "El usuario no existe";
    
        } else if (vetToUpdate.email !== email && await Veterinary.findOne({email})) {
            response.status = 403;
            response.message = "Este email ya se encuentra registrado";

        } else {
            vetToUpdate.name = name;
            vetToUpdate.email = email;
            vetToUpdate.phone = phone || null; // Estos campos no son obligatorios así que si se entregan vacíos, entonces null si no hubiera nada
            vetToUpdate.website = website || null;

            const updatedVeterinary = await vetToUpdate.save();
            
            response.status = 200;
            response.updatedVeterinary = updatedVeterinary.getSessionData();
            response.message = "Datos modificados correctamente";           
        }
        
    } catch (error) {
        response.status = 500;
        response.message = error.message;
        
    } finally {
        res.status(response.status).json(response);
    }
}


const changeVeterinaryPassword = async (req, res) => {
    const { password, newPassword, id } = req.body; //
    const response = {};
    
    try {
        const vetToUpdate = await Veterinary.findById(id); // Recuerda: Al buscar por id, si no encuentra, libera un error
        // Se podria verificar la info con la sesion del middleware pero lo veo un tanto innecesario ya que cojo la id de la session del frontend que se inicia en login o en refresh, no se puede cambiar
        
        if (!await vetToUpdate.checkPassword(password)) {
            response.status = 403;
            response.message = "Contraseña actual incorrecta";

        } else if (password === newPassword) {
            response.status = 403;
            response.message = "La nueva contraseña debe ser distinta a la actual";

        } else {
            vetToUpdate.password = newPassword;
            await vetToUpdate.save();
            
            response.status = 200;
            response.message = "Contraseña modificada correctamente";

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
    resetPasswordAction,
    updateVeterinaryProfile,
    changeVeterinaryPassword
}