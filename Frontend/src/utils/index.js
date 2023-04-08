import axiosClient from "../config/axiosClient";



const registerNewUser = async (userName, userEmail, userPassword) => {
    const url = `/veterinaries/register`;

    await axiosClient.post(
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
    const url = `/veterinaries/verify/${email}/${token}`;

    const { data } = await axiosClient.get(url);
        
    return data;    
}

const resetPasswordRequest = async (email) => {
    const url = `/veterinaries/password-reset`;

    const { data } = await axiosClient.post(url, {
        email
    });
        
    return data;    
}



export {
    registerNewUser,
    verifyAccount,
    resetPasswordRequest
}