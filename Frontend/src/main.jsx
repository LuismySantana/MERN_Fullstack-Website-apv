import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SessionProvider } from './contexts/SessionProvider'
import AuthLayout from './layouts/AuthLayout'
import AdminLayout from './layouts/AdminLayout'
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import ConfirmEmailPage from './pages/ConfirmEmailPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'
import './styles/index.css'
import AdminPacientsPage from './pages/AdminPacientsPage'



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<SessionProvider>
				<Routes>

					<Route path='/' element={<AuthLayout />}>
						<Route index element={<LoginPage />} />
						<Route path='register' element={<RegisterPage />} />
						<Route path='confirm-email/:email/:token' element={<ConfirmEmailPage />} />
						<Route path='reset-password' element={<ResetPasswordPage />} />
						<Route path='reset-password/:email/:token' element={<SetNewPasswordPage />} />
					</Route>

					<Route path="/admin" element={<AdminLayout />}>
						<Route index element={<AdminPacientsPage />} />
						<Route path='profile' element={<h1>Perfil de veterinario</h1>} />

					</Route>

					<Route path='*' element={<h1>Page not found</h1>} />

				</Routes>
			</SessionProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
