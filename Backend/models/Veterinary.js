import mongoose from "mongoose";

// Así definimos la estructura de datos de nuestro Modelo, es decir, su esquema (mongoDB ya añade un id, no hace falta añadirlo en el modelo)
const veterinarySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    website: {
        type: String,
        default: null,
        trim: true
    },
    token: {

    },
    validatedUser: {
        type: Boolean,
        default: false
    }
    
});


// Usamos el esquema para definir un modelo (se recomienda ponerle a la variable el mismo nombre que el modelo)
const Veterinary = mongoose.model("Veterinary", veterinarySchema);

export default Veterinary;