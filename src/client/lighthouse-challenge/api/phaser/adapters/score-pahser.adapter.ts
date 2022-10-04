import { CreateScoreAdapter, UpdateScoreAdapter } from "../../../data";
import { GameScore } from "../../../entities";
import { scoreHelper } from "../helper/Score.helper";

export class ScorePhaser implements CreateScoreAdapter, UpdateScoreAdapter {
  create(data: GameScore): void {
    const { textFormat, text } = data;
    const { position, style } = textFormat;
    scoreHelper.createScore(position.x, position.y, text, style);
  }

  updateScore(scoreData: GameScore): void {
    const { text } = scoreData;
    scoreHelper.updateScore(text);
  }
}
