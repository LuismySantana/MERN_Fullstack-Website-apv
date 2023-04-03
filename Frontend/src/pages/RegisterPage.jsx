import { Link } from "react-router-dom"



const RegisterPage = () => {
	return (
		<>
			<div>
				<h1 className=" w-fit mb-10 text-indigo-600 font-black text-5xl md:text-6xl text-center md:text-left">
					Crea tu cuenta y Administra tus {""}
					<span className="text-black">Pacientes</span>
				</h1>
			</div>

			<div className="bg-white p-5 shadow-lg rounded-md">
				<form
					action=""
					className="flex flex-col"
				>
					<div className="my-5">
						<label
							htmlFor="register_name"
							className="uppercase text-gray-600 block text-xl font-bold"
						>
							Nombre:
						</label>
						<input
							type="text"
							placeholder="Introduce tu nombre"
							className="border-2 rounded-md w-full p-3 mt-3 bg-gray-50"
							id="register_name"
						/>
					</div>

					<div className="my-5">
						<label
							htmlFor="register_email"
							className="uppercase text-gray-600 block text-xl font-bold"
						>
							Correo Electrónico:
						</label>
						<input
							type="email"
							placeholder="Introduce tu email"
							id="register_email"
							className="border-2 rounded-md w-full p-3 mt-3 bg-gray-50"
						/>
					</div>

					<div className="my-5">
						<label
							htmlFor="register_password"
							className="uppercase text-gray-600 block text-xl font-bold"
						>
							Contraseña:
						</label>
						<input
							type="password"
							placeholder="Introduce tu contraseña"
							id="register_password"
							className="border-2 rounded-md w-full p-3 mt-3 bg-gray-50"
						/>
					</div>

					<div className="my-5">
						<label
							htmlFor="register_password_repeat"
							className="uppercase text-gray-600 block text-xl font-bold"
						>
							Repite tu contraseña:
						</label>
						<input
							type="password"
							placeholder="Repite tu contraseña"
							id="register_password_repeat"
							className="border-2 rounded-md w-full p-3 mt-3 bg-gray-50"
						/>
					</div>

					<input
						type="submit"
						value="Crear cuenta"
						id="register_submit"
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
                        <Link to="/" className="font-bold text-indigo-500 transition-colors hover:text-indigo-700">Inicia sesión</Link>
                    </p>
                </nav>
			</div>
		</>
	)
}



export default RegisterPage