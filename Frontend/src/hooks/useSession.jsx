//? Custom hook para acceder a sessionContext

import { useContext } from "react";
import SessionContext from "../contexts/SessionProvider";



const useSession = () => {
    return useContext(SessionContext); // Este hook es basicamente apra poder recoger luego los elementos del context llamando solo a useSession y no useContext(SessionContext) (usaremos un import en vez de dos)
}



export default useSession;