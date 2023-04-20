import { useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientsList from "../components/PatientsList";

const AdminPacientsPage = () => {

	const [ formVisible, setFormVisible ] = useState(false);

    
    return (
        <div className="flex flex-col items-center md:flex-row md:items-start px-3">
            
            <button 
                type="button"
                className="py-3 px-10 mt-5 mb-10 w-fit rounded-md md:hidden
                    bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300 cursor-pointer
                    hover:bg-indigo-800"
                onClick={() => { setFormVisible(!formVisible) }}
            >
                {!formVisible ? "Mostrar " : "Ocultar "}
                formulario
            </button>
            
            <div className={`${formVisible ? "block" : "hidden"} md:block w-full md:w-1/2 lg:w-2/5`}>
                <PatientForm />
            </div>
            
            <div className="w-full md:w-1/2 lg:w-3/5">
                <PatientsList />
            </div>
        </div>
    )
}

export default AdminPacientsPage;