import { useState } from "react";
import { Link } from "react-router-dom"
import FormWarning from "../components/FormWarning";
import { registerNewUser, isValidPassword } from "../utils";



const RegisterPage = () => {
	// Creamos un state para cada campo de tal forma que podamos controlarlos de forma independiente
	const [ userName, setUserName ] = useState("");
	const [ userEmail, setUserEmail ] = useState("");
	const [ userPassword, setUserPassword ] = useState("");
	const [ userPasswordRepeat, setUserPasswordRepeat ] = useState("");
	const [ warning, setWarning ] = useState(null);


	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([userName, userEmail, userPassword, userPasswordRepeat].includes("")) {
			setWarning({
				message: "Todos los campos son obligatorios",
				error: true
			});
			return;
		}
		
		if(userPassword !== userPasswordRepeat) {
			setWarning({
				message: "Las contraseñas deben ser iguales",
				error: true
			});
			return;
		}
		
		if (!isValidPassword(userPassword)) {
			setWarning({
				message: "La contraseña debe tener mínimo una letra, un número y 6 caracteres",
				error: true
			});
			return;
		}

		// Si todas las validaciones pasan...
		setWarning(null);

		try {
			await registerNewUser(userName, userEmail, userPassword);
			setWarning({
				message: "Registrado correctamente\nRevisa tu email",
				error: false
			});

			
		} catch (error) {
			setWarning({
				message: error.response?.data.message || error.message,
				error: true
			});
		}
	}
	
	
	return (
		<>
			<div>
				<h1 className=" w-fit mb-10 text-indigo-600 font-black text-5xl md:text-6xl text-center">
					Crea tu cuenta y Administra tus {""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>

			<div className="bg-white p-10 shadow-lg rounded-md">
							
				{ warning && (
					<FormWarning 
						warning={warning}
					/>
				)}
				
				<form
					className="flex flex-col"
					onSubmit={handleSubmit}
				>

					<div className="mb-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Nombre:
							<input
								type="text"
								placeholder="Introduce tu nombre"
								className="border-2 rounded-md w-full p-3 mt-3 text-base font-normal bg-gray-50"
								value={userName}
								onChange={e => setUserName(e.target.value.trim())}
							/>
						</label>
					</div>

					<div className="my-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Correo Electrónico:
							<input
								type="email"
								placeholder="Introduce tu email"
								className="border-2 rounded-md w-full p-3 mt-3 text-base font-normal bg-gray-50"
								value={userEmail}
								onChange={e => setUserEmail(e.target.value.trim())}
							/>
						</label>
					</div>

					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold"
						>
							Contraseña:
							<input
								type="password"
								placeholder="Introduce tu contraseña"
								className="border-2 rounded-md w-full p-3 mt-3 text-base font-normal bg-gray-50"
								value={userPassword}
								onChange={e => setUserPassword(e.target.value.trim())}
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
								value={userPasswordRepeat}
								onChange={e => setUserPasswordRepeat(e.target.value.trim())}
							/>
						</label>
					</div>

					<input
						type="submit"
						value="Crear cuenta"
						className="w-full md:w-auto py-3 px-10 mt-10 block mx-auto rounded-md
								bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
								hover:bg-indigo-800 hover:cursor-pointer"
					/>
				</form>

				<nav
                    className="mt-10 text-center flex flex-col gap-2 text-gray-500"
                >
                    <p>
                        ¿Ya tienes una cuenta? {""}
                        <Link
							className="font-bold text-indigo-500 transition-colors hover:text-indigo-700"
							to="/">Inicia sesión</Link>
                    </p>
                </nav>
			</div>
		</>
	)
}



export default RegisterPage