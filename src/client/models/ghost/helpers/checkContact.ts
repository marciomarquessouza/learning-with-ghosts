import * as THREE from 'three'
import { CHARACTER, PARAMS } from '../../../const'
import { Scenario } from '../../scenario/Scenario'
import { ScreenGUI } from '../../../services/screen-gui/ScreenGUI'
import toggleInfoMenu from './toggleInfoMenu'

export interface CheckContactProps {
    vector: THREE.Vector3
    delta: number
    characterMesh: THREE.Mesh
    scenario: Scenario
    screenGUI: ScreenGUI
    onTalk?: (character: CHARACTER) => void
}

export interface CheckContact {
    hasCollision: boolean
    isInfoMenuOpen: boolean
    contactWith: CHARACTER | null
}

export default function checkContact({
    vector,
    delta,
    characterMesh,
    scenario,
    screenGUI,
    onTalk,
}: CheckContactProps): CheckContact {
    let originPoint = characterMesh.position.clone()
    const positionAttribute = characterMesh.geometry.getAttribute('position')
    const localVertex = new THREE.Vector3()
    const globalVertex = new THREE.Vector3()
    const nextPosition = characterMesh.position.clone()
    const scenarioColliders = scenario.colliders
    const dialogBoxes = scenario.characterDialogBoxes
    let hasCollision = false
    let isInfoMenuOpen = false
    let contactWith: CHARACTER | null = null

    for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
        localVertex.fromBufferAttribute(positionAttribute, vertexIndex)
        globalVertex.copy(localVertex).applyMatrix4(characterMesh.matrix)
        let directionVector = globalVertex.sub(
            nextPosition.addScaledVector(
                vector,
                delta * PARAMS.GHOST_SPEED * PARAMS.COLLISION_LIMIT
            )
        )
        let raycaster = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
        let collisions = raycaster.intersectObjects(scenarioColliders)
        const characterContacts = dialogBoxes.map(({ character, dialogBox }) => ({
            character,
            contacts: raycaster.intersectObjects(dialogBox),
        }))

        if (collisions.length > 0 && collisions[0].distance < directionVector.length()) {
            hasCollision = true
            break
        }

        const { hasContact, contact } = characterContacts.reduce(
            (result, { character, contacts }) => {
                const hasContact = toggleInfoMenu({
                    isInfoMenuOpen,
                    directionVector,
                    contacts,
                    character,
                    screenGUI,
                    onTalk,
                })

                return hasContact ? { hasContact, contact: character } : result
            },
            { hasContact: false, contact: CHARACTER.GHOST }
        )

        isInfoMenuOpen = hasContact
        contactWith = contact
    }

    return { hasCollision, isInfoMenuOpen, contactWith }
}
