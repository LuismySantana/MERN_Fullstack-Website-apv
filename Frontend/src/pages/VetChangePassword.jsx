import VetProfileNav from "../components/VetProfileNav";



const VetChangePassword = () => {
  return (
    <>
        <VetProfileNav />
        
        <h2 className=" font-black text-2xl text-center">Cambiar contraseña</h2>
        <p className="text-lg text-center mt-5 mb-10 font-bold">
          Vamos a modificar {""}
          <span className=" text-indigo-600">tu contraseña</span>
        </p>


        
    </>
  )
}

export default VetChangePassword;