import { GROUND, SKY } from '../../const'
import { Scenario } from '../../entities'

export const scenario: Scenario = {
    name: 'phase-01',
    background: {
        x: 0,
        y: 0,
        image: SKY,
    },
    platforms: [
        {
            x: 400,
            y: 568,
            image: GROUND,
            scale: 2,
        },
        {
            x: 600,
            y: 400,
            image: GROUND,
        },
        {
            x: 50,
            y: 250,
            image: GROUND,
        },
        {
            x: 750,
            y: 220,
            image: GROUND,
        },
    ],
}
