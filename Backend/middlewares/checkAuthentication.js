import jwt from "jsonwebtoken";
import Veterinary from "../models/Veterinary.js";



const checkAuthentication = async (req, res, next) => {
    let token = req.headers.authorization;
    const response = {};

    if (token && token.startsWith("Bearer")) {
        token = token.split(" ")[1];
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            try {
                const loggedVet = await Veterinary.findById(decoded.id).select(   // Así es como: 1. Guardamos los datos en mi request para poder tener una "sesion" del usuario en el siguiente middleware; 2. Filtramos datos de una consulta con .select()
                    "-password -token -validatedUser"
                );

                if (loggedVet) {
                    req.loggedVet = loggedVet;
                    next();

                } else {
                    throw new Error("User not found")
                }
                
            } catch (error) {
                response.status = 500;
                response.message = error.message;
                
                res.status(response.status).json(response);    
            }
            

        } catch (error) {
            response.status = 403;
            response.message = "Invalid token";
            
            res.status(response.status).json(response);         
        }

    } else {
        response.status = 403;
        response.message = "Invalid or inexistent token";
        
        res.status(response.status).json(response);
    }   
}



export default checkAuthentication;