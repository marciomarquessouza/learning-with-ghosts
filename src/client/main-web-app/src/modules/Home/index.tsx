import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'

import { logout } from '../../auth'
import { Hero, LogoHeader, NavigationMenu, Spinner } from '../../components'
import { useAuth } from '../../hooks'

const BACKGROUND_IMAGE = "url('img/background_main_page.png')"

function Home() {
    const router = useRouter()
    const { user, loading } = useAuth()

    const handleLogin = () => {
        router.push('/login')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="relative overflow-hidden ">
            <div
                className="bg-background h-screen bg-cover bg-no-repeat bg-center pt-4"
                style={{
                    backgroundImage: BACKGROUND_IMAGE,
                }}
            >
                <Popover as="header" className="relative">
                    <nav
                        className="relative mx-auto flex items-center justify-between px-4 sm:px-6 max-w-screen-2xl"
                        aria-label="Global"
                    >
                        <div className="flex flex-1 items-center">
                            <LogoHeader />
                        </div>
                        <div className="md:flex md:items-center md:space-x-6">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <NavigationMenu
                                    user={user}
                                    onLogin={handleLogin}
                                    onLogout={handleLogout}
                                />
                            )}
                        </div>
                    </nav>
                </Popover>
                <main className="relative mx-auto flex items-center justify-between px-4 sm:px-6 max-w-screen-2xl h-full">
                    <Hero />
                </main>
            </div>
        </div>
    )
}

export default Home
