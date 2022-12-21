import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import classnames from 'classnames'
import { Transition } from '@headlessui/react'

import getInfoMenuStylesByCharacter from './utils/getInfoMenuStylesByCharacter'
import { CHARACTER } from '../../const'
import { GameKeysInputs } from 'modules/GhostTown/player/controls'

export interface InfoMenuProps {
    isInfoMenuOpen?: boolean
    character?: CHARACTER
    avatar: string
    title: string
    gameKeysInputs?: GameKeysInputs
    onTalk?: (character: CHARACTER) => void
}

export default function InfoMenu({
    isInfoMenuOpen,
    character,
    avatar,
    title,
    gameKeysInputs,
    onTalk,
}: InfoMenuProps) {
    const [currentCharacter, setCurrentCharacter] = useState(character)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const styles = useMemo(() => getInfoMenuStylesByCharacter(currentCharacter), [currentCharacter])
    const ctaList = [
        { name: 'talk', label: 'TALK [SPACE]' },
        { name: 'missions', label: 'MISSIONS [M]' },
        { name: 'info', label: 'INFO [I]' },
    ]

    const handleTalk = useCallback(() => {
        if (character && onTalk) {
            onTalk(character)
        }
    }, [onTalk, character])

    const handleOnMouseOver = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const buttonName = event.currentTarget.name
        switch (buttonName) {
            case 'talk':
                setSelectedIndex(0)
                break
            case 'missions':
                setSelectedIndex(1)
                break
            case 'info':
                setSelectedIndex(2)
                break
            default:
                setSelectedIndex(0)
                break
        }
    }, [])

    useEffect(() => {
        if (character) {
            setCurrentCharacter(character)
        }
    }, [character])

    useEffect(() => {
        if (gameKeysInputs?.mPressed) {
            setSelectedIndex(1)
        } else if (gameKeysInputs?.iPressed) {
            setSelectedIndex(2)
        } else {
            setSelectedIndex(0)
        }
    }, [gameKeysInputs])

    return (
        <div
            id="info-menu"
            className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
        >
            <div className="flex flex-col flex-auto items-center justify-end h-full pr-6">
                <Transition
                    appear={true}
                    className={styles.container}
                    show={isInfoMenuOpen}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-40"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-40"
                >
                    <div>
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
                                <p className="font-josefin font-bold text-lg text-cherry uppercase">
                                    {title}
                                </p>
                                <div className="flex flex-row mt-1">
                                    {ctaList.map(({ name, label }, index) => (
                                        <button
                                            key={`${index}`}
                                            name={name}
                                            onMouseOver={handleOnMouseOver}
                                            onClick={handleTalk}
                                            className={`ml-1 mt-1 bg-transparent hover:${styles.textColor} focus:outline-none active:outline-none`}
                                        >
                                            <div className="flex flex-row items-center justify-center mr-4">
                                                <span className="h-4 w-4">
                                                    <span
                                                        className={classnames(
                                                            {
                                                                'animate-ping':
                                                                    selectedIndex === index,
                                                                hidden: selectedIndex !== index,
                                                            },
                                                            'absolute inline-flex h-5 w-5 opacity-75',
                                                            styles.bgColor
                                                        )}
                                                    ></span>
                                                    <span
                                                        className={classnames(
                                                            'relative inline-flex h-4 w-4',
                                                            styles.bgColor
                                                        )}
                                                    ></span>
                                                </span>
                                                <span
                                                    className={classnames(
                                                        selectedIndex === index
                                                            ? 'font-bold'
                                                            : 'font-thin',
                                                        'leading-none font-josefin text-sm pt-2 pl-1',
                                                        styles.textColor
                                                    )}
                                                >
                                                    {label}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    )
}
