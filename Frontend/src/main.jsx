import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from './layouts/AuthLayout'
import ConfirmEmailPage from './pages/ConfirmEmailPage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import './styles/index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AuthLayout />}>
					<Route index element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/confirm-email" element={<ConfirmEmailPage />} />
					<Route path="/reset-password" element={<ResetPasswordPage />} />
				</Route>
				<Route path='*' element={<h1>Page not found</h1>}/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)
