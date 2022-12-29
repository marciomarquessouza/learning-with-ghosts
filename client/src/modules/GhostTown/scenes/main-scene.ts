import * as THREE from 'three'

import { loadScene } from './helpers/loaders'
import { createModels } from '../models'
import { createEndAnimationsTrigger } from './helpers/animations/trigger-end-animations'
import { sceneInitiation } from './helpers/scene-initiation/sceneInitiation'
import { createSceneComponents } from './factory/sceneComponentsFactory'
import { createServices } from '../services/factory/servicesFactory'
import { createUtils } from '../utils/factory/utilsFactory'
import { createPlayer, PlayerDependencies } from '../player'
import { PARAMS } from '../const'
import { GameGuiContextType } from '../contexts/GameGuiContext'
import { createRenderer } from './renderer'
import { GameProgressContextType } from '../contexts/GameProgressContext'
import { GameContentContextType } from '../contexts'

interface CreateMainSceneProps {
    container: HTMLDivElement
    gameGuiContext: GameGuiContextType
    gameProgressContext: GameProgressContextType
    gameContentContext: GameContentContextType
}

export async function createMainScene({
    container,
    gameGuiContext,
    gameProgressContext,
    gameContentContext,
}: CreateMainSceneProps) {
    if (container.childNodes.length > 0) return

    let mixer: THREE.AnimationMixer
    let requestedAnimationFrame = 0

    const renderer = createRenderer()
    const scene = new THREE.Scene()
    const clock = new THREE.Clock()

    const utils = createUtils()
    const models = createModels()
    const services = createServices(utils, gameGuiContext)
    const sceneComponents = createSceneComponents(renderer)
    const playerDependencies: PlayerDependencies = {
        scene,
        services,
        sceneComponents,
        models,
    }
    const player = createPlayer(playerDependencies, gameProgressContext.gameProgress)

    function render() {
        renderer.render(scene, sceneComponents.camera.perspectiveCamera)
    }

    function handleKeyDown(event: KeyboardEvent) {
        player.onKeyDown(event)
    }

    function handleKeyUp(event: KeyboardEvent) {
        player.onKeyUp(event)
    }

    function onWindowResize() {
        sceneComponents.camera.perspectiveCamera.aspect = window.innerWidth / window.innerHeight
        sceneComponents.camera.perspectiveCamera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }

    function update(delta: number) {
        const physicsSteps = PARAMS.PHYSICS_STEPS
        for (let i = 0; i < physicsSteps; i++) {
            player.updateControls(delta / physicsSteps)
        }
        sceneComponents.camera.cameraUpdate(delta)
    }

    function animateScene() {
        const delta = Math.min(clock.getDelta(), 0.1)
        requestedAnimationFrame = requestAnimationFrame(animateScene)
        sceneComponents.controls.update()
        mixer.update(delta)
        render()
        utils.sceneStats.update()
        update(delta)
    }

    function removeScene() {
        cancelAnimationFrame(requestedAnimationFrame)
        utils.sceneStats.close()
        for (var i = scene.children.length - 1; i >= 0; i--) {
            const obj = scene.children[i]
            scene.remove(obj)
        }
    }

    player.reset()

    const animationMixer = await loadScene(scene, models)

    if (animationMixer && gameContentContext.chapter) {
        mixer = animationMixer
        mixer.addEventListener('finished', createEndAnimationsTrigger(models))
        window.addEventListener('keydown', handleKeyDown, false)
        window.addEventListener('keyup', handleKeyUp, false)
        window.addEventListener('resize', onWindowResize, false)
        await sceneInitiation({ models, services, chapter: gameContentContext.chapter })
        animateScene()
    }

    return { renderer, removeScene }
}
