import React, { useCallback } from 'react'

import CloseIconSvg from 'assets/icons/cancel-circle.svg'

export interface ChallengeMenuCloseButtonProps {
    onClick: () => void
}

function ChallengeMenuCloseButton({ onClick }: ChallengeMenuCloseButtonProps) {
    const handleOnClick = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault()
            onClick()
        },
        [onClick]
    )
    return (
        <a className="absolute -top-6 -right-6 hover:cursor-pointer" onClick={handleOnClick}>
            <CloseIconSvg fill="#F5E3C8" stroke="#9F1A23" />
        </a>
    )
}

export default ChallengeMenuCloseButton
