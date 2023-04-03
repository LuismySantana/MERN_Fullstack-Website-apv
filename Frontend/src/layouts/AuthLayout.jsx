import { Outlet } from "react-router-dom"



const AuthLayout = () => {
  return (
    <main className='container mx-auto md:grid md:grid-cols-2 py-10 px-5 md:py-0 gap-10 min-h-screen items-center'>
        <Outlet />
    </main>
  )
}



export default AuthLayout