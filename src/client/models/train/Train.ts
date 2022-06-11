import * as THREE from 'three'
import { PARAMS } from '../../const'

export class Train {
    private _arrivalAction: THREE.AnimationAction | undefined
    private _departureAction: THREE.AnimationAction | undefined

    set arrivalAction(animationAction: THREE.AnimationAction) {
        this._arrivalAction = animationAction
    }

    set departureAction(animationAction: THREE.AnimationAction) {
        this._departureAction = animationAction
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
