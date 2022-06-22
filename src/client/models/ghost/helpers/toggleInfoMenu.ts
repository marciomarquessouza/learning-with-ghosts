import * as THREE from 'three'
import { CHARACTER, INFO_MENU } from '../../../const'
import { ScreenGUI } from '../../../services/screen-gui/ScreenGUI'

export interface ToggleInfoMenuProps {
    contacts: THREE.Intersection<THREE.Object3D<THREE.Event>>[]
    directionVector: THREE.Vector3
    screenGUI: ScreenGUI
    character: CHARACTER
    isInfoMenuOpen: boolean
    onTalk?: (character: CHARACTER) => void
}

export default function toggleInfoMenu({
    contacts,
    directionVector,
    screenGUI,
    character,
    isInfoMenuOpen,
    onTalk,
}: ToggleInfoMenuProps): boolean {
    if (contacts.length > 0 && contacts[0].distance < directionVector.length()) {
        if (!isInfoMenuOpen) {
            screenGUI.showInfoMenu({ ...INFO_MENU[character], onTalk })
        }
        return true
    } else {
        if (isInfoMenuOpen) {
            screenGUI.closeInfoMenu()
        }
        return false
    }
}
