import { OverlapCallback } from '.'
import { makeUpdateScore } from '../factories'
import { score } from '../game-data'

const updateScore = makeUpdateScore()

export const updateScoreCallback: OverlapCallback = () => {
    updateScore.execute(score)
}
