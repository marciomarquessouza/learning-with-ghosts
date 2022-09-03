import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

import Avatar from '../Avatar'

export interface DropdownMenuAvatarProps {
    name: string
    email: string | null
    photoUrl?: string | null
    onLogout: () => void
}

function DropdownMenuAvatar({ name, email, photoUrl, onLogout }: DropdownMenuAvatarProps) {
    const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onLogout()
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="">
                    <Avatar name={name} photoUrl={photoUrl} />
                </Menu.Button>
            </div>
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
                                    onClick={handleLogout}
                                    className="
                                        bg-gray-100 text-gray-900 block w-full px-4 py-2 text-left text-sm"
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DropdownMenuAvatar
