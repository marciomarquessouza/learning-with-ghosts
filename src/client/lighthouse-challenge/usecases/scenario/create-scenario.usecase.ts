import { CreateScenario, CreateScenarioAdapter } from "../../data";
import { Scenario } from "../../entities";

export class CreateScenarioUseCase implements CreateScenario {
  constructor(private createScenarioAdapter: CreateScenarioAdapter) {}

  execute(data: Scenario): void {
    this.createScenarioAdapter.create(data);
  }
}
