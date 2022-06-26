import * as THREE from 'three'

import { CHARACTER } from '../../../const'
import { Services } from '../../../services/types'
import { SceneComponents } from '../../../scenes/types'
import { KeyboardInputs } from '../keyboard-inputs/KeyboardInputs'
import { PlayerMesh } from '../../../models/types'

export class PlayerControls extends KeyboardInputs {
    protected _characterVelocity = new THREE.Vector3()
    protected _isInInteraction = false

    constructor(
        protected services: Services,
        protected sceneComponents: SceneComponents,
        protected playerMesh: PlayerMesh
    ) {
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

    nextInteraction() {
        throw new Error('You need to implement the nexInteraction method')
    }

    startInteraction(character: CHARACTER) {
        throw new Error('You need to implement the startInteraction method')
    }

    stopInteraction() {
        this.services.screenGUI.closeActiveMenus()
        this.sceneComponents.camera.zoomOut()
        this.playerMesh.isLocked = false
        this._isInInteraction = false
    }

    updateControls(delta: number): void {
        if (!this.playerMesh.characterArmature) {
            throw new Error('Error loading Ghost Model')
        }

        const quaternion = new THREE.Quaternion()
        this.playerMesh.characterMesh.position.addScaledVector(this._characterVelocity, delta)

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

            if (infoMenu.isOpen && infoMenu.openedWith && !this._isInInteraction) {
                this.startInteraction(infoMenu.openedWith)
            }

            if (!infoMenu.isOpen && this._isInInteraction) {
                this.nextInteraction()
            }

            this._pressed = true
        }

        this.playerMesh.characterArmature.updateMatrixWorld()
        this.sceneComponents.camera.perspectiveCamera.position.sub(
            this.sceneComponents.controls.target
        )
        this.sceneComponents.controls.target.copy(this.playerMesh.characterMesh.position)
        this.sceneComponents.camera.perspectiveCamera.position.add(
            this.playerMesh.characterMesh.position
        )
    }
}