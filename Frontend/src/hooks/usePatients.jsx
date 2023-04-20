import { useContext } from "react";
import PatientsContext from "../contexts/PatientsProvider";



const usePatients = () => {
    return useContext(PatientsContext);
}

export default usePatients;