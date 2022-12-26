import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GITHUB_ABOUT, GITHUB_HELP, PAGES_ROUTERS } from 'const'

export interface MainMenuProps {
    isMainMenuOpen?: boolean
}

export default function MainMenu({ isMainMenuOpen }: MainMenuProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleQuit = useCallback(async () => {
        router.push(PAGES_ROUTERS.HOME)
    }, [router])

    if (!isMainMenuOpen) {
        return null
    }

    return (
        <div
            id="main-menu"
            className="overflow-y-auto overflow-x-hidden fixed bottom-0 left-0 z-40"
        >
            <div className="flex flex-col flex-auto items-start justify-end h-full pr-6">
                <div className="m-8">
                    <button
                        onClick={toggleModal}
                        className="group bg-transparent focus:outline-none  active:outline-none"
                    >
                        <svg
                            height="48"
                            width="48"
                            className="text-ivory group-hover:text-primary-light"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            stroke="none"
                            aria-hidden="true"
                        >
                            <path d="M14 42V27.7l-3.05 4.85L8.4 31 24 6l15.6 25-2.55 1.55L34 27.7V42Zm3-3h5.5v-6h3v6H31V22.9l-7-11.2-7 11.2Zm5.5-11.5v-3h3v3ZM17 39h14-14Z" />
                        </svg>
                        <p className="font-josefin font-light text-white group-hover:text-primary-light">
                            MENU
                        </p>
                    </button>
                </div>
            </div>
            <div
                id="defaultModal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${
                    isModalOpen ? 'visible' : 'hidden'
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center`}
            >
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative shadow ">
                        <div className="flex p-4 border-b border-white">
                            <div className="flex flex-1 justify-center items-center">
                                <Image src="/img/logo.png" width={124} height={77} alt="Logo" />
                            </div>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="text-white bg-transparent  hover:text-primary-light focus:outline-none active:outline-none inline-flex items-center"
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4 bg-indigo-700">
                            <p className="font-josefin text-4xl text-white">MENU</p>
                            <section className="space-y-2 pl-4">
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={GITHUB_HELP}
                                    className="flex w-full focus:outline-none active:outline-none"
                                >
                                    <span className="w-full flex justify-start font-josefin font-light text-white text-2xl hover:bg-primary-light focus:outline-none active:outline-none p-2">
                                        HELP
                                    </span>
                                </a>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={GITHUB_ABOUT}
                                    className="flex w-full focus:outline-none active:outline-none"
                                >
                                    <span className="w-full flex justify-start font-josefin font-light text-white text-2xl hover:bg-primary-light focus:outline-none active:outline-none p-2">
                                        ABOUT
                                    </span>
                                </a>
                                <a
                                    onClick={handleQuit}
                                    className="cursor-pointer flex w-full focus:outline-none active:outline-none"
                                >
                                    <span className="w-full flex justify-start font-josefin font-light text-white text-2xl hover:bg-primary-light focus:outline-none active:outline-none p-2">
                                        QUIT GAME
                                    </span>
                                </a>
                            </section>
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-white"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
