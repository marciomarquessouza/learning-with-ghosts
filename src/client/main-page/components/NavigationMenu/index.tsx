import React from 'react'
import { Link } from 'react-router-dom'
import { User } from 'firebase/auth'
import DropdownMenuAvatar from '../DropdownMenuAvatar'

export interface NavigationMenuProps {
    user?: User | null
    onLogout: () => void
}

function NavigationMenu({ user, onLogout }: NavigationMenuProps) {
    return (
        <div className="flex flex-row items-center">
            <div className="visible md:invisible">
                <svg
                    height="32px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 32 32"
                    className="w-32"
                    fill="white"
                >
                    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
                </svg>
            </div>
            <div className="invisible md:visible flex flex-row justify-items-center items-center">
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
