import { SceneElement } from '../../../entities'
import { ItemElement } from './Item.helper'
import { playerPhaser, scenarioPhaser, itemsPhaser } from '../phaser-elements.cache'

class SceneHelper {
    // @ts-ignore
    private _scene: Phaser.Scene
    // @ts-ignore
    private loader: Phaser.Loader.LoaderPlugin

    initialize(scene: Phaser.Scene) {
        this._scene = scene
    }

    initializeLoader(scene: Phaser.Scene) {
        this.loader = scene.load
    }

    getScene(): Phaser.Scene {
        return this._scene
    }

    getSceneElementByName(name: string) {
        const elements = [playerPhaser, scenarioPhaser, itemsPhaser]
        const result = elements.find((element) => element.has(name))
        // @ts-ignore
        return result.get(name)
    }

    addColliders(
        object1: SceneElement,
        object2: SceneElement,
        callback?: (obj1: ItemElement, obj2: ItemElement) => void
    ) {
        const obj1 = this.getSceneElementByName(object1.name)
        const obj2 = this.getSceneElementByName(object2.name)
        // @ts-ignore
        this._scene.physics.add.collider(obj1, obj2, callback, null, this._scene)
    }

    addOverlap(
        object1: SceneElement,
        object2: SceneElement,
        callback: (obj1: ItemElement, obj2: ItemElement) => void
    ) {
        const obj1 = this.getSceneElementByName(object1.name)
        const obj2 = this.getSceneElementByName(object2.name)
        // @ts-ignore
        this._scene.physics.add.overlap(obj1, obj2, callback, null, this._scene)
    }

    loadImage(name: string, path: string) {
        this.loader.image(name, path)
    }

    loadSpriteSheet(name: string, path: string, width: number, height: number) {
        this.loader.spritesheet(name, path, {
            frameWidth: width,
            frameHeight: height,
        })
    }
}

export const sceneHelper = new SceneHelper()
