import { sceneHelper } from '../../../api'
import {
    makeCreatePlayer,
    makeCreateScenario,
    makeCreateItem,
    makeCreateCursor,
    makeAddColliders,
    makeAddOverlap,
    makeCreateScore,
} from '../../factories'
import { player, scenario, stars, score } from '../../game-data'
import { overlapCallbackAdapter, disableItemCallback, updateScoreCallback } from '../../adapters'

export function create() {
    const createPlayer = makeCreatePlayer()
    const createCursor = makeCreateCursor()
    const createItem = makeCreateItem()
    const createScenario = makeCreateScenario()
    const addColliders = makeAddColliders()
    const addOverlap = makeAddOverlap()
    const createScore = makeCreateScore()

    // @ts-ignore
    sceneHelper.initialize(this as Phaser.Scene)
    createScenario.execute(scenario)
    createPlayer.execute(player)
    createItem.execute(stars)
    createScore.execute(score)
    addColliders.execute({ object1: player, object2: scenario })
    addColliders.execute({ object1: stars, object2: scenario })
    addOverlap.execute({
        object1: player,
        object2: stars,
        callback: overlapCallbackAdapter(disableItemCallback, updateScoreCallback),
    })
    createCursor.execute()
}
