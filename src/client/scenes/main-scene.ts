import * as THREE from 'three'

import { createPerspectiveCamera, createRenderer } from './cameras-and-renderer'
import { loadScene } from './loaders'
import { createStats, createControls } from './utils'
import {
    createGhostModel,
    createPrincess,
    createLighthouse,
    createScenario,
    createTrainModel,
    createSky,
    SceneModels,
    createSea,
    createScreenGUI,
} from '../models'
import { createEndAnimationsTrigger } from './animations/trigger-end-animations'
import { PARAMS, COLORS } from '../const'

const bgColor = COLORS.BACKGROUND

const scene = new THREE.Scene()
const renderer = createRenderer(bgColor)
const camera = createPerspectiveCamera({ fov: 32, far: 200, x: -35, y: 10, z: -41 })
const stats = createStats()
let mixer: THREE.AnimationMixer
const clock = new THREE.Clock()
const controls = createControls(camera, renderer)
const screenGUI = createScreenGUI()

createSky(scene)
const sea = createSea(scene)
const train = createTrainModel()
const lighthouse = createLighthouse()
const scenario = createScenario()
const ghost = createGhostModel(camera, controls, scenario, screenGUI)
const princess = createPrincess()

function render() {
    renderer.render(scene, camera)
}

function handleKeyDown(event: KeyboardEvent) {
    ghost.onKeyDown(event)
}

function handleKeyUp(event: KeyboardEvent) {
    ghost.onKeyUp(event)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function gameInitiation() {
    train.startArrivalAnimation()
    lighthouse.startBulbAnimation()
    princess.startLevitationAnimation()
    screenGUI.showChapterTitle({
        title: 'WELCOME TO GHOST TOWN',
        subtitle: 'LEARNING HOW TO GREETING FRIENDS, STRANGERS AND FREAKS ',
        chapterNumber: 1,
    })
    screenGUI.showLiveMenu({
        lives: PARAMS.INITIAL_LIVES,
        day: 1,
        chapterNumber: 1,
        chapterName: 'Greetings',
    })
}

function update(delta: number) {
    const physicsSteps = PARAMS.PHYSICS_STEPS
    for (let i = 0; i < physicsSteps; i++) {
        ghost.updateControls(delta / physicsSteps)
    }
}

function animateScene() {
    const delta = Math.min(clock.getDelta(), 0.1)
    requestAnimationFrame(animateScene)
    controls.update()
    mixer.update(delta)
    render()
    stats.update()
    sea.update(clock.getElapsedTime())
    update(delta)
}

export async function createMainScene() {
    ghost.reset()
    const models: SceneModels = { ghost, princess, train, lighthouse, scenario }
    const animationMixer = await loadScene(scene, models)
    if (animationMixer) {
        mixer = animationMixer
        mixer.addEventListener('finished', createEndAnimationsTrigger(models))
        window.addEventListener('keydown', handleKeyDown, false)
        window.addEventListener('keyup', handleKeyUp, false)
        window.addEventListener('resize', onWindowResize, false)
        gameInitiation()
        animateScene()
    }

    return renderer.domElement
}
