import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Scenario } from '../scenario/Scenario'
import { ScreenGUI } from '../screen-gui/ScreenGUI'

export default class CharacterControls {
    characterMeshes: THREE.Mesh[] = []
    characterGroup = new THREE.Group()
    characterArmature: THREE.Object3D | undefined
    characterMesh = new THREE.Mesh()
    characterVelocity = new THREE.Vector3()
    camera: THREE.PerspectiveCamera
    controls: OrbitControls
    scenario: Scenario
    screenGUI: ScreenGUI
    protected _lockCommands = false
    protected _fwdPressed = false
    protected _bkdPressed = false
    protected _lftPressed = false
    protected _rgtPressed = false
    protected _escPressed = false
    protected _spacePressed = false
    protected _iPressed = false
    protected _mPressed = false

    constructor(
        camera: THREE.PerspectiveCamera,
        controls: OrbitControls,
        scenario: Scenario,
        screenGUI: ScreenGUI
    ) {
        this.camera = camera
        this.controls = controls
        this.scenario = scenario
        this.screenGUI = screenGUI
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
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (this._lockCommands) {
            this._setKeyPressed(event, true)
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (this._lockCommands) {
            this._setKeyPressed(event, false)
        }
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

        if (this._escPressed) {
            this.screenGUI.closeActiveMenus()
        }

        if (this._iPressed) {
        }

        this.characterArmature.updateMatrixWorld()
        this.camera.position.sub(this.controls.target)
        this.controls.target.copy(this.characterMesh.position)
        this.camera.position.add(this.characterMesh.position)
    }
}
