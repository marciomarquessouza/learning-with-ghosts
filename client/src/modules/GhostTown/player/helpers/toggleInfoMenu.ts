import * as THREE from 'three'
import { CHARACTER, INFO_MENU, NPC_LIST } from '../../const'
import { ScreenGUI } from '../../services'
import { menuObserver } from 'modules/GhostTown/observers'

export interface ToggleInfoMenuProps {
    scene: THREE.Scene
    playerPosition: THREE.Vector3
    screenGUI: ScreenGUI
    startInteraction?: (character: CHARACTER) => void
}

export default function toggleInfoMenu({
    scene,
    playerPosition,
    screenGUI,
    startInteraction,
}: ToggleInfoMenuProps): void {
    let hasContactWith: string = ''
    const infoMenu = menuObserver.getInfoMenuState()

    for (let index = 0; index <= NPC_LIST.length - 1; index++) {
        const npc = scene.getObjectByName(NPC_LIST[index])
        if (npc) {
            const distance = playerPosition.distanceTo(npc.position)
            hasContactWith = distance <= 10 ? npc.name : ''
        }
    }

    if (hasContactWith) {
        if (!infoMenu.isOpen) {
            screenGUI.showInfoMenu({ ...INFO_MENU[hasContactWith], onTalk: startInteraction })
        }
    } else {
        if (infoMenu.isOpen) {
            screenGUI.closeInfoMenu()
        }
    }
}
