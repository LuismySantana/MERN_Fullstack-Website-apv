import { useState } from "react"
import { Link } from "react-router-dom"



const ResetPasswordPage = () => {
	const [ emailReset, setEmailReset ] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("Enviando reset request...");
	}
	
	
	return (
		<>
			<div>
				<h1 className="mb-10 text-indigo-600 font-black text-5xl md:text-6xl text-center">
					Vamos a recuperar tu {""}
					<span className="text-black">Contraseña</span>
				</h1>
			</div>

			<div className="bg-white p-10 shadow-lg rounded-md">
				<form
					className="flex flex-col"
					onSubmit={handleSubmit}
				>
					<div className="mb-5">
						<label className="uppercase text-gray-600 block text-xl font-bold">
							Correo Electrónico:
							<input
								type="email"
								placeholder="Introduce tu email"
								className="border-2 rounded-md w-full p-3 mt-3 text-base font-normal bg-gray-50"
								value={emailReset}
								onChange={e => setEmailReset(e.target.value)}
							/>
						</label>
					</div>

					<input
						type="submit"
						value="Recuperar contraseña"
						className="w-full md:w-auto py-3 px-10 mt-10 block mx-auto rounded-md
                                bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
                                hover:bg-indigo-800 hover:cursor-pointer"
					/>
				</form>

				<nav
                    className="mt-10 text-center flex flex-col gap-2 text-gray-500"
                >
                    <p>
                        ¿Ya has recuperado tu contraseña? {""}
                        <Link
							className="font-bold text-indigo-500 transition-colors hover:text-indigo-700"
							to="/">Inicia sesión</Link>
                    </p>
                </nav>
			</div>
		</>
	)
}



export default ResetPasswordPage