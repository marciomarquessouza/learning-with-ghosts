import { PlayerPhaser } from "../../../api/phaser/adapters";
import { GetTouchingUseCase } from "../../../usecases";

export const makeGetTouching = () => {
  const getTouchingAdapter = new PlayerPhaser();
  return new GetTouchingUseCase(getTouchingAdapter);
};
