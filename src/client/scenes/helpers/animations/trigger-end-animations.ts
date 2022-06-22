import * as THREE from 'three'
import { ANIMATIONS, PARAMS } from '../../../const'
import { Ghost } from '../../../models'
import { Models } from '../../../models/types'

type Event = THREE.Event & { type: 'finished' } & { target: THREE.AnimationMixer }

export function createEndAnimationsTrigger(models: Models, ghost: Ghost) {
    return (event: Event) => {
        const animationMixer: THREE.AnimationAction = event.action
        const animationName = animationMixer.getClip().name
        const { train } = models

        const playTrainDeparture = () => {
            train.startDepartureAnimation()
        }

        const playGhostLevitation = () => {
            ghost.startLevitationAnimation()
        }

        switch (animationName) {
            case ANIMATIONS.TRAIN_ARRIVAL:
                playGhostLevitation()
                setTimeout(playTrainDeparture, PARAMS.TRAIN_WAITING_TIME)
                break
            default:
                break
        }
    }
}
