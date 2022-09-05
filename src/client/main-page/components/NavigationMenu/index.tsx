import React from 'react'
import { Link } from 'react-router-dom'
import { User } from 'firebase/auth'
import DropdownMenuAvatar from '../DropdownMenuAvatar'
import DropdownMenuMobile from '../DropdownMenuMobile'

export interface NavigationMenuProps {
    user?: User | null
    onLogout: () => void
    onLogin: () => void
}

function NavigationMenu({ user, onLogout, onLogin }: NavigationMenuProps) {
    return (
        <div className="flex flex-row items-center">
            <div className="block md:hidden mx-4">
                <DropdownMenuMobile user={user} onLogin={onLogin} onLogout={onLogout} />
            </div>
            <div className="hidden md:flex flex-row justify-items-center items-center">
                <div className="mx-4">
                    <a
                        href="https://github.com/marciomarquessouza/learning-with-ghosts"
                        target="_blank"
                    >
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
                        <Link to="/login">
                            <button className="bg-primary hover:bg-primary-dark py-2 px-4 rounded">
                                <span className="font-josefin font-bold text-lg text-white">
                                    LOGIN
                                </span>
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavigationMenu
