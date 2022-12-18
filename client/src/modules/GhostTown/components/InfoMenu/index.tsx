import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import { Transition } from '@headlessui/react'

import getInfoMenuStylesByCharacter from './utils/getInfoMenuStylesByCharacter'
import { CHARACTER } from '../../const'

export interface InfoMenuProps {
    isShowing: boolean
    character?: CHARACTER
    avatar: string
    title: string
    onTalk?: (character: CHARACTER) => void
}

export default function InfoMenu({ isShowing, character, avatar, title, onTalk }: InfoMenuProps) {
    const [currentCharacter, setCurrentCharacter] = useState(character)
    const styles = useMemo(() => getInfoMenuStylesByCharacter(currentCharacter), [currentCharacter])
    const handleTalk = useCallback(() => {
        if (character && onTalk) {
            onTalk(character)
        }
    }, [onTalk, character])

    useEffect(() => {
        if (character) {
            setCurrentCharacter(character)
        }
    }, [character])

    return (
        <div className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="flex flex-col flex-auto items-center justify-end h-full pr-6">
                <Transition
                    appear={true}
                    className="w-3/5 max-w-4xl h-24 rounded-xl m-10 bg-white"
                    show={isShowing}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-40"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-40"
                >
                    <div className="">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 mt-4 ml-4">
                                <Image
                                    src={avatar}
                                    width={90}
                                    height={93}
                                    className={`rounded-full h-16 w-16 border-4 border-cherry`}
                                    alt={`picture of ${currentCharacter}`}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-josefin font-normal text-lg text-cherry uppercase">
                                    {title}
                                </p>
                                <div className="flex flex-row mt-1">
                                    <div className="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect width="15" height="15" fill="#CB214A" />
                                        </svg>
                                        <button
                                            onClick={handleTalk}
                                            className="font-josefin text-sm text-cherry ml-1 mt-1 bg-transparent hover:text-cherry focus:outline-none  active:outline-none"
                                        >
                                            TALK [SPACE]
                                        </button>
                                    </div>
                                    <div className="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect
                                                width="15"
                                                height="15"
                                                fill={`${styles.fillColor}`}
                                            />
                                        </svg>
                                        <p className="font-josefin text-sm text-cherry ml-1 mt-1">
                                            MISSIONS [M]
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect width="15" height="15" fill="#CB214A" />
                                        </svg>
                                        <button className="font-josefin text-sm text-cherry ml-1 mt-1 bg-transparent hover:text-cherry focus:outline-none  active:outline-none">
                                            INFO [I]
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}
