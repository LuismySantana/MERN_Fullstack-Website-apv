import { useEffect, useState } from "react";
import FormWarning from "./FormWarning";
import usePatients from "../hooks/usePatients";


const PatientForm = () => {

	const [ petName, setPetName ] = useState("");
	const [ ownerName, setOwnerName ] = useState("");
	const [ ownerEmail, setOwnerEmail ] = useState("");
	const [ symptoms, setSymptoms ] = useState("");
	const [ dischargeDate, setDischargeDate ] = useState(() => getFormatedDate());

	const [ warning, setWarning ] = useState(null);

	const { saveNewPatient, patientToEdit, setPatientToEdit } = usePatients();


	useEffect(() => {
		if (patientToEdit) {
			setPetName(patientToEdit.petName);
			setOwnerName(patientToEdit.ownerName);
			setOwnerEmail(patientToEdit.ownerEmail);
			setSymptoms(patientToEdit.symptoms);
			setDischargeDate(getFormatedDate(patientToEdit.dischargeDate));
			setWarning(null);
		}
	}, [patientToEdit])
	

	function getFormatedDate(date = null) { // No es una AF porque recordemos el Hoisting, me petaría
		date = date ? new Date(date) : new Date(); 

		return date.toISOString().split('T')[0];
	}

	const handleEndEdition = () => {
		setPatientToEdit(null);
		setPetName("");
		setOwnerName("");
		setOwnerEmail("");
		setSymptoms("");
		setDischargeDate(getFormatedDate());
		setWarning(null);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([petName, ownerName, ownerEmail, symptoms, dischargeDate].includes("")) {
			setWarning({
				message: "Todos los campos son obligatiorios",
				error: true
			});
			return;
		}
		

		setWarning(null);

		if (!patientToEdit) {
			// TODO: Meter un try/catch y quitarlo de la funcion de PatientsProvider
			saveNewPatient({petName, ownerName, ownerEmail, symptoms, dischargeDate});
			setWarning({
				message: "Paciente registrado correctamente",
				error: false
			});

		} else {
			// TODO: Hacer la funcion de edit en PatientsProvider y llamarla aquí con un try/catch
			console.log("Editando...");
		}
	}
	
	
	return (
		<>
			<p className="text-lg text-center mb-10 font-bold">
				Añade tus pacientes y {""}
				<span className=" text-indigo-600 font-black">Adminístralos</span>
			</p>

			<form
				className="bg-white py-10 px-6 mb-10 lg:mb-0 shadow-md rounded-md"
				onSubmit={handleSubmit}
			>
				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold pl-1"
					>
						<span className="pl-1">Mascota:</span>
						<input
							type="text"
							placeholder="Nombre de la mascota"
							className="border-2 rounded-md w-full p-2 mt-2 font-normal placeholder-gray-400"
							value={petName}
							onChange={e => setPetName(e.target.value)}
						/>
					</label>
				</div>

				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold pl-1"
					>
						<span className="pl-1">Propietario:</span>
						<input
							type="text"
							placeholder="Nombre del propietario"
							className="border-2 rounded-md w-full p-2 mt-2 font-normal placeholder-gray-400"
							value={ownerName}
							onChange={e => setOwnerName(e.target.value)}
						/>
					</label>
				</div>

				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold pl-1"
					>
						<span className="pl-1">Email:</span>
						<input
							type="email"
							placeholder="Email del propietario"
							className="border-2 rounded-md w-full p-2 mt-2 font-normal placeholder-gray-400"
							value={ownerEmail}
							onChange={e => setOwnerEmail(e.target.value)}
						/>
					</label>
				</div>

				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold pl-1"
					>
						<span className="pl-1">Fecha de alta:</span>
						<input
							type="date"
							className="border-2 rounded-md w-full p-2 mt-2 font-normal placeholder-gray-400 text-center"
							value={dischargeDate}
							onChange={e => setDischargeDate(e.target.value)}
						/>
					</label>
				</div>

				<div className="mb-5">
					<label
						className="block text-gray-700 uppercase font-bold pl-1"
					>
						<span className="pl-1">Síntomas:</span>
						<textarea
							placeholder="Descripción de los síntomas de la mascota:"
							className="border-2 rounded-md w-full px-3 py-2 mt-2 font-normal placeholder-gray-400 h-60 resize-none"
							value={symptoms}
							onChange={e => setSymptoms(e.target.value)}
						/>
					</label>
				</div>
				
				{warning && (
					<FormWarning
						warning={warning}
					/>
				)}

				<div className="w-full mt-10 flex flex-wrap justify-center gap-5">
					<input
						type="submit"
						value={!patientToEdit ? "Añadir paciente" : "Editar paciente"}
						className="w-fit py-3 px-5 sm:px-10 rounded-md
								bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300 cursor-pointer
								hover:bg-indigo-800"
					/>
					
					{patientToEdit && (
						<button
							type="button"
							className="w-fit py-3 px-5 rounded-md
									bg-red-700 text-white uppercase font-bold tracking-wide transition-colors duration-300 cursor-pointer
									hover:bg-red-800"
							onClick={ handleEndEdition }
						>
							X
						</button>
					)}
				</div>
			</form>
		</>
	)
}



export default PatientForm;