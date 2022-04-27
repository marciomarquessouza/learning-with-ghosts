import { Ghost } from './ghost/Ghost'
import { Lighthouse } from './lighthouse/Lighthouse'
import { Train } from './train/Train'

export interface SceneModels {
    ghost: Ghost
    train: Train
    lighthouse: Lighthouse
}
