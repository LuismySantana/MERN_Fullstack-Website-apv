import usePatients from "../hooks/usePatients";



const PatientItem = ({ patient }) => {

    const { setPatientToEdit } = usePatients();
    
    
    const { _id, petName, ownerName, ownerEmail, symptoms, dischargeDate } = patient;

    const formatDate = (date) => {
        return Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date(date));    // Revisa Intl, pinta interesante
    }


    return (
        <li
            id={_id}
            className="p-5 mx-5 my-10 bg-white rounded-md shadow-md flex flex-col lg:flex-row"
        >
            <div className=" lg:w-4/5">
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

            <div className="lg:w-1/5 flex lg:flex-col justify-center items-center gap-6 py-4 px-1">
                <button
                    type="button"
                    className="rounded px-3 py-2 text-white font-bold tracking-wide text-sm w-1/4 min-w-fit md:w-full
                    bg-indigo-700 hover:bg-indigo-800 transition-colors duration-300"
                    onClick={() => setPatientToEdit(patient) }
                >
                    Modificar    
                </button>
                <button
                    type="button"
                    className="rounded px-3 py-2 text-white font-bold tracking-wide text-sm w-1/4 min-w-fit md:w-full 
                    bg-red-700 hover:bg-red-800 transition-colors duration-300"
                >
                    Eliminar    
                </button>
            </div>
        </li>
    )
}

export default PatientItem;