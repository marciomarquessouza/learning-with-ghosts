import React from 'react'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'

import { useUser } from 'modules/Auth/hooks/useUser'
import { useAlert } from 'common/hooks/useAlert'
import { logout } from 'modules/Auth/services'
import { Hero, LogoHeader, NavigationMenu } from 'common/components'
import { PAGES_ROUTERS } from 'const'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'
import GhostLoading from 'common/components/GhostLoading'
import { useGameContent } from 'modules/GhostTown/hooks/useGameContent'

const BACKGROUND_IMAGE = "url('img/background_main_page.png')"

function Home() {
    const router = useRouter()
    const { user, loading: loadingUser, error } = useUser()
    const { chapter, status, error: errorContent } = useGameContent()
    const { openAlert } = useAlert()

    const handleLogin = () => {
        router.push(PAGES_ROUTERS.LOGIN)
    }

    const handleLogout = () => {
        logout()
    }

    if (loadingUser || (user && status !== 'success')) {
        return <GhostLoading />
    }

    if ((error && !loadingUser) || errorContent) {
        openAlert({
            title: 'Error',
            message: 'Error loading the content. Please, try later',
            type: ALERTS_TYPE_ENUM.ERROR,
        })
    }

    return (
        <div className="relative overflow-hidden">
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
                            <NavigationMenu
                                user={user}
                                onLogin={handleLogin}
                                onLogout={handleLogout}
                            />
                        </div>
                    </nav>
                </Popover>
                <main className="relative mx-auto flex items-center justify-between px-4 sm:px-6 max-w-screen-2xl h-full">
                    <Hero user={user} chapter={chapter} />
                </main>
            </div>
        </div>
    )
}

export default Home
