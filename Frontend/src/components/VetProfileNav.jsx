import { Link, useLocation } from "react-router-dom"



const VetProfileNav = () => {

    const location = useLocation();

    // Function to control current page for the nav buttons
    const isCurrentPage = (pagePath) => {
        return location.pathname === pagePath;
    }


    return (
        <div className="flex gap-6 mx-auto w-fit mb-10">
            <Link
                to={"/admin/profile"}
                className={`py-1 px-3 border-indigo-700 ${isCurrentPage("/admin/profile") ? "font-bold border-b-2 pointer-events-none" : "hover:border-b-2"}`}

            >
                Mis datos
            </Link>

            <Link
                to={"/admin/change-password"}
                className={`py-1 px-3 border-indigo-700 ${isCurrentPage("/admin/change-password") ? "font-bold border-b-2 pointer-events-none" : "hover:border-b-2"}`}

            >
                Cambiar contraseña
            </Link>
        </div>
    )
}

export default VetProfileNav