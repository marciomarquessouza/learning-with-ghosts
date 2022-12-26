import React, { useCallback } from 'react'

export interface ChallengeItemButtonProps {
    challengeId: string
    blocked: boolean
    selected: boolean
    onClick: (id: string) => void
}

function ChallengeItemButton({
    blocked,
    selected,
    onClick,
    challengeId,
}: ChallengeItemButtonProps) {
    const handleOnClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
            event.preventDefault()
            onClick(id)
        },
        [onClick]
    )

    if (!selected) {
        return null
    }

    return (
        <div className="flex justify-center items-center w-full mt-6 mb-4 absolute top-10">
            {blocked ? (
                <p className="font-josefin font-bold text-base text-red-600 leading-none">
                    BLOCKED
                </p>
            ) : (
                <button
                    onClick={(ev) => handleOnClick(ev, challengeId)}
                    className="inline-block bg-primary-light px-4 py-1 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary-dark hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    <span className="font-josefin font-normal text-xs text-white leading-none">
                        START
                    </span>
                </button>
            )}
        </div>
    )
}

export default ChallengeItemButton
