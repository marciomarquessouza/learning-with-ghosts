import React, { useMemo, useCallback } from 'react'
import Image from 'next/image'

import getInfoMenuStylesByCharacter from './utils/getInfoMenuStylesByCharacter'
import { CHARACTER } from '../../const'

export interface InfoMenuProps {
    character?: CHARACTER
    avatar: string
    title: string
    onTalk?: (character: CHARACTER) => void
    onClose: () => void
}

export default function InfoMenu({ character, avatar, title, onTalk, onClose }: InfoMenuProps) {
    const styles = useMemo(() => getInfoMenuStylesByCharacter(character), [character])
    const handleTalk = useCallback(() => {
        if (character && onTalk) {
            onTalk(character)
        }
    }, [onTalk, character])

    const handleOnClose = useCallback(() => {
        onClose()
    }, [onClose])

    if (!character) {
        return null
    }

    return (
        <div className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="flex flex-col flex-auto items-center justify-end h-full pr-6">
                <div
                    className={`w-3/5 max-w-4xl h-24 rounded-xl m-10 bg-white animate-info-menu-in`}
                >
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 mt-4 ml-4">
                            <Image
                                src={avatar}
                                width={90}
                                height={93}
                                className={`rounded-full h-16 w-16 border-4 border-cherry`}
                                alt={character}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`font-josefin font-normal text-lg text-cherry uppercase`}>
                                {title}
                            </p>
                            <div className="flex flex-row mt-1">
                                <div className="flex flex-row items-center mr-4">
                                    <svg width="15" height="15">
                                        <rect width="15" height="15" fill="#CB214A" />
                                    </svg>
                                    <button
                                        onClick={handleTalk}
                                        className={`font-josefin text-sm text-cherry ml-1 mt-1 bg-transparent hover:text-cherry focus:outline-none  active:outline-none`}
                                    >
                                        TALK [SPACE]
                                    </button>
                                </div>
                                <div className="flex flex-row items-center mr-4">
                                    <svg width="15" height="15">
                                        <rect width="15" height="15" fill={`${styles.fillColor}`} />
                                    </svg>
                                    <p className={`font-josefin text-sm text-cherry ml-1 mt-1`}>
                                        MISSIONS [M]
                                    </p>
                                </div>
                                <div className="flex flex-row items-center mr-4">
                                    <svg width="15" height="15">
                                        <rect width="15" height="15" fill="#CB214A" />
                                    </svg>
                                    <button
                                        className={`font-josefin text-sm text-cherry ml-1 mt-1 bg-transparent hover:text-cherry focus:outline-none  active:outline-none`}
                                    >
                                        INFO [I]
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleOnClose}
                            className={`items-start font-josefin font-normal text-sm text-cherry bg-transparent hover:text-cherry focus:outline-none  active:outline-none`}
                        >
                            CLOSE [ESC]
                        </button>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
