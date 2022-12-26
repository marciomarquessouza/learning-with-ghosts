import { GameGuiContextType } from 'modules/GhostTown/contexts/GameGuiContext'
import { Utils } from '../../utils/types'
import { createInteractions } from '../interactions'
import { createLevels } from '../levels'
import { createScreenGUI } from '../screen-gui'
import { Services } from '../types'

export function createServices(utils: Utils, gameGui: GameGuiContextType): Services {
    const levels = createLevels()
    const interactions = createInteractions({ utils })
    const screenGUI = createScreenGUI(gameGui)

    return {
        levels,
        interactions,
        screenGUI,
    }
}
