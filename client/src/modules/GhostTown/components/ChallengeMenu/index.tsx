import React, { useCallback, useMemo, useState } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

import { CHARACTER } from '../../const'
import { GameKeysInputs } from 'modules/GhostTown/player/controls'
import { Challenge } from 'types'
import { getLayoutByCharacter } from './utils/getLayoutByCharacter'

import ChallengeHeader from './components/ChallengeHeader'
import ChallengeItems from './components/ChallengeItems'
import ChallengeMenuCloseButton from './components/ChallengeMenuCloseButton'

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
}: ChallengeMenuProps) {
    const character = CHARACTER.PRINCESS
    const MOCK_CHALLENGES: Challenge[] = useMemo(
        () => [
            {
                uid: 'first',
                title: 'ONE',
                description: 'learn to say good morning, good afternoon and good night.',
                level: 1,
                reward: 10,
                completed: true,
                blocked: false,
            },
            {
                uid: 'second',
                title: 'TWO',
                description: 'good work Marcio, vou can go to your bed now.',
                level: 1,
                reward: 20,
                completed: false,
                blocked: false,
            },
            {
                uid: 'third',
                title: 'THREE',
                description: 'yes, your are allowed to dream today.',
                level: 1,
                reward: 30,
                completed: false,
                blocked: true,
            },
            {
                uid: 'four',
                title: 'FOUR',
                description: 'So much.',
                level: 1,
                reward: 50,
                completed: false,
                blocked: true,
            },
        ],
        []
    )
    const [challenge, setChallenge] = useState(MOCK_CHALLENGES[0])
    const { containerColor } = useMemo(() => getLayoutByCharacter(character), [character])

    const handleOnSelectCard = useCallback(
        (uid: string) => {
            const selectedChallenge = MOCK_CHALLENGES.find((challenge) => challenge.uid === uid)
            if (selectedChallenge) {
                setChallenge(selectedChallenge)
            }
        },
        [MOCK_CHALLENGES]
    )

    const handleOnCallChallenge = useCallback((id: string) => {
        console.log(id)
    }, [])

    const handleOnClose = useCallback(() => {
        onClose && onClose()
    }, [onClose])

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
                        <ChallengeHeader character={character} challenge={challenge} />
                        <ChallengeItems
                            character={character}
                            challenges={MOCK_CHALLENGES}
                            defaultSelectedId={MOCK_CHALLENGES[0].uid}
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
