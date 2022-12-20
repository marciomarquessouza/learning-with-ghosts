import { GhostTownGuiContextType } from 'modules/GhostTown/contexts/GhostTownGUIContext'
import { ScreenGUI } from './ScreenGUI'

function createScreenGUI(context: GhostTownGuiContextType) {
    return new ScreenGUI(context)
}

export { createScreenGUI, ScreenGUI }
