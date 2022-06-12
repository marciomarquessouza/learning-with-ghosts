import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { CHARACTERS, PARAMS } from '../../const'
import CharacterControls from '../character-control/CharacterControl'
import { Scenario } from '../scenario/Scenario'
import { ScreenGUI } from '../screen-gui/ScreenGUI'
import { CheckCollision, CheckCollisionProps } from './helpers/checkCollision'

export class Ghost extends CharacterControls {
    characterMeshes: THREE.Mesh[] = []
    characterGroup = new THREE.Group()
    characterArmature: THREE.Object3D | undefined
    characterMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 5, 2.5),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, visible: false })
    )
    characterVelocity = new THREE.Vector3()
    private _levitationAction: THREE.AnimationAction | undefined
    private _isInfoMenuOpen = false
    private _hasContactWith: CHARACTERS | null = null

    constructor(
        camera: THREE.PerspectiveCamera,
        controls: OrbitControls,
        scenario: Scenario,
        screenGUI: ScreenGUI,
        private checkCollisions: (props: CheckCollisionProps) => CheckCollision
    ) {
        super(camera, controls, scenario, screenGUI)
    }

    set ghostArmature(armature: THREE.Object3D) {
        this.characterArmature = armature
    }

    set levitationAction(animationAction: THREE.AnimationAction) {
        this._levitationAction = animationAction
    }

    addMesh(mesh: THREE.Mesh) {
        mesh.frustumCulled = false
        this.characterMeshes.push(mesh)
    }

    init(scene: THREE.Scene) {
        scene.add(this.characterGroup)
        this.characterMeshes.forEach((mesh) => {
            this.characterGroup.add(mesh)
        })
        this.characterArmature?.position.set(0, 4, -16)
        this.visible(false)

        this.characterMesh.position.set(0, 4, -16)
        scene.add(this.characterMesh)
    }

    reset() {
        this.characterVelocity.set(0, 0, 0)
        if (this.characterArmature) this.controls.target.copy(this.characterArmature.position)
    }

    visible(value: boolean): void {
        if (this.characterGroup && this.characterArmature) {
            this.characterGroup.visible = value
        } else {
            console.error('Ghost Mesh was not loaded properly')
        }
    }

    startLevitationAnimation(): void {
        this.visible(true)
        this._lockCommands = true
        if (this._levitationAction) {
            this._levitationAction.play()
        } else {
            console.error('Ghost Levitation Action was not loaded properly')
        }
    }

    handleCollision(vector: THREE.Vector3, delta: number): boolean {
        const { hasCollision, contactWith, isInfoMenuOpen } = this.checkCollisions({
            vector,
            delta,
            characterMesh: this.characterMesh,
            scenario: this.scenario,
            screenGUI: this.screenGUI,
        })

        this._hasContactWith = contactWith
        this._isInfoMenuOpen = isInfoMenuOpen

        return hasCollision
    }

    setPosition(vector: THREE.Vector3, quaternion: THREE.Quaternion, delta: number): void {
        if (!this.characterArmature) {
            throw new Error('Error to load Ghost Model')
        }

        const characterQuaternion = this.characterMesh.quaternion.clone()
        const hasCollisions = this.handleCollision(vector, delta)

        if (!hasCollisions) {
            characterQuaternion.slerp(quaternion, delta * PARAMS.GHOST_SPEED)
            this.characterMesh.quaternion.copy(characterQuaternion)
            this.characterMesh.position.addScaledVector(vector, delta * PARAMS.GHOST_SPEED)
            this.characterArmature.copy(this.characterMesh)
        }
    }
}
