import axiosClient from "../config/axiosClient";



// ----- Veterinaries -----

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

const validatePasswordResetToken = async (email, token) => {
    const url = `/veterinaries/password-reset/${email}/${token}`;

    await axiosClient.get(url);
}

const resetPassword = async (email, token, password) => {
    const url = "/veterinaries/password-reset/reset";

    const { data } = await axiosClient.post(url, {
        email,
        token,
        password
    });

    return data;
}

const isValidPassword = (password) => {
    var passwordRegex = new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})`); // Minimo una letra, un numero y 6 digitos
    return passwordRegex.test(password);
}

const userLogin = async (email, password) => {
    const url = "/veterinaries/login";

    const { data } = await axiosClient.post(url, {
        email,
        password
    });

    return data;
}

const getVetProfile = async (sToken) => {
    const url = "/veterinaries/profile";

    // Para añadir la autorizacion Bearer reescribimos el header de la peticion
    const config = {
        headers: {
            "Contet-Type": "application/json",
            "Authorization": `Bearer ${sToken}`
        }
    }

    const { data } = await axiosClient.get(url, config);

    return data;
}


// ----- Patients -----

const registerNewPatient = async (patient) => {
    const url = "/patients";

    const sToken = localStorage.getItem("apv_sToken");

    const config = {
        headers: {
            "Contet-Type": "application/json",
            "Authorization": `Bearer ${sToken}`
        }
    }

    const { data } = await axiosClient.post(url,  patient, config);

    return data;
}

const getPatientsList = async () => {
    const url = `/patients`;

    const sToken = localStorage.getItem("apv_sToken");

    const config = {
        headers: {
            "Contet-Type": "application/json",
            "Authorization": `Bearer ${sToken}`
        }
    }

    const { data } = await axiosClient.get(url, config);

    return data;
}

const editPatientRequest = async (id, patientData) => {

    const url = `/patients/${id}`;

    const sToken = localStorage.getItem("apv_sToken");

    const config = {
        headers: {
            "Contet-Type": "application/json",
            "Authorization": `Bearer ${sToken}`
        }
    }

    const { data } = await axiosClient.put(url, patientData, config);

    return data;
}

const deletePatientRequest = async (id) => {
    const url = `/patients/${id}`;

    const sToken = localStorage.getItem("apv_sToken");

    const config = {
        headers: {
            "Contet-Type": "application/json",
            "Authorization": `Bearer ${sToken}`
        }
    }

    const { data } = await axiosClient.delete(url, config);

    return data; // TODO: Esto restorna un msg de aviso pero mira a ver si te hace falta o que
}



export {
    registerNewUser,
    verifyAccount,
    resetPasswordRequest,
    validatePasswordResetToken,
    isValidPassword,
    resetPassword,
    userLogin,
    getVetProfile,
    registerNewPatient,
    getPatientsList,
    editPatientRequest,
    deletePatientRequest
}