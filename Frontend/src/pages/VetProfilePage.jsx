import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import VetProfileNav from "../components/VetProfileNav";
import FormWarning from "../components/FormWarning";


const VetProfilePage = () => {

    // Hasta ahora hecmos hecho un state por cada input. Vamos a ver cómo podríamos hacerlo con un objeto
    const [ profileData, setProfileData ] = useState({});
    const [ warning, setWarning ] = useState(null);

    const { session, updateUserData } = useSession();


    useEffect(() => {
        setProfileData(session)
    }, [session]);


    const handleChange = (property, value) => {
        setProfileData({
            ...profileData,
            [property]: value // Mediante esta sintaxis podemos escribir un atributo a un objeto con un nombre pasado por String (al igual que cuando se recoge de la misma manera) || Se podría hacer también con un name y pasar de param solo el event pero lo prefiero así
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(profileData.name.trim() === "" || profileData.email.trim() === "") {
            setWarning({
                message: "El nombre y el email son obligatorios",
                error: true
            });
            return;
        }


        setWarning(null);
        try {
            const message = await updateUserData(profileData);
            setWarning({
                message: message,
                error: false
            });
        } catch (error) {
            setWarning({
                message: error.response?.data.message || error.message,
                error: true
            });
        }
    }
    

    return (
        <>
            <VetProfileNav />

            <h2 className=" font-black text-2xl text-center">Mis datos</h2>
            <p className="text-lg text-center mt-5 mb-10 font-bold">
                Revisa tu {""}
                <span className=" text-indigo-600">perfil</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-md p-5">
                    
                    { warning && (
                        <FormWarning
                            warning={warning}
                        />
                    )}

                    <form 
                        onSubmit={handleSubmit}
                    >

                        <div className="my-3">
                            <label
                                className="block text-gray-700 uppercase font-bold pl-1"
                            >
                                <span className="pl-1">Nombre:</span>
                                <input
                                    type="text"
                                    className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50 placeholder-gray-400"
                                    placeholder="Añade tu nombre"
                                    value={ profileData.name || "" }
                                    onChange={ e => handleChange("name", e.target.value) }
                                />
                            </label>
                        </div>

                        <div className="my-3">
                            <label
                                className="block text-gray-700 uppercase font-bold pl-1"
                            >
                                <span className="pl-1">Web:</span>
                                <input
                                    type="url"
                                    className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50 placeholder-gray-400"
                                    placeholder="Añade tu página web"
                                    value={ profileData.website || "" }
                                    onChange={ e => handleChange("website", e.target.value) }
                                />
                            </label>
                        </div>

                        <div className="my-3">
                            <label
                                className="block text-gray-700 uppercase font-bold pl-1"
                            >
                                <span className="pl-1">Teléfono:</span>
                                <input
                                    type="tel"
                                    pattern="[0-9]{9}"
                                    className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50 placeholder-gray-400"
                                    placeholder="Añade tu teléfono"
                                    value={ profileData.phone || "" }
                                    onChange={ e => handleChange("phone", e.target.value) }
                                />
                            </label>
                        </div>

                        <div className="my-3">
                            <label
                                className="block text-gray-700 uppercase font-bold pl-1"
                            >
                                <span className="pl-1">Email:</span>
                                <input
                                    type="email"
                                    className="border-2 rounded-md w-full p-2 mt-2 font-normal bg-gray-50 placeholder-gray-400"
                                    placeholder="Añade tu email"
                                    value={ profileData.email || "" }
                                    onChange={ e => handleChange("email", e.target.value) }
                                />
                            </label>
                        </div>

                        <input
                            type="submit"
                            value="Modificar datos"
                            className="w-full md:w-auto py-3 px-10 mt-7 mb-2 block mx-auto rounded-md
                                    bg-indigo-700 text-white uppercase font-bold tracking-wide transition-colors duration-300
                                    hover:bg-indigo-800 hover:cursor-pointer"
                        />

                    </form>
                </div>
            </div>

        </>
    )
}

export default VetProfilePage;