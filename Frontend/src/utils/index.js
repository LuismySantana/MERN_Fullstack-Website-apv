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

    // Recuerda que async siempre devuelve una Promise. Si la peticion falla, como aqui no hay try/catch, se devuelve el reject de la promesa y se recoge en el catch de donde se llamó
}


const verifyAccount = async (email, token) => {
    const url = `http://127.0.0.1:4000/api/veterinaries/verify/${email}/${token}`;

    const { data } = await axios.get(url);
        
    return data;    
}


export {
    registerNewUser,
    verifyAccount
}