import { Scenario } from "../../entities";

export namespace CreateScenario {
  export type Params = Scenario;
}

export interface CreateScenario {
  execute(data: CreateScenario.Params): void;
}

export interface CreateScenarioAdapter {
  create(scenarioData: CreateScenario.Params): void;
}
