import { GhostTownGuiContextType } from 'types/GhostTownGui'
import { Utils } from '../../utils/types'
import { createInteractions } from '../interactions'
import { createLevels } from '../levels'
import { createScreenGUI } from '../screen-gui'
import { Services } from '../types'

export function createServices(utils: Utils, screenGuiContext: GhostTownGuiContextType): Services {
    const levels = createLevels()
    const interactions = createInteractions({ utils })
    const screenGUI = createScreenGUI(screenGuiContext)

    return {
        levels,
        interactions,
        screenGUI,
    }
}
