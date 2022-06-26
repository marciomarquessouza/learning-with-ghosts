import * as THREE from 'three'

import { createRenderer } from './renderer'
import { loadScene } from './helpers/loaders'
import { createModels } from '../models'
import { createEndAnimationsTrigger } from './helpers/animations/trigger-end-animations'
import { PARAMS } from '../const'
import { sceneInitiation } from './helpers/scene-initiation/sceneInitiation'
import { createSceneComponents } from './factory/sceneComponentsFactory'
import { createServices } from '../services/factory/servicesFactory'
import { createUtils } from '../utils/factory/utilsFactory'
import { createPlayer } from '../player'

let mixer: THREE.AnimationMixer

const scene = new THREE.Scene()
const renderer = createRenderer()
const clock = new THREE.Clock()

const utils = createUtils()
const models = createModels(scene)
const services = createServices(utils)
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
    requestAnimationFrame(animateScene)
    sceneComponents.controls.update()
    mixer.update(delta)
    render()
    utils.sceneStats.update()
    models.sea.update(clock.getElapsedTime())
    update(delta)
}

export async function createMainScene() {
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

    return renderer.domElement
}
