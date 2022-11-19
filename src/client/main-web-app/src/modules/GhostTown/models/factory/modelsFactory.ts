import { Scene } from 'three'
import { createGhost } from '../ghost'
import { createLighthouse } from '../lighthouse'
import { createPrincess } from '../princess'
import { createScenario } from '../scenario'
import { createTrain } from '../train'
import { Models } from '../types'

export function createModels(scene: Scene): Models {
    return {
        ghost: createGhost(),
        lighthouse: createLighthouse(),
        princess: createPrincess(),
        scenario: createScenario(),
        train: createTrain(),
    }
}
