import { Outlet } from "react-router-dom"



const AuthLayout = () => {
  return (
    <main  className='container mx-auto md:grid md:grid-cols-2 pt-10 px-5 md:pt-0 gap-10 min-h-screen items-center'>
        <Outlet />
    </main>
  )
}



export default AuthLayout