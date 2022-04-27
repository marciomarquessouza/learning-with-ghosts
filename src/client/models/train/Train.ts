import * as THREE from 'three'
import { ACTION_STATUS, PARAMS } from '../../const'

export class Train {
    private _currentStatus = ACTION_STATUS.INITIAL
    private _trainMesh: THREE.Mesh | undefined
    private _arrivalAction: THREE.AnimationAction | undefined
    private _departureAction: THREE.AnimationAction | undefined

    set currentStatus(status: ACTION_STATUS) {
        this._currentStatus = status
    }

    get currentStatus(): ACTION_STATUS {
        return this._currentStatus
    }

    set trainMesh(mesh: THREE.Mesh) {
        this._trainMesh = mesh
    }

    set arrivalAction(animationAction: THREE.AnimationAction) {
        this._arrivalAction = animationAction
    }

    set departureAction(animationAction: THREE.AnimationAction) {
        this._departureAction = animationAction
    }

    visible(value: boolean): void {
        if (this._trainMesh) {
            this._trainMesh.visible = value
        } else {
            console.error('Train mesh was not initialized')
        }
    }

    startArrivalAnimation(speed = PARAMS.TRAIN_SPEED): void {
        if (this._arrivalAction) {
            this._arrivalAction.timeScale = speed
            this._arrivalAction.clampWhenFinished = true
            this._arrivalAction.loop = THREE.LoopOnce
            this._arrivalAction.play()
        } else {
            console.error('Train Arrival animation was not initialized')
        }
    }

    startDepartureAnimation(speed = PARAMS.TRAIN_SPEED): void {
        if (this._departureAction) {
            this._departureAction.timeScale = speed
            this._departureAction.clampWhenFinished = true
            this._departureAction.loop = THREE.LoopOnce
            this._departureAction.play()
        } else {
            console.error('Train Departure animation was not initialized')
        }
    }
}

export function createTrainModel(): Train {
    return new Train()
}
