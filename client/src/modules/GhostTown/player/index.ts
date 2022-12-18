import * as THREE from 'three'
import { PlayerData } from 'types'
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

export interface PlayerProps {
    dependencies: PlayerDependencies
    playerData: PlayerData
}

function createPlayer(dependencies: PlayerDependencies, playerData: PlayerData) {
    return new Player(dependencies, playerData)
}

export { Player, createPlayer }
