import { PlayerPhaser } from "../../../api/phaser/adapters";
import { CreatePlayerUseCase } from "../../../usecases";

export const makeCreatePlayer = () => {
  const createPlayerAdapter = new PlayerPhaser();
  const createPlayer = new CreatePlayerUseCase(createPlayerAdapter);
  return createPlayer;
};
