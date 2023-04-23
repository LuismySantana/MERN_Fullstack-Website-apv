import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateToken from "../helpers/generateToken.js";



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
        type: String,
        default: generateToken()

    },
    validatedUser: {
        type: Boolean,
        default: false
    }
});


//En los schemas podemos añadir los hooks pre/post para añadir acciones a los datos (coomo hashear la password previo a guardar el registro). Revisa la doc de mongoose para + info | Debemos usar function() porque usaremos this y recuerda que en las AF this referencia a la ventana global, no al scope actual
veterinarySchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next(); // Este hook de .pre() es un middleware. Por tanto este next implica pasar al siguiente middleware de la ejecución saltandose el hasheo (para cuando se modifiquen datos de usuario PERO sin modificar la contraseña o se enciptaria algo ya encriptado)
    }

    const salt = await bcrypt.genSalt(10); // Generamos la sal del hasheo, basicamente indica la cantidad de encriptaciones que tendrá el password 
    this.password = await bcrypt.hash(this.password, salt);


});


// Asi creamos metodos especificos para el modelo
veterinarySchema.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

veterinarySchema.methods.getSessionData = function() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        website: this.website,
        __v: this.__v
    };
}


// Usamos el esquema para definir un modelo (se recomienda ponerle a la variable el mismo nombre que el modelo)
const Veterinary = mongoose.model("Veterinary", veterinarySchema, "veterinaries"); // Si no especificas la coleccion (3º param), mongoose enlazara el modelo a una coleccion con el nombre en plural (de forma auto el colega to pro, spongo que solo en ingles) del nombre que ponemos al model



export default Veterinary;