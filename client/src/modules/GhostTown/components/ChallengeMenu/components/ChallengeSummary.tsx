import React, { useMemo } from 'react'

import { Challenge } from 'types'

import Diamond from 'assets/icons/diamond.svg'

export interface ChallengeSummaryProps {
    challenge: Challenge
}

function ChallengeSummary({ challenge }: ChallengeSummaryProps) {
    const { description, level, reward } = useMemo(() => challenge, [challenge])

    return (
        <>
            <p className="font-josefin font-normal text-xs text-black p-2 overflow-y-auto h-20 text-center">
                <span className="font-bold mr-1">Challenge:</span> {description}
            </p>
            <div className="flex flex-row justify-between font-josefin font-normal text-sm my-2 px-6">
                <div>
                    <p className="text-cherry font-bold uppercase">LEVEL</p>
                    <p className="flex items-center justify-center text-black">{level}</p>
                </div>
                <div className="">
                    <p className="text-cherry font-bold uppercase">REWARD</p>
                    <p className="flex flex-row justify-center items-center text-black">
                        <span className="mx-1">{reward} x</span>
                        <Diamond />
                    </p>
                </div>
            </div>
        </>
    )
}

export default ChallengeSummary
