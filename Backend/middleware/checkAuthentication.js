import jwt from "jsonwebtoken";



const checkAuthentication = (req, res, next) => {
    console.log("Desde mi middleware custom");
    next();
    
}



export default checkAuthentication;