import * as THREE from 'three'

import { CHARACTER } from '../../../const'
import KeyboardControls from '../keyboard-control/KeyboardControls'
import { Services } from '../../../services/types'
import { SceneComponents } from '../../../scenes/types'

export interface CharacterControlsProps {}

export default class CharacterControls extends KeyboardControls {
    characterMesh = new THREE.Mesh()
    characterMeshes: THREE.Mesh[] = []
    characterGroup = new THREE.Group()
    characterArmature: THREE.Object3D | undefined
    characterVelocity = new THREE.Vector3()

    constructor(protected services: Services, protected sceneComponents: SceneComponents) {
        super()
    }

    protected setPosition(
        vector: THREE.Vector3,
        quaternion: THREE.Quaternion,
        delta: number
    ): void {
        throw new Error('You need to implement the _setPosition method')
    }

    handleCollision(vector: THREE.Vector3, delta: number): boolean {
        throw new Error('You need to implement the _setPosition method')
    }

    talk(character: CHARACTER) {
        throw new Error('You need to implement the talk method')
    }

    stopInteraction() {
        this.services.screenGUI.closeActiveMenus()
        this.sceneComponents.camera.zoomOut()
        this._lockCommands = false
    }

    updateControls(delta: number): void {
        if (!this.characterArmature) {
            throw new Error('Error loading Ghost Model')
        }

        const quaternion = new THREE.Quaternion()
        this.characterMesh.position.addScaledVector(this.characterVelocity, delta)

        if (this._fwdPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
            this.setPosition(new THREE.Vector3(1, 0, 0), quaternion, delta)
        }

        if (this._bkdPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0)
            this.setPosition(new THREE.Vector3(-1, 0, 0), quaternion, delta)
        }

        if (this._lftPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            this.setPosition(new THREE.Vector3(0, 0, -1), quaternion, delta)
        }

        if (this._rgtPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            this.setPosition(new THREE.Vector3(0, 0, 1), quaternion, delta)
        }

        if (this._escPressed && !this._pressed) {
            this.stopInteraction()
            this._pressed = true
        }

        if (this._iPressed && !this._pressed) {
            this._pressed = true
        }

        if (this._spacePressed && !this._pressed) {
            const infoMenu = this.services.screenGUI.isInfoMenuOpenWith()

            if (infoMenu.isOpen && infoMenu.openedWith) {
                this.talk(infoMenu.openedWith)
            }

            this._pressed = true
        }

        this.characterArmature.updateMatrixWorld()
        this.sceneComponents.camera.perspectiveCamera.position.sub(
            this.sceneComponents.controls.target
        )
        this.sceneComponents.controls.target.copy(this.characterMesh.position)
        this.sceneComponents.camera.perspectiveCamera.position.add(this.characterMesh.position)
    }
}
