import { Lighthouse } from './lighthouse/Lighthouse'
import { Train } from './train/Train'
import { Scenario } from './scenario/Scenario'
import { Princess } from './princess/Princess'
import { Sea } from './sea/Sea'
import { Sky } from './sky/Sky'

export interface Models {
    lighthouse: Lighthouse
    princess: Princess
    scenario: Scenario
    sea: Sea
    sky: Sky
    train: Train
}
