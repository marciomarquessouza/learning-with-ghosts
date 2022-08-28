import { createStorage } from '../local-storage'
import { createStats } from '../scene-stats'
import { Utils } from '../types'

export function createUtils(): Utils {
    return {
        storage: createStorage(),
        sceneStats: createStats(),
    }
}
