import { ScreenGUI as ScreenDataAction } from 'hooks/useScreenGUI'
import { ScreenGUI } from './ScreenGUI'

function createScreenGUI({ actions }: ScreenDataAction) {
    return new ScreenGUI(actions)
}

export { createScreenGUI, ScreenGUI }
