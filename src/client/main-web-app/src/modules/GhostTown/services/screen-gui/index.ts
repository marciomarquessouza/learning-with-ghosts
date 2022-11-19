import { ScreenGUI as ScreenDataAction } from 'hooks/useScreenGUI'
import { ScreenGUI } from './ScreenGUI'

function createScreenGUI({ data, actions }: ScreenDataAction) {
    return new ScreenGUI(data, actions)
}

export { createScreenGUI, ScreenGUI }
