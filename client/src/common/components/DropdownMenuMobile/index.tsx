import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { User } from 'modules/Auth/types/User'

export interface DropdownMenuMobileProps {
    user?: User | null
    onLogin: () => void
    onLogout: () => void
    onPressAboutMe: (e: React.MouseEvent<HTMLElement>) => void
}

function DropdownMenuMobile({ user, onLogin, onLogout, onPressAboutMe }: DropdownMenuMobileProps) {
    const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onLogin()
    }

    const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onLogout()
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="">
                <svg height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" fill="white">
                    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
                </svg>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {() => (
                                <button
                                    type="button"
                                    onClick={onPressAboutMe}
                                    className="
                                        bg-gray-100 text-gray-900 block w-full px-4 py-2 text-left text-sm"
                                >
                                    About
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                    {user ? (
                        <div className="py-1">
                            <Menu.Item>
                                {() => (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="
                                        bg-gray-100 text-gray-900 block w-full px-4 py-2 text-left text-sm"
                                    >
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    ) : (
                        <div className="py-1">
                            <Menu.Item>
                                {() => (
                                    <button
                                        type="button"
                                        onClick={handleLogin}
                                        className="
                                        bg-gray-100 text-gray-900 block w-full px-4 py-2 text-left text-sm"
                                    >
                                        Login
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DropdownMenuMobile
