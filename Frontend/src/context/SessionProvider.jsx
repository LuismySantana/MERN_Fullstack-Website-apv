/*
    ? Un context es básicamente crear un "contexto" para tu aplicación. Esto implica poder crear estados y funciones que se puedan recoger desde cualquier parte de la app independientemente del componente
    ? Para crear un context debermos hacer lo siguiente:
    ?   1- Crear un context con createContext()
    ?   2- Crear un proveedor de ese contexto (es decir, el que dará acceso al contexto al resto de partes de la app). Para eso creamos un "componente" que será el Provider del contexto y que tendrá de hijos al resto de la aplicación (todas las rutas pero DENTRO del router del buscador)
    ?   3- Para poder acceder a los datos del contexto hay diversas formas, la mejor es hacer un custom hook
    ?   4- En el value de Context provider especificamos QUÉ ELEMENTOS del contexto queremos hacer visibles a la aplicación. Luego con useContext (en nuestro hook) podremos acceder a todos los valores del Provider
    ?   5- Usamos el contexto mediante llamar a nuestro custom hook y recoger los elementos que nos hagan falta, con deconstructuring por ejemplo
*/

import { useState, useEffect, createContext } from "react";
import { getVetProfile } from "../utils";


const SessionContext = createContext();


const SessionProvider = ({children}) => {           //? Mediante el prop children recogemos todo aquello que este entre las llaves de abertura/cierre del componente. En este caso, las rutas con todos los componentes que queremos que tengan acceso al context

    const [ session, setSession ] = useState({});

    useEffect(() => {
        checkVetSessionToken();
        
    }, []);


    const checkVetSessionToken = () => {
        const sToken = localStorage.getItem("apv_sToken");

        if (sToken) {
            sessionLogIn(sToken);   
        }
    }
    
    const sessionLogIn = async (sToken) => {   
        console.log("Iniciando sesion...");
        try {
            const { vetProfile } = await getVetProfile(sToken);
            console.log( vetProfile );

            setSession(vetProfile);
            localStorage.setItem("apv_sToken", sToken);
            
        } catch (error) {
            console.log(error.response.data.message);
            sessionLogOut();
        }
    }

    const sessionLogOut = () => {
        console.log("Cerrando sesion...");

        setSession({});
        localStorage.removeItem("apv_sToken");
    }

    // TODO: Hacer en context funcion isSessionActive() para no acceder a la variable session publicamente


    return (
        <SessionContext.Provider
            value={{
                session,
                sessionLogIn,
                sessionLogOut
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}



//? De forma 'secundaria' exportamos el Provider para poder usarlo en nuestra raiz de la App y rodearla con el contexto
export {
    SessionProvider
}

//? Por defecto exportamos el contexto creado, ya que es a partir de este que podremos acceder a los elementos del context
export default SessionContext;