import * as THREE from 'three'
import { CHARACTER } from '../../const'

export interface CharacterDialogBox {
    character: CHARACTER
    dialogBox: THREE.Mesh[]
}

export class Scenario {
    private _scenarioCollisions: THREE.Mesh[] = []
    private _characterDialogBoxes: CharacterDialogBox[] = []

    public addScenarioCollision(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ff00,
            visible: false,
        })
        this._scenarioCollisions.push(mesh)
    }

    private _addCharacterDialogBox(character: CHARACTER, mesh: THREE.Mesh) {
        const characterDialogBox = this._characterDialogBoxes.find(
            (characterDialogBox) => characterDialogBox.character === character
        )
        characterDialogBox
            ? characterDialogBox.dialogBox.push(mesh)
            : this._characterDialogBoxes.push({
                  character,
                  dialogBox: [mesh],
              })
    }

    public addPrincessDialogBox(mesh: THREE.Mesh) {
        mesh.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x00ffff,
            visible: false,
        })
        this._addCharacterDialogBox(CHARACTER.PRINCESS, mesh)
    }

    get colliders() {
        return this._scenarioCollisions
    }

    get characterDialogBoxes() {
        return this._characterDialogBoxes
    }
}
