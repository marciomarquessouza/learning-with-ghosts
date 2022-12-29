import React from 'react'
import { StaticImageData } from 'next/image'

import { CHARACTER } from 'modules/GhostTown/const'
import LighthouseHeaderSVG from 'assets/svg/lighthouse-challenge-header.svg'
import LighthouseActiveCard from 'images/lighthouse/challenge-ticket-active.png'
import LighthouseInactiveCard from 'images/lighthouse/challenge-ticket-inactive.png'

export interface MenuLayout {
    getHeaderSVG: () => React.ReactNode
    activeChallengeCardPath: StaticImageData
    inactiveChallengeCardPath: StaticImageData
    containerColor: string
    bgColor: string
    primaryColor: string
    textColor: string
}

export function getLayoutByCharacter(character?: CHARACTER): MenuLayout {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                getHeaderSVG: () => <LighthouseHeaderSVG />,
                activeChallengeCardPath: LighthouseActiveCard,
                inactiveChallengeCardPath: LighthouseInactiveCard,
                containerColor: 'bg-ivory-dark',
                bgColor: 'bg-cherry-light',
                primaryColor: 'bg-cherry',
                textColor: 'text-cherry',
            }
    }
}
