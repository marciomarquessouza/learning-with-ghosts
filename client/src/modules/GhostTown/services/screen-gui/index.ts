import { GameGuiContextType } from 'modules/GhostTown/contexts/GameGuiContext'
import { ScreenGUI } from './ScreenGUI'

function createScreenGUI(context: GameGuiContextType) {
    return new ScreenGUI(context)
}

export { createScreenGUI, ScreenGUI }
