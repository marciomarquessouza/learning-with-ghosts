import { ScorePhaser } from "../../../api/phaser/adapters";
import { CreateScoreUseCase } from "../../../usecases";

export const makeCreateScore = () => {
  const createScoreAdapter = new ScorePhaser();
  return new CreateScoreUseCase(createScoreAdapter);
};
