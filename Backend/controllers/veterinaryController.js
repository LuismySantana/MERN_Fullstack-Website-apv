// Recordemos que los controladores son el punto intermedio entre las vistas y los modelos. En el caso de una API, los controladores son accedidos a través de los endpoints, por eso se asignan al enrutamiento

const registerVeterinary = (req, res) => {
    res.send("Register a new veterinary")
};


const getVeterinaryProfile = (req, res) => {
    res.send("Get user profile")
};



export {
    registerVeterinary,
    getVeterinaryProfile
}