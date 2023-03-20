import jwt from "jsonwebtoken";



const generateJWT = (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d" // Podemos generar una expiry date de estaforma, para ver la nomenclacura de las opciones de tiempo mira la doc de JWT API
        }
        )
}



export default generateJWT;