import { GameGuiContextType } from 'modules/GhostTown/contexts/GameGuiContext'
import { Utils } from '../../utils/types'
import { createInteractions } from '../interactions'
import { createScreenGUI } from '../screen-gui'
import { Services } from '../types'

export function createServices(utils: Utils, gameGui: GameGuiContextType): Services {
    const interactions = createInteractions({ utils })
    const screenGUI = createScreenGUI(gameGui)

    return {
        interactions,
        screenGUI,
    }
}
