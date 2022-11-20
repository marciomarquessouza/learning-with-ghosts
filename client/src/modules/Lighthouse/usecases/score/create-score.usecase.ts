import { CreateScore, CreateScoreAdapter } from "../../data";
import { GameScore } from "../../entities";

export class CreateScoreUseCase implements CreateScore {
  constructor(private createScoreAdapter: CreateScoreAdapter) {}
  execute(data: GameScore): void {
    this.createScoreAdapter.create(data);
  }
}
