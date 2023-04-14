import { Link, useLocation } from "react-router-dom";
import useSession from "../hooks/useSession";



const Header = () => {

    const location = useLocation();
    const { sessionLogOut } = useSession();

    // Function to control current page for the nav buttons
    const isCurrentPage = (pagePath) => {
        return location.pathname === pagePath;
    }
    

    return (
        <header className="py-10 px-5 bg-indigo-600">
            <div className="container mx-auto flex justify-between items-center flex-col  gap-10 lg:flex-row lg:gap-0">
                <h1 className="font-bold text-2xl text-indigo-200 text-center">
                    APV - Administrador de Pacientes de {''}
                    <span className="text-white font-black tracking-wide">Veterinaria</span> 
                </h1>

                <nav className="flex flex-col gap-4 items-center lg:gap-4 lg:flex-row">
                    <Link to="/admin"
                        className={`text-white text-xl ${!isCurrentPage("/admin") && "opacity-60"} transition-opacity duration-300`}
                    >
                        Pacientes
                    </Link>
                    <Link to="/admin/profile"
                        className={`text-white text-xl ${!isCurrentPage("/admin/profile") && "opacity-60"} transition-opacity duration-300`}
                    >
                        Perfil
                    </Link>

                    <button
                        type="button"
                        className="py-1.5 px-2 mt-3 bg-white text-indigo-600 rounded font-bold hover:bg-indigo-300 hover:text-black transition-color duration-200 lg:ml-6 lg:mt-0"
                        onClick={sessionLogOut}
                    >
                        Cerrar sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}



export default Header;