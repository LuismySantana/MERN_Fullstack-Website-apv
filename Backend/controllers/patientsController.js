import Patient from "../models/Patient.js";



const myFunc = (req, res) => {
    res.json({
        msg: "Funcionan las rutas"
    })
}



export {
    myFunc
}