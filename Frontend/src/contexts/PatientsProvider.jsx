import { createContext, useState, useEffect } from 'react'



const PatientsContext = createContext();

const PatientsProvider = ({ children }) => {
    return (
        <PatientsContext.Provider
            value={{

            }}
        >
            {children}
        </PatientsContext.Provider>
    )
}



export {
    PatientsProvider
}

export default PatientsContext;