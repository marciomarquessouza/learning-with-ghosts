import { Models } from '../models/types'
import { SceneComponents } from '../scenes/types'
import { Services } from '../services/types'
import { Player } from './Player'

export interface PlayerProps {
    services: Services
    sceneComponents: SceneComponents
    models: Models
}

function createPlayer({ services, sceneComponents, models }: PlayerProps) {
    return new Player(services, sceneComponents, models)
}

export { Player, createPlayer }
