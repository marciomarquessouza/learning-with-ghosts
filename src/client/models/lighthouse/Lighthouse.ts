import * as THREE from 'three'
import { PARAMS } from '../../const'

export class Lighthouse {
    private _bulbAction: THREE.AnimationAction | undefined

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
