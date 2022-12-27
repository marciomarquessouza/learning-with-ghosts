import React, { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { GameKeysInputs } from 'modules/GhostTown/player/controls'
import { Challenge } from 'types'
import { CHARACTER } from 'modules/GhostTown/const'
import { getLayoutByCharacter } from '../utils/getLayoutByCharacter'
import ChallengeItemFlag from './ChallengeItemFlag'
import ChallengeItemButton from './ChallengeItemButton'

export interface ChallengeItemsProps {
    character: CHARACTER
    challenges: Challenge[]
    defaultSelectedId: string
    gameKeysInputs?: GameKeysInputs
    onSelectCard: (id: string) => void
    onCallChallenge: (id: string) => void
}

function ChallengeItems({
    character,
    challenges,
    defaultSelectedId,
    onSelectCard,
    onCallChallenge,
}: ChallengeItemsProps) {
    const [selectedId, setSelectedId] = useState(defaultSelectedId)
    const { activeChallengeCardPath, inactiveChallengeCardPath, primaryColor } = useMemo(
        () => getLayoutByCharacter(character),
        [character]
    )

    const handleOnMouseOver = useCallback(
        (event: React.MouseEvent<HTMLDivElement>, uid: string) => {
            event.stopPropagation()
            setSelectedId(uid)
            onSelectCard(uid)
        },
        [onSelectCard]
    )

    const handleOnClick = useCallback(
        (uid: string) => {
            onCallChallenge(uid)
        },
        [onCallChallenge]
    )

    return (
        <div className="py-2 flex flex-row justify-center">
            {challenges.map(({ uid, title, completed, blocked }, index) => (
                <div
                    key={`${index}`}
                    onMouseOver={(ev) => handleOnMouseOver(ev, uid)}
                    className={classNames({ 'cursor-not-allowed': blocked })}
                >
                    <div className="mx-2 relative">
                        <ChallengeItemFlag {...{ completed, blocked }} />
                        <ChallengeItemButton
                            challengeId={uid}
                            selected={uid === selectedId}
                            blocked={blocked}
                            onClick={handleOnClick}
                        />
                        <div
                            className={classNames(
                                uid === selectedId ? primaryColor : 'bg-neutral-600',
                                'flex justify-center items-center h-6 w-full absolute top-28'
                            )}
                        >
                            <p className="font-josefin font-normal text-sm text-white leading-none pt-1">
                                {title}
                            </p>
                        </div>
                        <Image
                            src={
                                blocked || uid !== selectedId
                                    ? inactiveChallengeCardPath
                                    : activeChallengeCardPath
                            }
                            alt={title}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChallengeItems
