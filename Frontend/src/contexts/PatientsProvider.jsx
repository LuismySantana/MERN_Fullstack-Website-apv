import { createContext, useState, useEffect } from 'react';
import { getPatientsList, registerNewPatient } from '../utils';



const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {

    const [ patientsList, setPatientsList ] = useState([]);


    useEffect(() => {
        const loadPatientsList = async () => {

            try {
                const { patients } = await getPatientsList();
                setPatientsList(patients);
                
            } catch (error) {
                console.log(error.response?.data.message || error.message);
                setPatientsList([]);
            }

        }
        loadPatientsList();
    }, [])


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