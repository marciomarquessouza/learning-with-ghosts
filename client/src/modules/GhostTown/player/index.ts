import * as THREE from 'three'
import { GameProgressState } from '../contexts/GameProgressContext'
import { Models } from '../models/types'
import { SceneComponents } from '../scenes/types'
import { Services } from '../services/types'
import { Player } from './Player'

export interface PlayerDependencies {
    scene: THREE.Scene
    services: Services
    sceneComponents: SceneComponents
    models: Models
}

function createPlayer(dependencies: PlayerDependencies, gameProgress: GameProgressState) {
    return new Player(dependencies, gameProgress)
}

export { Player, createPlayer }
