import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Scenario } from '../../../models/scenario/Scenario'
import { ScreenGUI } from '../../screen-gui/ScreenGUI'
import { CHARACTER } from '../../../const'
import { Camera } from '../../cameras/camera'

export interface CharacterControlsServices {
    camera: Camera
    controls: OrbitControls
    scenario: Scenario
    screenGUI: ScreenGUI
}

export default class CharacterControls {
    characterMesh = new THREE.Mesh()
    characterMeshes: THREE.Mesh[] = []
    characterGroup = new THREE.Group()
    characterArmature: THREE.Object3D | undefined
    characterVelocity = new THREE.Vector3()
    protected _lockCommands = true
    protected _fwdPressed = false
    protected _bkdPressed = false
    protected _lftPressed = false
    protected _rgtPressed = false
    protected _escPressed = false
    protected _spacePressed = false
    protected _iPressed = false
    protected _mPressed = false
    protected _pressed = false

    constructor(protected services: CharacterControlsServices) {}

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

    protected _setKeyPressed(event: KeyboardEvent, keyPressed: boolean): void {
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this._fwdPressed = keyPressed
                break
            case 'KeyS':
            case 'ArrowDown':
                this._bkdPressed = keyPressed
                break
            case 'KeyD':
            case 'ArrowRight':
                this._rgtPressed = keyPressed
                break
            case 'KeyA':
            case 'ArrowLeft':
                this._lftPressed = keyPressed
                break
            case 'Escape':
                this._escPressed = keyPressed
                break
            case 'KeyI':
                this._iPressed = keyPressed
                break
            case 'Space':
                this._spacePressed = keyPressed
                break
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        this._setKeyPressed(event, true)
    }

    onKeyUp(event: KeyboardEvent): void {
        this._setKeyPressed(event, false)
        this._pressed = false
    }

    talk(character: CHARACTER) {
        throw new Error('You need to implement the talk method')
    }

    stopInteraction() {
        this.services.screenGUI.closeActiveMenus()
        this.services.camera.zoomOut()
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
        this.services.camera.perspectiveCamera.position.sub(this.services.controls.target)
        this.services.controls.target.copy(this.characterMesh.position)
        this.services.camera.perspectiveCamera.position.add(this.characterMesh.position)
    }
}
