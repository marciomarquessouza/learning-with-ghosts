import { ScenePhaser } from "../../../api/phaser/adapters";
import { AddOverlapUseCase } from "../../../usecases";

export const makeAddOverlap = () => {
  const addOverlapAdapter = new ScenePhaser();
  return new AddOverlapUseCase(addOverlapAdapter);
};
