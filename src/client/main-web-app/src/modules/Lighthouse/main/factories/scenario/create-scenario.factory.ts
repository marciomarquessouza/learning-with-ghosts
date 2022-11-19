import { ScenarioPhaser } from '../../../api/phaser/adapters'
import { CreateScenarioUseCase } from '../../../usecases'

export const makeCreateScenario = () => {
    const createSceneAdapter = new ScenarioPhaser()
    const createScene = new CreateScenarioUseCase(createSceneAdapter)
    return createScene
}
