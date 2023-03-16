// Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

const registerVeterinary = (req, res) => {
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