import { useState } from "react";
import usePatients from "../hooks/usePatients";



const PatientItem = ({ patient }) => {

    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
    
    const { setPatientToEdit, deletePatient } = usePatients();
    
    
    const { _id, petName, ownerName, ownerEmail, symptoms, dischargeDate } = patient;

    const formatDate = (date) => {
        return Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(date));    // Revisa Intl, pinta interesante
    }

    const handleDelete = (e) => {
        if (!deleteConfirmation) {
            setDeleteConfirmation(true);

        } else {
            deletePatient(_id);
        }
    }


    return (
        <li
            id={_id}
            className="p-5 mx-5 my-10 bg-white rounded-md shadow-md flex flex-col lg:flex-row"
        >
            <div className="lg:w-3/4 2xl:w-4/5">
                <p className="font-bold uppercase text-indigo-700 my-2">
                    Nombre:
                    <span className="font-normal normal-case ml-2 text-black">{petName}</span>
                </p>
                <p className="font-bold uppercase text-indigo-700 my-2">
                    Propietario:
                    <span className="font-normal normal-case ml-2 text-black">{ownerName}</span>
                </p>
                <p className="font-bold uppercase text-indigo-700 my-2">
                    Email:
                    <span className="font-normal normal-case ml-2 text-black">{ownerEmail}</span>
                </p>
                <p className="font-bold uppercase text-indigo-700 my-2">
                    Fecha de alta:
                    <span className="font-normal normal-case ml-2 text-black">{formatDate(dischargeDate)}</span>
                </p>
                <p className="font-bold uppercase text-indigo-700 my-2">
                    Síntomas:
                    <span className="font-normal normal-case ml-2 text-black">{symptoms}</span>
                </p>
            </div>

            <div className="lg:w-1/4 2xl:w-1/5 flex flex-wrap md:flex-nowrap lg:flex-col justify-center items-center gap-3 lg:gap-6 py-4 px-1">

                <button
                    type="button"
                    className="rounded text-white font-bold tracking-wide text-sm h-9 w-2/3 sm:w-1/3 min-w-fit md:w-full px-3
                    bg-indigo-700 hover:bg-indigo-800 transition-colors duration-300"
                    onClick={() => setPatientToEdit(patient) }
                >
                    Modificar    
                </button>
                
                <div className="flex rounded overflow-hidden w-2/3 sm:w-1/3 min-w-fit md:w-full border-2 border-red-700 h-9">
                    <button
                        type="button"
                        className={`text-white font-bold tracking-wide text-sm ${!deleteConfirmation ? "w-full" : "w-4/5"}
                        bg-red-700 hover:bg-red-800 transition-all duration-300`}
                        onClick={ handleDelete }
                    >
                        {!deleteConfirmation ? "Eliminar" : "Confirmar"}    
                    </button>

                    <button
                        type="button"
                        className={`font-bold text-sm ${!deleteConfirmation ? "w-0 opacity-0" : "w-1/5 opacity-100"} overflow-hidden
                        bg-white text-red-700 transition-all duration-300`}
                        onClick={() => deleteConfirmation && setDeleteConfirmation(false) }
                    >
                        X
                    </button>

                </div>
            </div>
        </li>
    )
}

export default PatientItem;