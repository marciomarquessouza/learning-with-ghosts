import { ScenarioPhaser } from "../../../api/phaser/adapters";
import { CreateScenarioUseCase } from "../../../usecases";

export const makeCreateScenario = () => {
  const crateSceneAdapter = new ScenarioPhaser();
  const createScene = new CreateScenarioUseCase(crateSceneAdapter);
  return createScene;
};
