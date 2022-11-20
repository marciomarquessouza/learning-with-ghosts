import * as THREE from 'three'

import { loadScene } from './helpers/loaders'
import { createModels } from '../models'
import { createEndAnimationsTrigger } from './helpers/animations/trigger-end-animations'
import { sceneInitiation } from './helpers/scene-initiation/sceneInitiation'
import { createSceneComponents } from './factory/sceneComponentsFactory'
import { createServices } from '../services/factory/servicesFactory'
import { createUtils } from '../utils/factory/utilsFactory'
import { createPlayer } from '../player'
import { ScreenGUI } from 'modules/GhostTown/hooks/useScreenGUI'

import { PARAMS } from '../const'

export async function createMainScene(
    renderer: THREE.WebGLRenderer,
    container: HTMLDivElement,
    screenGUI: ScreenGUI
) {
    if (container.childNodes.length > 0) return

    let mixer: THREE.AnimationMixer
    let requestedAnimationFrame = 0

    const scene = new THREE.Scene()
    const clock = new THREE.Clock()

    const utils = createUtils()
    const models = createModels(scene)
    const services = createServices(utils, screenGUI)
    const sceneComponents = createSceneComponents(renderer)

    const player = createPlayer({ services, sceneComponents, models })

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

    function cancelAnimation() {
        cancelAnimationFrame(requestedAnimationFrame)
    }

    player.reset()

    const animationMixer = await loadScene(scene, models)

    if (animationMixer) {
        mixer = animationMixer
        mixer.addEventListener('finished', createEndAnimationsTrigger(models))
        window.addEventListener('keydown', handleKeyDown, false)
        window.addEventListener('keyup', handleKeyUp, false)
        window.addEventListener('resize', onWindowResize, false)
        await sceneInitiation({ models, services, utils })
        animateScene()
    }

    return { sceneDomElement: renderer.domElement, cancelAnimation }
}
