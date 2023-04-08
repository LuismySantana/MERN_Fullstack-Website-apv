import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from './layouts/AuthLayout'
import LoginPage from "./pages/LoginPage"
import './styles/index.css'
import RegisterPage from './pages/RegisterPage'
import ConfirmEmailPage from './pages/ConfirmEmailPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SetNewPasswordPage from './pages/SetNewPasswordPage'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>

          <Route path='/' element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='confirm-email/:email/:token' element={<ConfirmEmailPage />} />
            <Route path='reset-password' element={<ResetPasswordPage />} />
            <Route path='reset-password/:email/:token' element={<SetNewPasswordPage />} />
          </Route>

          <Route path='*' element={<h1>Page not found</h1>} />

        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
