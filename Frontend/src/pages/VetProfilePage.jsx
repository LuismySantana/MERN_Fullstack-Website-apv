import VetProfileNav from "../components/VetProfileNav";



const VetProfilePage = () => {
  return (
    <>
        <VetProfileNav />
        
        <h2 className=" font-black text-2xl text-center">Mis datos</h2>
        <p className="text-lg text-center mt-5 mb-10 font-bold">
          Revisa tu {""}
          <span className=" text-indigo-600">perfil</span>
        </p>


        
    </>
  )
}

export default VetProfilePage;