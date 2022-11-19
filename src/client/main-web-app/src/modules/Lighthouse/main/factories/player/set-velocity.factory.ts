import { PlayerPhaser } from "../../../api/phaser/adapters";
import { SetVelocityUseCase } from "../../../usecases";

export const makeSetVelocity = () => {
  const setVelocityAdapter = new PlayerPhaser();
  return new SetVelocityUseCase(setVelocityAdapter);
};
