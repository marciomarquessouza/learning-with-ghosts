import * as THREE from 'three'
import { CHARACTERS, INFO_MENU } from '../../../const'
import { ScreenGUI } from '../../screen-gui/ScreenGUI'

export interface ToggleInfoMenuProps {
    contacts: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
    directionVector: THREE.Vector3
    screenGUI: ScreenGUI
    character: CHARACTERS
    isInfoMenuOpen: boolean
}

export default function toggleInfoMenu({
    contacts,
    directionVector,
    screenGUI,
    character,
    isInfoMenuOpen,
}: ToggleInfoMenuProps): boolean {
    if (contacts.length > 0 && contacts[0].distance < directionVector.length()) {
        if (!isInfoMenuOpen) {
            screenGUI.showInfoMenu(INFO_MENU[character])
        }
        return true
    } else {
        if (isInfoMenuOpen) {
            screenGUI.closeInfoMenu()
        }
        return false
    }
}
