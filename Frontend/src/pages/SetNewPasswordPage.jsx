import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { validatePasswordResetToken, isValidPassword, resetPassword } from "../utils";
import Spinner from "../components/Spinner";
import FormWarning from "../components/FormWarning";



const SetNewPasswordPage = () => {
	const [ newPassword, setNewPassword ] = useState("");
	const [ newPasswordRepeat, setNewPasswordRepeat ] = useState("");
	const [ isLoading, setIsLoading ] = useState(true);
	const [ changedPassword, setChangedPassword ] = useState(false);
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


	const handleSubmit = async (e) => {
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
		setIsLoading(true);

		try {
			await resetPassword(email, token, newPassword);
			setWarning({
				message: "Contraseña modificada correctamente",
				error: false
			});
			setChangedPassword(true); // Si se modifico el password correctamente mostramos aviso y boton de volver a inicio

		} catch (error) {
			setWarning({
				message: error.response?.data.message || error.message,
				error: true
			});

		} finally {
			setIsLoading(false);
		}

		// TODO: 1.Terminar cambiado de contraseña (Falta hacer la api call y controlar el resultado) - Verificar caso de cambio de token/borrado de mail DURANTE el cambio de pwd. Revisa los msg y luego borra
		// TODO: 2.Cambiar las queries de password reset, puedes hacerlas con token + email en vez de solo email
		// TODO: 3.Los email son case sensitive, modificalos en todos lados del back para hacerlos insensitive
		// TODO: 4.Realizar el modificado de password
		// TODO: 5. Cambiar los warnings a ponerlos fuera de los form, justo encima
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
					<>
						{warning && (
							<FormWarning 
								warning={warning}
							/>
						)}

						{!changedPassword ? (
							<form
								className="flex flex-col"
								onSubmit={handleSubmit}
							>

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
							
						):(
							<nav
								className="text-center flex flex-col gap-2 text-gray-500"
							>
								<Link
									className="w-full md:w-auto py-3 px-10 mt-10 block mx-auto rounded-md
										bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
										hover:bg-indigo-800 hover:cursor-pointer"
									to="/">Ir a Inicio</Link>
							</nav>
						)}
					</>

				)}

			</div>
		</>
	)
}



export default SetNewPasswordPage