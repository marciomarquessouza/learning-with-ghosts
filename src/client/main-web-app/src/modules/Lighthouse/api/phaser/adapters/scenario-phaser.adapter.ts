import { CreateScenarioAdapter } from "../../../data";
import { Scenario } from "../../../entities";
import { scenarioHelper } from "../helper";

export class ScenarioPhaser implements CreateScenarioAdapter {
  create(scenario: Scenario): void {
    scenarioHelper.createBackground(scenario);
    scenarioHelper.createPlatforms(scenario);
  }
}
