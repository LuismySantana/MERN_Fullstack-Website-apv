import usePatients from "../hooks/usePatients";
import Spinner from "./Spinner";



const PatientsListComponent = () => {

	const { patientsList, arePatientsLoading } = usePatients();

	// TODO: Hecho control de pantalla si no hay registros (Cuando los hay hay un mini pop del aviso de que NO hay, vamos a ver si podemos arreglarlo)



	if (arePatientsLoading) {
		return (
			<div className="w-full flex justify-center">
				<Spinner />
			</div>);
	}

	if (!patientsList.length) {
		return (
			<div className="w-full flex flex-col items-center gap-4 opacity-25 text-center">
				<h1 className="text-4xl font-bold">Aún no tienes <span className="font-black text-indigo-700">Pacientes</span> registrados</h1>
				<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-sad w-40 h-40 stroke-indigo-700" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					<circle cx="12" cy="12" r="9" />
					<line x1="9" y1="10" x2="9.01" y2="10" />
					<line x1="15" y1="10" x2="15.01" y2="10" />
					<path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
				</svg>
				<p className="text-2xl font-bold">Registra uno para empezar</p>
			</div>
		)
	}


	return (
		<ul>
			{ patientsList.map(patient =>
				<li
					key={patient._id}
					className="p-3 border mb-5"
				>
					<p>{patient.petName}</p>
				</li>
			)}
		</ul>
	)
}



export default PatientsListComponent;