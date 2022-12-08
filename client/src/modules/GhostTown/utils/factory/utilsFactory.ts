import { createStats } from '../scene-stats'
import { Utils } from '../types'

export function createUtils(): Utils {
    return {
        sceneStats: createStats(),
    }
}
