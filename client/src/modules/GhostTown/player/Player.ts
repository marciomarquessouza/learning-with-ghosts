import * as THREE from 'three'
import { Dialog, User } from 'types'

import { CHARACTER, PARAMS } from '../const'
import { Models } from '../models/types'
import { SceneComponents } from '../scenes/types'
import { Services } from '../services/types'
import { PlayerControls } from './controls'
import { checkContact } from './helpers'

export class Player extends PlayerControls {
    public lives = 5
    public chapter = 1
    public day = 1
    public step = 1
    private _interactionGenerator: Generator<Dialog, void, unknown> | null = null
    constructor(
        services: Services,
        sceneComponents: SceneComponents,
        user: User,
        private models: Models
    ) {
        const playerMesh = models.ghost
        super(services, sceneComponents, playerMesh)
        this.chapter = user.chapter
        this.day = user.day
        this.lives = user.lives
    }

    reset() {
        this._characterVelocity.set(0, 0, 0)
        this.sceneComponents.controls.target.copy(this.playerMesh.characterArmature.position)
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

    handleCollision(vector: THREE.Vector3, delta: number): boolean {
        const { hasCollision } = checkContact({
            vector,
            delta,
            characterMesh: this.playerMesh.characterMesh,
            scenario: this.models.scenario,
            screenGUI: this.services.screenGUI,
            onTalk: this.startInteraction.bind(this),
        })

        return hasCollision
    }

    setPosition(vector: THREE.Vector3, quaternion: THREE.Quaternion, delta: number): void {
        if (!this.playerMesh.characterArmature) {
            throw new Error('Error to load Ghost Model')
        }

        if (!this.playerMesh.isLocked) {
            const characterQuaternion = this.playerMesh.characterMesh.quaternion.clone()
            const hasCollisions = this.handleCollision(vector, delta)

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
}
