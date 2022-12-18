import * as THREE from 'three'
import { Dialog, PlayerData } from 'types'
import { PlayerDependencies } from '.'

import { CHARACTER, PARAMS } from '../const'
import { PlayerControls } from './controls'
import { checkContact, toggleInfoMenu } from './helpers'

export class Player extends PlayerControls {
    public lives = 5
    public chapter = 1
    public day = 1
    public step = 1
    private _interactionGenerator: Generator<Dialog, void, unknown> | null = null

    constructor(private dependencies: PlayerDependencies, playerData: PlayerData) {
        const { models, services, sceneComponents } = dependencies
        const playerMesh = models.ghost
        super(services, sceneComponents, models, playerMesh)
        this.lives = playerData.lives
        this.chapter = playerData.chapter
        this.day = playerData.day
    }

    reset() {
        this._characterVelocity.set(0, 0, 0)
        this.sceneComponents.controls.target.copy(this.playerMesh.characterArmature.position)
    }

    checkInteraction(playerPosition: THREE.Vector3) {
        toggleInfoMenu({
            playerPosition,
            scene: this.dependencies.scene,
            screenGUI: this.services.screenGUI,
            startInteraction: this.startInteraction.bind(this),
        })
    }

    startInteraction(character: CHARACTER): void {
        this._isInInteraction = true
        this.services.screenGUI.closeInfoMenu()
        this.sceneComponents.camera.zoomIn()
        this.playerMesh.isLocked = true
        this._interactionGenerator = this.services.interactions.getInteractions(
            this.day,
            this.step,
            character
        )
        this.nextInteraction()
    }

    nextInteraction() {
        if (!this._interactionGenerator) {
            throw new Error('error to load interaction generator')
        }
        const interactionGenerator = this._interactionGenerator
        const interactionData = interactionGenerator.next().value
        if (!interactionData) {
            return this.stopInteraction()
        }
        const { expression, text, from: character } = interactionData
        this.services.screenGUI.showDialogMenu({
            character,
            expression,
            text,
            onClose: this.stopInteraction.bind(this),
            onNext: this.nextInteraction.bind(this),
        })
    }

    stopInteraction() {
        this.services.screenGUI.closeActiveMenus()
        this.sceneComponents.camera.zoomOut()
        this.playerMesh.isLocked = false
        this._isInInteraction = false
    }

    checkCollision(vector: THREE.Vector3, delta: number): boolean {
        return checkContact({
            vector,
            delta,
            characterMesh: this.playerMesh.characterMesh,
            scenario: this.models.scenario,
        })
    }

    setPosition(vector: THREE.Vector3, quaternion: THREE.Quaternion, delta: number): void {
        if (!this.playerMesh.characterArmature) {
            throw new Error('Error to load Ghost Model')
        }

        if (this.playerMesh.isLocked) return

        const characterQuaternion = this.playerMesh.characterMesh.quaternion.clone()
        this.checkInteraction(this.playerMesh.characterMesh.position)
        const hasCollisions = this.checkCollision(vector, delta)

        if (!hasCollisions) {
            characterQuaternion.slerp(quaternion, delta * PARAMS.GHOST_SPEED)
            this.playerMesh.characterMesh.quaternion.copy(characterQuaternion)
            this.playerMesh.characterMesh.position.addScaledVector(
                vector,
                delta * PARAMS.GHOST_SPEED
            )
            this.playerMesh.characterArmature.copy(this.playerMesh.characterMesh)
        }
    }
}
