import { Ghost } from './ghost/Ghost'
import { Lighthouse } from './lighthouse/Lighthouse'
import { Train } from './train/Train'
import { Scenario } from './scenario/Scenario'

export interface SceneModels {
    ghost: Ghost
    train: Train
    lighthouse: Lighthouse
    scenario: Scenario
}
