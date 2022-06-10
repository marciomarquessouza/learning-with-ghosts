import * as THREE from 'three'

export class Scenario {
    private _scenarioCollisions: THREE.Mesh[] = []
    private _princessDialogs: THREE.Mesh[] = []

    public addScenarioCollision(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ff00,
            visible: false,
        })
        this._scenarioCollisions.push(mesh)
    }

    public addPrincessDialog(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ffff,
            visible: false,
        })
        this._princessDialogs.push(mesh)
    }

    get colliders() {
        return this._scenarioCollisions
    }

    get princessDialogs() {
        return this._princessDialogs
    }
}

export function createScenario() {
    return new Scenario()
}
