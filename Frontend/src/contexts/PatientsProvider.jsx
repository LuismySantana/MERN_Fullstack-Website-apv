import { createContext, useState, useEffect } from 'react';
import { getPatientsList, registerNewPatient } from '../utils';
import useSession from '../hooks/useSession'



const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {

    const [ patientsList, setPatientsList ] = useState([]);
    const [ arePatientsLoading, setArePatientsLoading ] = useState(true);

    const { session, isLogging } = useSession();

    useEffect(() => {
            if (session._id) { // Si hay sesión activa, cargamos la lista
                loadPatientsList();

            } else if (!isLogging) { // Ambos contextos se crean a la par, por tanto durante un x tiempo hay una sesion vacia porque se está cargando. En el primer useEffect ejecutado, esa sesion vacia haría que cortaramos el loader de pacientes. Para evitar un falso negativo, debemos esperar que tanto la sesion termine de cargar como que esté vacía para cortar la carga de pacientes
                setPatientsList([]);
                setArePatientsLoading(false);    
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
            setArePatientsLoading(true);
            const { patients } = await getPatientsList();

            setPatientsList(patients);
            
        } catch (error) {
            console.log(error.response?.data.message || error.message);
            setPatientsList([]);

        } finally {
            setArePatientsLoading(false);

        }
    }

    
    return (
        <PatientsContext.Provider
            value={{
                patientsList,
                saveNewPatient,
                arePatientsLoading
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