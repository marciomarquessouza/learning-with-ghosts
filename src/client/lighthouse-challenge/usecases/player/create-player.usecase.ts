import { CreatePlayer, CreatePlayerAdapter } from "../../data";

export class CreatePlayerUseCase implements CreatePlayer {
  constructor(private createPlayerAdapter: CreatePlayerAdapter) {}

  execute(data: CreatePlayer.Params) {
    this.createPlayerAdapter.create(data);
  }
}
