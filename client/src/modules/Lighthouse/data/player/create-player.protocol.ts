import { Player } from "../../entities";

export namespace CreatePlayer {
  export type Params = Player;
}

export interface CreatePlayer {
  execute(data: CreatePlayer.Params): void;
}

export interface CreatePlayerAdapter {
  create(playerData: CreatePlayer.Params): void;
}
