import React from 'react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../auth'
import { Hero, LogoHeader, NavigationMenu, Spinner } from '../components'
import useAuth from '../hooks/useAuth'

const BACKGROUND_IMAGE = "url('img/background_main_page.png')"

function Home() {
    const navigate = useNavigate()
    const { user, loading } = useAuth()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <main
            className="bg-background h-screen bg-cover bg-no-repeat bg-center"
            style={{
                backgroundImage: BACKGROUND_IMAGE,
            }}
        >
            <section className="flex flex-row justify-between items-center mx-1 md:mx-4">
                <header className="w-2/5 m-2">
                    <LogoHeader />
                </header>
                <nav>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <NavigationMenu user={user} onLogin={handleLogin} onLogout={handleLogout} />
                    )}
                </nav>
            </section>
            <section className="flex h-full flex-row justify-start items-center md:ml-4">
                <Hero />
            </section>
        </main>
    )
}

export default Home
