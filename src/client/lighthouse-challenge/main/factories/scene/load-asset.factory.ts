import { ScenePhaser } from "../../../api/phaser/adapters";
import { LoadAssetUseCase } from "../../../usecases";

export const makeLoadFactory = () => {
  const loadAssetAdapter = new ScenePhaser();
  return new LoadAssetUseCase(loadAssetAdapter);
};
