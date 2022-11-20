import { GameScore } from "../../entities";

export namespace UpdateScore {
  export type Params = GameScore;
}

export interface UpdateScore {
  execute(scoreData: UpdateScore.Params): void;
}

export interface UpdateScoreAdapter {
  updateScore(scoreData: UpdateScore.Params): void;
}
