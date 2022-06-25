import { createInteractions } from '../interactions'
import { createLevels } from '../levels'
import { createScreenGUI } from '../screen-gui'
import { Services } from '../types'

export function createServices(): Services {
    const levels = createLevels()
    const interactions = createInteractions()
    const screenGUI = createScreenGUI()

    return {
        levels,
        interactions,
        screenGUI,
    }
}
