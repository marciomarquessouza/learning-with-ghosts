import React from 'react'
import { User } from 'firebase/auth'

import DropdownMenuAvatar from '../DropdownMenuAvatar'
import DropdownMenuMobile from '../DropdownMenuMobile'

import { GITHUB_URL } from '../../const'

export interface NavigationMenuProps {
    user?: User | null
    onLogout: () => void
    onLogin: () => void
}

function NavigationMenu({ user, onLogout, onLogin }: NavigationMenuProps) {
    const handlePressAboutMe = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        window.open(GITHUB_URL, '_blank')
    }

    const handleOnLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onLogin()
    }

    return (
        <div className="flex flex-row items-center">
            <div className="block md:hidden mx-4">
                <DropdownMenuMobile
                    user={user}
                    onLogin={onLogin}
                    onLogout={onLogout}
                    onPressAboutMe={handlePressAboutMe}
                />
            </div>
            <div className="hidden md:flex flex-row justify-items-center items-center">
                <div className="mx-4">
                    <a href="#" onClick={handlePressAboutMe}>
                        <span className="font-josefin font-bold text-lg text-white">ABOUT</span>
                    </a>
                </div>
                <div className="mx-4">
                    {user ? (
                        <DropdownMenuAvatar
                            name={user.displayName || 'User'}
                            email={user.email}
                            photoUrl={user.photoURL}
                            onLogout={onLogout}
                        />
                    ) : (
                        <button
                            className="bg-primary hover:bg-primary-dark py-2 px-4 rounded"
                            onClick={handleOnLogin}
                        >
                            <span className="font-josefin font-bold text-lg text-white">LOGIN</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavigationMenu
