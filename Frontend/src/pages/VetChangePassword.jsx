import { useState } from "react";
import VetProfileNav from "../components/VetProfileNav";
import FormWarning from "../components/FormWarning";
import { changeVeterinaryPassword, isValidPassword } from "../utils";
import useSession from "../hooks/useSession";



const VetChangePassword = () => {

	const [ warning, setWarning ] = useState(null);
	const [ password, setPassword ] = useState("");
	const [ newPassword, setNewPassword ] = useState("");
	const [ newPasswordRepeat, setNewPasswordRepeat ] = useState("");

	const { session } = useSession();


	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([password.trim(), newPassword.trim(), newPasswordRepeat.trim()].includes("")) {
			setWarning({
				message: "Todos los campos son obligatorios",
				error: true
			})
			return;
		}

		if (newPassword !== newPasswordRepeat) {
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

		// Debemos revisar que la contraseña actual sea correcta, que la contraseña nueva NO SEA IGUAL A LA ACTUAL y que se guarde si to gucci
		// console.log("Cambiar contraseña....");

		try {
			const { message } =
				await changeVeterinaryPassword({
					password: password.trim(),
					newPassword: newPassword.trim(),
					id: session._id
				});
			setWarning({
				message: message,
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
			<VetProfileNav />

			<h2 className=" font-black text-2xl text-center">Cambiar contraseña</h2>
			<p className="text-lg text-center mt-5 mb-10 font-bold">
				Vamos a modificar {""}
				<span className=" text-indigo-600">tu contraseña</span>
			</p>


			<div className="flex justify-center">
				<div className="w-full md:w-1/2 bg-white shadow rounded-md p-5">

					{warning && (
						<FormWarning
							warning={warning}
						/>
					)}

					<form
						onSubmit={handleSubmit}
					>

						<div className="my-3">
							<label
								className="block text-gray-700 uppercase font-bold pl-1"
							>
								<span className="pl-1">Contraseña actual:</span>
								<input
									type="password"
									className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50"
									value={ password }
									onChange={ e => setPassword(e.target.value) }
								/>
							</label>
						</div>

						<div className="my-3">
							<label
								className="block text-gray-700 uppercase font-bold pl-1"
							>
								<span className="pl-1">Nueva contraseña:</span>
								<input
									type="password"
									className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50"
									value={ newPassword }
									onChange={ e => setNewPassword(e.target.value) }
								/>
							</label>
						</div>

						<div className="my-3">
							<label
								className="block text-gray-700 uppercase font-bold pl-1"
							>
								<span className="pl-1">Repite la contraseña:</span>
								<input
									type="password"
									className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50"
									value={ newPasswordRepeat }
									onChange={ e => setNewPasswordRepeat(e.target.value) }
								/>
							</label>
						</div>

						<input
							type="submit"
							value="Cambiar contraseña"
							className="w-full md:w-auto py-3 px-10 mt-7 mb-2 block mx-auto rounded-md
                                    bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
                                    hover:bg-indigo-800 hover:cursor-pointer"
						/>

					</form>
				</div>
			</div>
		</>
	)
}

export default VetChangePassword;