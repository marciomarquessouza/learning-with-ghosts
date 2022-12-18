import * as THREE from 'three'
import { PARAMS } from '../../const'
import { Scenario } from '../../models'

export interface CheckContactProps {
    vector: THREE.Vector3
    delta: number
    characterMesh: THREE.Mesh
    scenario: Scenario
}

export default function checkContact({
    vector,
    delta,
    characterMesh,
    scenario,
}: CheckContactProps): boolean {
    let originPoint = characterMesh.position.clone()
    const positionAttribute = characterMesh.geometry.getAttribute('position')
    const localVertex = new THREE.Vector3()
    const globalVertex = new THREE.Vector3()
    const nextPosition = characterMesh.position.clone()
    const scenarioColliders = scenario.colliders
    let hasCollision = false

    for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
        localVertex.fromBufferAttribute(positionAttribute, vertexIndex)
        globalVertex.copy(localVertex).applyMatrix4(characterMesh.matrix)
        const directionVector = globalVertex.sub(
            nextPosition.addScaledVector(
                vector,
                delta * PARAMS.GHOST_SPEED * PARAMS.COLLISION_LIMIT
            )
        )
        const raycaster = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
        const collisions = raycaster.intersectObjects(scenarioColliders)

        if (collisions.length > 0 && collisions[0].distance < directionVector.length()) {
            hasCollision = true
            break
        }
    }

    return hasCollision
}
