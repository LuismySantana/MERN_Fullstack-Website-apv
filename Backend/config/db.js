//? Para poder acceder a la BBDD usaremos un ORM (Object Relational Mapping) de Mongo llamado Mongoose

import mongoose from "mongoose";


const dbConnect = async () => {
    try {
        const db = await mongoose.connect( // Como hacemos la conexion a mongoose directamente, es una instancia de conexion global. Es decir que siempre que referencie a mongoose será a la conexion creada. La varaible de db se recoge solo para mostrar datos de la conexion
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${db.connection.host}:${db.connection.port}`;
        console.log("MongoDB connected in: " + url);
        
    } catch (error) {
        console.error("Error: " + error.message);
        process.exit(1); // process es una varaible interna de Node que da informacion del proceso de Node en ejecución. Con .exit cerramos ese proceso (El param en 1 implica que el exit se debe a un error fatal)

    }
}

export default dbConnect;