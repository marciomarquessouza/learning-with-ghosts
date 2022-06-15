import * as THREE from 'three'

import { CHARACTER, DIALOG_MENU, EXPRESSION, PARAMS } from '../../const'
import { GhostServices, GhostHelpers } from '.'
import CharacterControls from '../../scenes/controllers/character-control/CharacterControl'

export class Ghost extends CharacterControls {
    geometry = new THREE.BoxGeometry(2.5, 5, 2.5)
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, visible: false })
    characterMesh = new THREE.Mesh(this.geometry, this.material)
    private _levitationAction: THREE.AnimationAction | undefined

    constructor(services: GhostServices, private helpers: GhostHelpers) {
        super(services)
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
        if (this.characterArmature)
            this.services.controls.target.copy(this.characterArmature.position)
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
        this._lockCommands = false
        if (this._levitationAction) {
            this._levitationAction.play()
        } else {
            console.error('Ghost Levitation Action was not loaded properly')
        }
    }

    talk(character: CHARACTER): void {
        this.services.screenGUI.closeInfoMenu()
        this.services.camera.zoomIn()
        this._lockCommands = true
        this.services.screenGUI.showDialogMenu({
            character,
            expression: DIALOG_MENU[character].expressions[EXPRESSION.HAPPINESS],
            title: DIALOG_MENU[character].title,
            text: 'Hello strange!!!',
            onClose: () => this.stopInteraction(),
        })
    }

    handleCollision(vector: THREE.Vector3, delta: number): boolean {
        const { hasCollision } = this.helpers.checkContact({
            vector,
            delta,
            characterMesh: this.characterMesh,
            scenario: this.services.scenario,
            screenGUI: this.services.screenGUI,
            onTalk: this.talk.bind(this),
        })

        return hasCollision
    }

    setPosition(vector: THREE.Vector3, quaternion: THREE.Quaternion, delta: number): void {
        if (!this.characterArmature) {
            throw new Error('Error to load Ghost Model')
        }

        if (!this._lockCommands) {
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
}
