import { Ghost } from './Ghost'
import { Services } from '../../services/types'
import { SceneComponents } from '../../scenes/types'
import { Models } from '../types'

export interface GhostProps {
    services: Services
    sceneComponents: SceneComponents
    models: Models
}

function createGhost({ services, sceneComponents, models }: GhostProps) {
    return new Ghost(services, sceneComponents, models)
}

export { Ghost, createGhost }
