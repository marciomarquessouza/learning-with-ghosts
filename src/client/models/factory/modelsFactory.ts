import { Scene } from 'three'
import { createLighthouse } from '../lighthouse'
import { createPrincess } from '../princess'
import { createScenario } from '../scenario'
import { createSea } from '../sea'
import { createSky } from '../sky'
import { createTrain } from '../train'
import { Models } from '../types'

export function createModels(scene: Scene): Models {
    return {
        lighthouse: createLighthouse(),
        princess: createPrincess(),
        scenario: createScenario(),
        sea: createSea(scene),
        sky: createSky(scene),
        train: createTrain(),
    }
}
