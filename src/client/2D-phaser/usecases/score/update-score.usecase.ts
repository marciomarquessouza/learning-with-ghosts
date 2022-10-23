import { UpdateScore, UpdateScoreAdapter } from '../../data'
import { GameScore } from '../../entities'
import { STAR_VALUE } from '../../const'

export class UpdateScoreUsecase implements UpdateScore {
    constructor(private updateScoreAdapter: UpdateScoreAdapter) {}

    execute(scoreData: GameScore): void {
        scoreData.score += STAR_VALUE
        scoreData.text = `SCORE ${scoreData.score}`
        this.updateScoreAdapter.updateScore(scoreData)
    }
}
