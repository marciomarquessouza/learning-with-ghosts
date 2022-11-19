import React, { useMemo } from 'react'
import Image from 'next/image'
import { CHARACTER, DIALOG_MENU, EXPRESSION } from '../../const'
import getDialogMenuStylesByCharacter from './utils/getDialogMenuStylesByCharacter'

export interface DialogMenuProps {
    character?: CHARACTER
    expression?: EXPRESSION
    title?: string
    text: string
    onClose: () => void
    onNext: () => void
}

export default function DialogMenu({
    character,
    expression,
    title,
    text,
    onClose,
    onNext,
}: DialogMenuProps) {
    const styles = useMemo(() => getDialogMenuStylesByCharacter(character), [character])

    const expressionImg = useMemo(() => {
        if (character && expression) {
            return DIALOG_MENU[character].expressions[expression]
        }
    }, [expression, character])

    const dialogTitle = useMemo(
        () => title || (character && DIALOG_MENU[character]?.title),
        [character, title]
    )

    if (!character) {
        return null
    }

    return (
        <div className="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="flex flex-col flex-auto items-center justify-end h-full pr-6">
                <div className="w-3/5 max-w-4xl h-32 animate-dialog-menu-in  mb-14">
                    <div className="flex flex-1 pb-1">
                        <button
                            onClick={onClose}
                            className={`items-start font-josefin font-normal text-sm text-white bg-transparent hover:text-${styles.color} focus:outline-none  active:outline-none`}
                        >
                            CLOSE [ESC]
                        </button>
                    </div>
                    <div className={`rounded-xl ${styles.pattern}`}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 m-2 px-2">
                                {expressionImg && (
                                    <Image
                                        src={expressionImg}
                                        className={`rounded-full h-28 w-28 border-4 border-${styles.color}`}
                                        alt="Character Expression"
                                        width={120}
                                        height={120}
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p
                                    className={`font-josefin font-bold text-lg text-${styles.color} uppercase`}
                                >
                                    {dialogTitle}
                                </p>
                                <div className="w-full h-16 overflow-hidden animate-typing-slow will-change-transform">
                                    <p
                                        className={`${styles.font} text-5xl text-${styles.textColor} ml-1 mt-1 text-clip whitespace-nowrap`}
                                    >
                                        {text}
                                    </p>
                                </div>
                            </div>
                            <div className="mb-16">
                                <button
                                    onClick={onNext}
                                    className={`items-start font-josefin font-normal text-sm text-${styles.nextColor} bg-transparent hover:text-${styles.nextColor} focus:outline-none  active:outline-none`}
                                >
                                    NEXT [SPACE]
                                </button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
