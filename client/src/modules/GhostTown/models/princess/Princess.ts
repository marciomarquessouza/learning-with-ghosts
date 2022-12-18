import * as THREE from 'three'
import { CHARACTER, MESHES } from 'modules/GhostTown/const'

export class Princess {
    private _princessMeshes: THREE.Mesh[] = []
    private _levitationAction: THREE.AnimationAction | undefined
    private _meshGroup = new THREE.Group()

    set levitationAction(animationAction: THREE.AnimationAction) {
        this._levitationAction = animationAction
    }

    public addMesh(mesh: THREE.Mesh) {
        mesh.frustumCulled = false
        this._princessMeshes.push(mesh)
    }

    public init(scene: THREE.Scene) {
        this._princessMeshes.forEach((mesh) => {
            this._meshGroup.add(mesh)
            if (mesh.name.includes(MESHES.PRINCESS_DIALOG)) {
                mesh.visible = false
                this._meshGroup.position.copy(mesh.position)
            }
        })
        this._meshGroup.name = CHARACTER.PRINCESS
        scene.add(this._meshGroup)
    }

    public startLevitationAnimation(): void {
        if (this._levitationAction) {
            this._levitationAction.play()
        } else {
            console.error('Princess Levitation Action was not loaded properly')
        }
    }
}
