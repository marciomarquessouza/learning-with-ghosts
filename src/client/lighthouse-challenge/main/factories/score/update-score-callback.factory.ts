import { ScorePhaser } from "../../../api/phaser/adapters";
import { UpdateScoreUsecase } from "../../../usecases";

export const makeUpdateScore = () => {
  const updateScoreAdapter = new ScorePhaser();
  return new UpdateScoreUsecase(updateScoreAdapter);
};
