import { GetTouching, GetTouchingAdapter } from "../../data";
import { Player } from "../../entities";

export class GetTouchingUseCase implements GetTouching {
  constructor(private getTouchingAdapter: GetTouchingAdapter) {}

  execute(player: Player): GetTouching.Result {
    return this.getTouchingAdapter.getTouching(player);
  }
}
