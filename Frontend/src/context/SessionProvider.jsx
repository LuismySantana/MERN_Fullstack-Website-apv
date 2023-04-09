/*
    ? Un context es básicamente crear un "contexto" para tu aplicación. Esto implica poder crear estados y funciones que se puedan recoger desde cualquier parte de la app independientemente del componente
    ? Para crear un context debermos hacer lo siguiente:
    ?   1- Crear un context con createContext()
    ?   2- Crear un proveedor de ese contexto (es decir, el que dará acceso al contexto al resto de partes de la app). Para eso creamos un "componente" que será el Provider del contexto y que tendrá de hijos al resto de la aplicación (todas las rutas pero DENTRO del router del buscador)
    ?   3- Para poder acceder a los datos del contexto hay diversas formas, la mejor es hacer un custom hook
    ?   4-
    ?
*/

import { useState, useEffect, createContext } from "react";



const SessionContext = createContext();

//? Mediante el prop children recogemos todo aquello que este entre las llaves de abertura/cierre del componente. En este caso, las rutas con todos los componentes que queremos que tengan acceso al context
const SessionProvider = ({children}) => {

    //? Aquí definiremos todos los estados y funciones del contexto

    const [ session, setSession ] = useState({});


    return (
        <SessionContext.Provider>
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