import * as THREE from 'three'
import { ACTION_STATUS, PARAMS } from '../../const'

export class Lighthouse {
    private _currentStatus = ACTION_STATUS.INITIAL
    private _bulbAction: THREE.AnimationAction | undefined

    set currentStatus(status: ACTION_STATUS) {
        this._currentStatus = status
    }

    get currentStatus(): ACTION_STATUS {
        return this._currentStatus
    }

    set bulbAction(animationAction: THREE.AnimationAction) {
        this._bulbAction = animationAction
    }

    startBulbAnimation(speed = PARAMS.BULB_SPEED) {
        if (this._bulbAction) {
            this._bulbAction.play()
        } else {
            console.error('Lighthouse Bulb animation was not initialized')
        }
    }
}

export function createLighthouse() {
    return new Lighthouse()
}
