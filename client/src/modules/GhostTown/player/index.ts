import { User } from 'types'
import { Models } from '../models/types'
import { SceneComponents } from '../scenes/types'
import { Services } from '../services/types'
import { Player } from './Player'

export interface PlayerProps {
    services: Services
    sceneComponents: SceneComponents
    models: Models
    user: User
}

function createPlayer({ services, sceneComponents, models, user }: PlayerProps) {
    return new Player(services, sceneComponents, user, models)
}

export { Player, createPlayer }
