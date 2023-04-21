import { useEffect } from "react";
import usePatients from "../hooks/usePatients";



const PatientsListComponent = () => {

	const { patientsList } = usePatients();


	return (
		<div>
			<ul>
				{ patientsList.map(patient =>
					 (
						<div
							key={patient._id}
							className="p-3 border mb-5"
						>
							<p>{patient.petName}</p>
						</div>
					)
				)}
			</ul>
		</div>
	)
}



export default PatientsListComponent;