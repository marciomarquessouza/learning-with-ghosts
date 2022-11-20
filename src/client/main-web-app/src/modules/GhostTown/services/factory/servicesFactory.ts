import { Utils } from '../../utils/types'
import { createInteractions } from '../interactions'
import { createLevels } from '../levels'
import { createScreenGUI } from '../screen-gui'
import { Services } from '../types'
import { ScreenGUI } from 'modules/GhostTown/hooks/useScreenGUI'

export function createServices(utils: Utils, screenDataActions: ScreenGUI): Services {
    const levels = createLevels()
    const interactions = createInteractions({ utils })
    const screenGUI = createScreenGUI(screenDataActions)

    return {
        levels,
        interactions,
        screenGUI,
    }
}
