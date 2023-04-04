import axios from "axios";



const registerNewUser = async (userName, userEmail, userPassword) => {
    const url = "http://127.0.0.1:4000/api/veterinaries/register";

    await axios.post(
        url,
        {
            name: userName,
            email: userEmail,
            password: userPassword
        }
    );

    // Recuerda que async siempre devuelve una Promise, si la peticion falla como aqui no hay tru/catch, se devuelve el reject de la promesa y se recoge en el catch de donde se llamó
}



export {
    registerNewUser
}