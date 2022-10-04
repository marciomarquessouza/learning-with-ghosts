import { Scenario } from '../../../entities'
import { sceneHelper } from './Scene.helper'
import { scenarioPhaser } from '../phaser-elements.cache'

class ScenarioHelper {
    createBackground(scenario: Scenario) {
        const { background } = scenario
        const scene = sceneHelper.getScene()
        const { x, y, image } = background
        scene.add.image(x, y, image).setOrigin(0, 0)
    }

    createPlatforms(scenario: Scenario) {
        const { name, platforms } = scenario
        const scene = sceneHelper.getScene()
        const phaserPlatform = scene.physics.add.staticGroup()
        platforms.forEach((platform) => {
            if (platform.scale) {
                const { x, y, scale, image } = platform
                phaserPlatform.create(x, y, image).setScale(scale).refreshBody()
            } else {
                const { x, y, image } = platform
                phaserPlatform.create(x, y, image)
            }
        })
        scenarioPhaser.set(name, phaserPlatform)
    }
}

export const scenarioHelper = new ScenarioHelper()
