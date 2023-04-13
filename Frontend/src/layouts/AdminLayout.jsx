import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useSession from "../hooks/useSession";



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
        <main className='container mx-auto md:grid md:grid-cols-2 py-10 px-5 md:py-0 gap-10 min-h-screen items-center'>
            <h1>Zona admin</h1>
            <Outlet />
        </main>
    )
}



export default AdminLayout;