import PatientForm from "../components/PatientForm";
import PatientsList from "../components/PatientsList";

const AdminPacientsPage = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 lg:w-2/5">
                <PatientForm />
            </div>
            
            <div className="w-full md:w-1/2 lg:w-3/5">
                <PatientsList />
            </div>
        </div>
    )
}

export default AdminPacientsPage;