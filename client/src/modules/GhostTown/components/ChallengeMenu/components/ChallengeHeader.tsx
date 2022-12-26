import React, { useMemo } from 'react'
import classNames from 'classnames'

import { CHARACTER } from 'modules/GhostTown/const'
import { getLayoutByCharacter } from '../utils/getLayoutByCharacter'

import ChallengeSummary, { ChallengeSummaryProps } from './ChallengeSummary'

export interface HeaderProps extends ChallengeSummaryProps {
    character: CHARACTER
}

function ChallengeHeader({ character, challenge }: HeaderProps) {
    const { getHeaderSVG, bgColor } = useMemo(() => getLayoutByCharacter(character), [character])

    return (
        <div className={classNames(bgColor, 'py-4 rounded-t-2xl relative')}>
            <div className="absolute " style={{ top: 260, left: 206, width: 188 }}>
                <ChallengeSummary challenge={challenge} />
            </div>
            <div className="top-0 left-0">{getHeaderSVG()}</div>
        </div>
    )
}

export default ChallengeHeader
