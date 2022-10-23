import { Player } from "../../entities";

export namespace GetTouching {
  export type Params = Player;
  export type Result = {
    down: boolean;
    left: boolean;
    none: boolean;
    up: boolean;
  };
}

export interface GetTouching {
  execute(player: GetTouching.Params): GetTouching.Result;
}

export interface GetTouchingAdapter {
  getTouching(player: GetTouching.Params): GetTouching.Result;
}
