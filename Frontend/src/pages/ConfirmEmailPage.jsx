import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import FormWarning from "../components/FormWarning";
import Spinner from "../components/Spinner";
import { verifyAccount } from "../utils";

const ConfirmEmailPage = () => {
	const [ warning, setWarning ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);
	const { email, token } = useParams();

	useEffect(() => {
		const verifyHandler = async () => {
			try {
				const data = await verifyAccount(email, token);
				setWarning({
					message: data.message,
					error: false
				})
				
			} catch (error) {
				setWarning({
					message: error.response?.data.message || error.message,
					error: true
				})

			} finally {
				setIsLoading(false);
			}	
		};
		verifyHandler();

	}, []);
	
	return (
		<>
			<div>
				<h1 className=" w-fit mb-10 text-indigo-600 font-black text-5xl md:text-6xl text-center">
					Confirmar mi {""}
					<span className="text-black">Cuenta</span>
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
							
						<nav
							className="text-center flex flex-col gap-2 text-gray-500"
						>
							<Link
								className="w-full md:w-auto py-3 px-10 mt-10 block mx-auto rounded-md
									bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
									hover:bg-indigo-800 hover:cursor-pointer"
								to="/">Ir a Inicio</Link>
						</nav>
					</>
				)}

			</div>
		</>
	)
}



export default ConfirmEmailPage