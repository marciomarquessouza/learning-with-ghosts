import { GROUND, SKY, LIGHTHOUSE_BACKGROUND, WIDTH } from '../../const'
import { Scenario } from '../../entities'

export const scenario: Scenario = {
    name: 'phase-01',
    background: {
        x: 0,
        y: 0,
        image: LIGHTHOUSE_BACKGROUND,
    },
    platforms: [
        {
            x: WIDTH / 2,
            y: 568,
            image: GROUND,
        },
    ],
}
