import { PlayerPhaser } from "../../../api/phaser/adapters";
import { PlayAnimationUseCase } from "../../../usecases";

export const makePlayAnimation = () => {
  const playAnimationAdapter = new PlayerPhaser();
  return new PlayAnimationUseCase(playAnimationAdapter);
};
