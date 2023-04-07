// Esta es una manera de hacer un cliente de axios con diversas configuraciones por defecto para las llamadas a API's

import axios from "axios";



const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});



export default axiosClient; 