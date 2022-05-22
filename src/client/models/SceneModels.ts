import { Ghost } from './ghost/Ghost'
import { Lighthouse } from './lighthouse/Lighthouse'
import { Train } from './train/Train'
import { Scenario } from './scenario/Scenario'
import { Princess } from './princess/Princess'

export interface SceneModels {
    ghost: Ghost
    princess: Princess
    train: Train
    lighthouse: Lighthouse
    scenario: Scenario
}
