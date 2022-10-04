import { GameScore } from "../../entities";

export namespace CreateScore {
  export type Params = GameScore;
}

export interface CreateScore {
  execute(data: CreateScore.Params): void;
}

export interface CreateScoreAdapter {
  create(data: CreateScore.Params): void;
}
