import { CHARACTER, DIALOG_MENU, EXPRESSION, PARAMS } from '../const'
import { Models } from '../models/types'
import { SceneComponents } from '../scenes/types'
import { Services } from '../services/types'
import { PlayerControls } from './controls'
import Helpers from './helpers'

export class Player extends PlayerControls {
    constructor(
        services: Services,
        sceneComponents: SceneComponents,
        private models: Models,
        private helpers = Helpers
    ) {
        const player = models.ghost
        super(services, sceneComponents, player)
    }

    reset() {
        this._characterVelocity.set(0, 0, 0)
        this.sceneComponents.controls.target.copy(this.player.characterArmature.position)
    }

    interaction(character: CHARACTER): void {
        this.services.screenGUI.closeInfoMenu()
        this.sceneComponents.camera.zoomIn()
        this.player.isLocked = true
        const nextInteraction = () => {
            this.services.screenGUI.showDialogMenu({
                character,
                expression: DIALOG_MENU[character].expressions[EXPRESSION.HAPPINESS],
                title: DIALOG_MENU[character].title,
                text: 'Hello strange!!!',
                onClose: () => this.stopInteraction(),
            })
            nextInteraction()
        }
    }

    handleCollision(vector: THREE.Vector3, delta: number): boolean {
        const { hasCollision } = this.helpers.checkContact({
            vector,
            delta,
            characterMesh: this.player.characterMesh,
            scenario: this.models.scenario,
            screenGUI: this.services.screenGUI,
            onTalk: this.interaction.bind(this),
        })

        return hasCollision
    }

    setPosition(vector: THREE.Vector3, quaternion: THREE.Quaternion, delta: number): void {
        if (!this.player.characterArmature) {
            throw new Error('Error to load Ghost Model')
        }

        if (!this.player.isLocked) {
            const characterQuaternion = this.player.characterMesh.quaternion.clone()
            const hasCollisions = this.handleCollision(vector, delta)

            if (!hasCollisions) {
                characterQuaternion.slerp(quaternion, delta * PARAMS.GHOST_SPEED)
                this.player.characterMesh.quaternion.copy(characterQuaternion)
                this.player.characterMesh.position.addScaledVector(
                    vector,
                    delta * PARAMS.GHOST_SPEED
                )
                this.player.characterArmature.copy(this.player.characterMesh)
            }
        }
    }
}
