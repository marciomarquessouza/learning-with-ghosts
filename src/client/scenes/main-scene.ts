import * as THREE from 'three'

import { createRenderer } from './renderer'
import { loadScene } from './helpers/loaders'
import { createGhost, createModels } from '../models'
import { createEndAnimationsTrigger } from './helpers/animations/trigger-end-animations'
import { PARAMS, COLORS } from '../const'
import { sceneInitiation } from './helpers/scene-initiation/sceneInitiation'
import { createSceneComponents } from './factory/sceneComponentsFactory'
import { createServices } from '../services/factory/servicesFactory'
import { createUtils } from '../utils/factory/utilsFactory'

const bgColor = COLORS.BACKGROUND
let mixer: THREE.AnimationMixer

const scene = new THREE.Scene()
const renderer = createRenderer(bgColor)
const clock = new THREE.Clock()

const utils = createUtils()
const models = createModels(scene)
const services = createServices(utils)
const sceneComponents = createSceneComponents(renderer)

const ghost = createGhost({ services, models, sceneComponents })

function render() {
    renderer.render(scene, sceneComponents.camera.perspectiveCamera)
}

function handleKeyDown(event: KeyboardEvent) {
    ghost.onKeyDown(event)
}

function handleKeyUp(event: KeyboardEvent) {
    ghost.onKeyUp(event)
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
        ghost.updateControls(delta / physicsSteps)
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
    ghost.reset()
    const animationMixer = await loadScene(scene, models, ghost)
    if (animationMixer) {
        mixer = animationMixer
        mixer.addEventListener('finished', createEndAnimationsTrigger(models, ghost))
        window.addEventListener('keydown', handleKeyDown, false)
        window.addEventListener('keyup', handleKeyUp, false)
        window.addEventListener('resize', onWindowResize, false)
        await sceneInitiation({ models, services, utils })
        animateScene()
    }

    return renderer.domElement
}
