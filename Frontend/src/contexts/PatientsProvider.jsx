import { createContext, useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient';



const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {

    const [ patientsList, setPatientsList ] = useState([]);
    

    useEffect(() => {
        console.log("From patients context...");
    }, [])
    
    
    return (
        <PatientsContext.Provider
            value={{
                patientsList
            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}



export {
    PatientsProvider
}

export default PatientsContext;