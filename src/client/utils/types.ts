import { LocalStorage } from './local-storage'
import { SceneStats } from './scene-stats'

export interface Utils {
    sceneStats: SceneStats
    storage: LocalStorage
}
