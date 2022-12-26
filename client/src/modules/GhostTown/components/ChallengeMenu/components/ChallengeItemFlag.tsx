import React from 'react'

import CheckIconSVG from 'assets/icons/check-circle.svg'
import LockIconSVG from 'assets/icons/lock-circle.svg'

export interface ChallengeItemFlagProps {
    completed: boolean
    blocked: boolean
}

function ChallengeItemFlag({ completed, blocked }: ChallengeItemFlagProps) {
    return (
        <div className="absolute -top-2 -right-2 ">
            {completed ? <CheckIconSVG /> : null}
            {blocked ? <LockIconSVG /> : null}
        </div>
    )
}

export default ChallengeItemFlag
