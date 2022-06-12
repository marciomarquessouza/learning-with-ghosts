import * as THREE from 'three'
import { CHARACTERS, PARAMS } from '../../../const'
import { Scenario } from '../../scenario/Scenario'
import { ScreenGUI } from '../../screen-gui/ScreenGUI'
import toggleInfoMenu from './toggleInfoMenu'

export interface CheckCollisionProps {
    vector: THREE.Vector3
    delta: number
    characterMesh: THREE.Mesh
    scenario: Scenario
    screenGUI: ScreenGUI
}

export interface CheckCollision {
    hasCollision: boolean
    isInfoMenuOpen: boolean
    contactWith: CHARACTERS
}

export default function checkCollisions({
    vector,
    delta,
    characterMesh,
    scenario,
    screenGUI,
}: CheckCollisionProps): CheckCollision {
    let originPoint = characterMesh.position.clone()
    const positionAttribute = characterMesh.geometry.getAttribute('position')
    const localVertex = new THREE.Vector3()
    const globalVertex = new THREE.Vector3()
    const nextPosition = characterMesh.position.clone()
    const scenarioColliders = scenario.colliders
    const princessDialogs = scenario.princessDialogs
    let hasCollision = false
    let isInfoMenuOpen = false
    let contactWith: CHARACTERS = CHARACTERS.GHOST

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
        const characterContacts = [
            {
                character: CHARACTERS.PRINCESS,
                contacts: raycaster.intersectObjects(princessDialogs),
            },
        ]
        const { hasDialogContact, contact } = characterContacts.reduce(
            (result, { character, contacts }) => {
                const hasContact = toggleInfoMenu({
                    isInfoMenuOpen,
                    directionVector,
                    contacts,
                    character,
                    screenGUI,
                })

                return hasContact ? { hasDialogContact: hasContact, contact: character } : result
            },
            { hasDialogContact: false, contact: CHARACTERS.PRINCESS }
        )

        isInfoMenuOpen = hasDialogContact
        contactWith = contact

        if (collisions.length > 0 && collisions[0].distance < directionVector.length()) {
            hasCollision = true
            break
        }
    }

    return { hasCollision, isInfoMenuOpen, contactWith }
}
