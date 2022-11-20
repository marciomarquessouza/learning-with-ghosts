import * as THREE from 'three'
import { PlayerMesh } from '../types'

export class Ghost implements PlayerMesh {
    private _geometry = new THREE.BoxGeometry(2.5, 5, 2.5)
    private _material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        visible: false,
    })
    private _characterMesh = new THREE.Mesh(this._geometry, this._material)
    private _characterMeshes: THREE.Mesh[] = []
    private _characterGroup = new THREE.Group()
    private _characterArmature = new THREE.Object3D()
    private _isLocked = true
    private _levitationAction: THREE.AnimationAction | undefined

    get characterMesh(): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]> {
        return this._characterMesh
    }

    get characterMeshes(): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>[] {
        return this._characterMeshes
    }

    get characterGroup(): THREE.Group {
        return this._characterGroup
    }

    get characterArmature(): THREE.Object3D<THREE.Event> {
        return this._characterArmature
    }

    set isLocked(value: boolean) {
        this._isLocked = value
    }

    get isLocked(): boolean {
        return this._isLocked
    }

    set ghostArmature(armature: THREE.Object3D) {
        this._characterArmature = armature
    }

    set levitationAction(animationAction: THREE.AnimationAction) {
        this._levitationAction = animationAction
    }

    addMesh(mesh: THREE.Mesh) {
        mesh.frustumCulled = false
        this._characterMeshes.push(mesh)
    }

    init(scene: THREE.Scene) {
        scene.add(this._characterGroup)
        this._characterMeshes.forEach((mesh) => {
            this._characterGroup.add(mesh)
        })
        this._characterArmature?.position.set(0, 4, -16)
        this.visible(false)

        this._characterMesh.position.set(0, 4, -16)
        scene.add(this._characterMesh)
    }

    visible(value: boolean): void {
        if (this.characterGroup && this.characterArmature) {
            this.characterGroup.visible = value
        } else {
            console.error('Ghost Mesh was not loaded properly')
        }
    }

    startLevitationAnimation(): void {
        this.isLocked = false
        this.visible(true)
        if (this._levitationAction) {
            this._levitationAction.play()
        } else {
            console.error('Ghost Levitation Action was not loaded properly')
        }
    }
}
