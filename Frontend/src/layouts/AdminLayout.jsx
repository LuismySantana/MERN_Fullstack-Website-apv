import useSession from "../hooks/useSession";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const AdminLayout = () => {

    const { isLogging, isSessionActive } = useSession();

    if (isLogging) {
        return (
            <main className='container mx-auto h-screen flex items-center justify-center'>
                    <Spinner />
            </main>
        )
    }


    return (
        <>
            { isSessionActive() ? (
                <main className='container mx-auto md:grid md:grid-cols-2 py-10 px-5 md:py-0 gap-10 min-h-screen items-center'>
                    <h1>Zona admin</h1>
                    <Outlet />
                </main>
            ) : (
                <Navigate to={"/"} />
            )}
        </>
    )
}

export default AdminLayout;