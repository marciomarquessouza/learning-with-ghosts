import { SetVelocity, SetVelocityAdapter } from "../../data";

export class SetVelocityUseCase implements SetVelocity {
  constructor(private setVelocityAdapter: SetVelocityAdapter) {}

  execute(player: SetVelocity.Params): void {
    if (!player.velocity) {
      throw new Error("Velocity data is mandatory");
    }
    this.setVelocityAdapter.setVelocity(player);
  }
}
