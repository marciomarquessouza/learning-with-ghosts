import { GhostTownGuiContextType } from 'types/GhostTownGui'
import { ScreenGUI } from './ScreenGUI'

function createScreenGUI(context: GhostTownGuiContextType) {
    return new ScreenGUI(context)
}

export { createScreenGUI, ScreenGUI }
