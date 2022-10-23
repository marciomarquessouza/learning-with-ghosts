import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Register, ResetPassword } from '../pages'

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset" element={<ResetPassword />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter
