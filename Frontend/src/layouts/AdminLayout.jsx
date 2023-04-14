import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useSession from "../hooks/useSession";
import Header from "../components/Header";
import Footer from "../components/Footer";



const AdminLayout = () => {

	const { session, isLogging } = useSession();

	if (isLogging) {
		return (
			<main className='container mx-auto h-screen flex items-center justify-center'>
				<Spinner />
			</main>
		)
	}

	if (!session._id) { //session siempre existe como objeto vacío (como mínimo), por tanto llamar a su referencia nunca fallará. _id es un primitivo, si no existe resultará en undefined (falsy)
		return (
			<Navigate to={"/"} />
		)
	}

	return (
		<>
			<Header />
			<main className='container mx-auto mt-10'>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}



export default AdminLayout;