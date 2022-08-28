import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login } from '../pages'

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter
