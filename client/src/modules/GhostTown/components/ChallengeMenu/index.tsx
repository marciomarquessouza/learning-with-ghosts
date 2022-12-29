import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

import { CHARACTER } from '../../const'
import { GameKeysInputs } from 'modules/GhostTown/player/controls'
import { Challenge } from 'types'
import { getLayoutByCharacter } from './utils/getLayoutByCharacter'

import ChallengeHeader from './components/ChallengeHeader'
import ChallengeItems from './components/ChallengeItems'
import ChallengeMenuCloseButton from './components/ChallengeMenuCloseButton'
import { useGameContent } from 'modules/GhostTown/hooks/useGameContent'

export interface ChallengeMenuProps {
    isChallengeMenuOpen?: boolean
    character?: CHARACTER
    gameKeysInputs?: GameKeysInputs
    onClose?: () => void
    onClickChallenge?: () => void
}

function ChallengeMenu({
    isChallengeMenuOpen,
    gameKeysInputs,
    onClose,
    onClickChallenge,
    character,
}: ChallengeMenuProps) {
    const { getCurrentChallengesByCharacter } = useGameContent()
    const [challenges, setChallenges] = useState<Challenge[]>([])
    const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
    const { containerColor } = useMemo(() => getLayoutByCharacter(character), [character])

    const handleOnSelectCard = useCallback(
        (uid: string) => {
            const selected = challenges.find((challenge) => challenge.uid === uid)
            if (selected) {
                setSelectedChallenge(selected)
            }
        },
        [challenges]
    )

    const handleOnCallChallenge = useCallback((id: string) => {
        console.log(id)
    }, [])

    const handleOnClose = useCallback(() => {
        onClose && onClose()
    }, [onClose])

    useEffect(() => {
        if (character) {
            const currentChallenges = getCurrentChallengesByCharacter(character)
            setChallenges(currentChallenges)
            setSelectedChallenge(currentChallenges[0])
        }
    }, [character, getCurrentChallengesByCharacter])

    if (challenges.length < 1 || !selectedChallenge || !character) {
        return null
    }

    return (
        <div id="challenge-menu" className="fixed top-0 right-0 left-0 z-60">
            <div className="flex flex-col flex-auto items-center justify-end h-full">
                <Transition
                    appear={true}
                    show={isChallengeMenuOpen}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-y-full"
                    enterTo="translate-y-18"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-18"
                    leaveTo="-translate-y-full"
                >
                    <div className={classNames(containerColor, 'p-4 mt-10 relative')}>
                        <ChallengeMenuCloseButton onClick={handleOnClose} />
                        <ChallengeHeader character={character} challenge={selectedChallenge} />
                        <ChallengeItems
                            character={character}
                            challenges={challenges}
                            defaultSelectedId={selectedChallenge.uid}
                            onSelectCard={handleOnSelectCard}
                            onCallChallenge={handleOnCallChallenge}
                        />
                    </div>
                </Transition>
            </div>
        </div>
    )
}

export default ChallengeMenu
