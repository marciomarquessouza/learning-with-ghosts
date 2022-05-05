import * as THREE from 'three'

export class Scenario {
    private _scenarioCollisions: THREE.Mesh[] = []

    public addScenarioCollision(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ff00,
            visible: false,
        })
        this._scenarioCollisions.push(mesh)
    }

    get colliders() {
        return this._scenarioCollisions
    }
}

export function createScenario() {
    return new Scenario()
}
