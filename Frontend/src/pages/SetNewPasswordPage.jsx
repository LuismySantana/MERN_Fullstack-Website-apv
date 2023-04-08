import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { validatePasswordResetToken, isValidPassword } from "../utils";
import Spinner from "../components/Spinner";
import FormWarning from "../components/FormWarning";



const SetNewPasswordPage = () => {
	const [ newPassword, setNewPassword ] = useState("");
	const [ newPasswordRepeat, setNewPasswordRepeat ] = useState("");
	const [ isLoading, setIsLoading ] = useState(true);
	const [ warning, setWarning ] = useState(null);

	const { email, token } = useParams();

	const goTo = useNavigate();


	useEffect(() => {
		const validateResetToken = async () => {

			try {
				await validatePasswordResetToken(email, token);
				
			} catch (error) {
				console.log(error.response?.data.message || error.message)
				goTo("/reset-password");

			} finally {
				setIsLoading(false);
			}
			
		}
		validateResetToken();
		
	}, []);


	const handleSubmit = (e) => {
		e.preventDefault();

		if ([newPassword, newPasswordRepeat].includes("")) {
			setWarning({
				message: "Todos los campos son obligatorios",
				error: true
			});
			return;
		}
		
		if(newPassword !== newPasswordRepeat) {
			setWarning({
				message: "Las contraseñas deben ser iguales",
				error: true
			});
			return;
		}
		
		if (!isValidPassword(newPassword)) {
			setWarning({
				message: "La contraseña debe tener mínimo una letra, un número y 6 caracteres",
				error: true
			});
			return;
		}

		setWarning(null);
		console.log("Change pwd");
	}
	

	return (
		<>
			<div>
				<h1 className="mb-10 text-indigo-600 font-black text-5xl md:text-6xl text-center">
					Establece tu nueva {""}
					<span className="text-black">Contraseña</span>
				</h1>
			</div>

			<div className="bg-white p-10 shadow-lg rounded-md">

				{isLoading ? (
					<Spinner />
				):(
					<form
						className="flex flex-col"
						onSubmit={handleSubmit}
					>

						{warning && (
							<FormWarning 
								warning={warning}
							/>
						)}

						<div className="mb-5">
							<label
								className="uppercase text-gray-600 block text-xl font-bold"
							>
								Nueva Contraseña:
								<input
									type="password"
									placeholder="Introduce tu contraseña"
									className="border-2 rounded-md w-full p-3 mt-3 text-base font-normal bg-gray-50"
									value={newPassword}
									onChange={e => setNewPassword(e.target.value)}
								/>
							</label>
						</div>

						<div className="my-5">
							<label
								className="uppercase text-gray-600 block text-xl font-bold"
							>
								Repite tu contraseña:
								<input
									type="password"
									placeholder="Repite tu contraseña"
									className="border-2 rounded-md w-full p-3 mt-3 text-base font-normal bg-gray-50"
									value={newPasswordRepeat}
									onChange={e => setNewPasswordRepeat(e.target.value)}
								/>
							</label>
						</div>

						<input
							type="submit"
							value="Restablecer contraseña"
							className="w-full md:w-auto py-3 px-10 mt-10 block mx-auto rounded-md
									bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
									hover:bg-indigo-800 hover:cursor-pointer"
						/>
					</form>
				)}

			</div>
		</>
	)
}



export default SetNewPasswordPage