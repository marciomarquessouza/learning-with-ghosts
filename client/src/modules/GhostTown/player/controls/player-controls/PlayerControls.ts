import * as THREE from 'three'

import { CHARACTER } from '../../../const'
import { Services } from '../../../services/types'
import { SceneComponents } from '../../../scenes/types'
import { GAME_KEYS, KeyboardInputs } from '../keyboard-inputs/KeyboardInputs'
import { Models, PlayerMesh } from '../../../models/types'

export class PlayerControls extends KeyboardInputs {
    protected _characterVelocity = new THREE.Vector3()
    protected _isInInteraction = false

    constructor(
        protected services: Services,
        protected sceneComponents: SceneComponents,
        protected models: Models,
        public playerMesh: PlayerMesh
    ) {
        super()
    }

    checkInteraction(playerPosition: THREE.Vector3) {
        throw new Error('You need to implement the startInteraction method')
    }

    startInteraction(character: CHARACTER) {
        throw new Error('You need to implement the startInteraction method')
    }

    nextInteraction() {
        throw new Error('You need to implement the nexInteraction method')
    }

    stopInteraction() {
        throw new Error('You need to implement the stopInteraction method')
    }

    checkCollision(vector: THREE.Vector3, delta: number): boolean {
        throw new Error('You need to implement the checkCollision method')
    }

    protected setPosition(
        vector: THREE.Vector3,
        quaternion: THREE.Quaternion,
        delta: number
    ): void {
        throw new Error('You need to implement the _setPosition method')
    }

    updateControls(delta: number): void {
        if (!this.playerMesh.characterArmature) {
            throw new Error('Error loading Ghost Model')
        }

        const quaternion = new THREE.Quaternion()
        this.playerMesh.characterMesh.position.addScaledVector(this._characterVelocity, delta)

        if (this.gameKeysInputs.fwdPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
            this.setPosition(new THREE.Vector3(1, 0, 0), quaternion, delta)
        }

        if (this.gameKeysInputs.bkdPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0)
            this.setPosition(new THREE.Vector3(-1, 0, 0), quaternion, delta)
        }

        if (this.gameKeysInputs.lftPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            this.setPosition(new THREE.Vector3(0, 0, -1), quaternion, delta)
        }

        if (this.gameKeysInputs.rgtPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            this.setPosition(new THREE.Vector3(0, 0, 1), quaternion, delta)
        }

        if (this.gameKeysInputs.escPressed && !this._pressed) {
            this.stopInteraction()
            this._pressed = true
        }

        if (this.gameKeysInputs.iPressed && !this._pressed) {
            const infoMenu = this.services.screenGUI.isInfoMenuOpenWith()
            if (infoMenu.isOpen) {
                this.services.screenGUI.onKeyDown(GAME_KEYS.I_KEY)
                // this.services.screenGUI.callChallenge(infoMenu.openedWith)
                this._pressed = true
            }
        }

        if (this.gameKeysInputs.mPressed && !this._pressed) {
            const infoMenu = this.services.screenGUI.isInfoMenuOpenWith()
            if (infoMenu.isOpen && infoMenu.openedWith) {
                this.services.screenGUI.onKeyDown(GAME_KEYS.M_KEY)
                this.services.screenGUI.showChallengeMenu(infoMenu.openedWith)
                this._pressed = true
            }
        }

        if (this.gameKeysInputs.spacePressed && !this._pressed) {
            const infoMenu = this.services.screenGUI.isInfoMenuOpenWith()

            if (infoMenu.isOpen && infoMenu.openedWith && !this._isInInteraction) {
                this.services.screenGUI.onKeyDown(GAME_KEYS.SPACE_KEY)
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
