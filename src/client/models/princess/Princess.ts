import * as THREE from 'three'

export class Princess {
    private _princessMeshes: THREE.Mesh[] = []
    private _levitationAction: THREE.AnimationAction | undefined

    set levitationAction(animationAction: THREE.AnimationAction) {
        this._levitationAction = animationAction
    }

    public addMesh(mesh: THREE.Mesh) {
        mesh.frustumCulled = false
        this._princessMeshes.push(mesh)
    }

    public startLevitationAnimation(): void {
        if (this._levitationAction) {
            this._levitationAction.play()
        } else {
            console.error('Princess Levitation Action was not loaded properly')
        }
    }
}

export function createPrincess() {
    return new Princess()
}
