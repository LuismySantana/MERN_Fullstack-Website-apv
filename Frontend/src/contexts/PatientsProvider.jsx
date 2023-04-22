import { createContext, useState, useEffect } from 'react';
import { getPatientsList, registerNewPatient } from '../utils';
import useSession from '../hooks/useSession'



const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {

    const [ patientsList, setPatientsList ] = useState([]);

    const { session } = useSession();

    useEffect(() => {
        if (session._id) {
            loadPatientsList();

        } else {
            setPatientsList([]);
        }    
    }, [session]);


    const saveNewPatient = async (patient) => {
        try {
            // Guardamos el paciente en BBDD
            const { savedPatient } = await registerNewPatient(patient);

            // Guardamos el paciente en el state del context
            // const { createdAt, updatedAt, __v, ...newPatientData } = savedPatient; // --> Truco para crear un nuevo objeto donde EXTRAEMOS información quitando campos en newPatientData <-> Comentado porque he decidido filtrarlo con una funcion de schema

            setPatientsList([savedPatient, ...patientsList]);
            

        } catch (error) {
            console.error(error.response?.data.message ?? error.message);
        }
    }

    const loadPatientsList = async () => {
        try {
            const { patients } = await getPatientsList();
            setPatientsList(patients);
            
        } catch (error) {
            console.log(error.response?.data.message || error.message);
            setPatientsList([]);
        }
    }

    
    return (
        <PatientsContext.Provider
            value={{
                patientsList,
                saveNewPatient
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