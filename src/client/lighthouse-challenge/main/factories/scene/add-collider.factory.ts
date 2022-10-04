import { ScenePhaser } from "../../../api/phaser/adapters";
import { AddColliderUseCase } from "../../../usecases";

export const makeAddColliders = () => {
  const addColliderAdapter = new ScenePhaser();
  const addColliders = new AddColliderUseCase(addColliderAdapter);
  return addColliders;
};
