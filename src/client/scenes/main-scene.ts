import * as THREE from 'three'

import { createPerspectiveCamera, createRenderer } from './cameras-and-renderer'
import { loadScene } from './loaders'
import { createStats, createControls, createAnimationFolders } from './utils'
import { createGhostModel, createLighthouse, createTrainModel } from '../models'
import { createEndAnimationsTrigger } from './animations/trigger-end-animations'
import { ACTION_STATUS, PARAMS } from '../const'

const bgColor = 0x000000

const scene = new THREE.Scene()
const renderer = createRenderer(bgColor)
const camera = createPerspectiveCamera()
const stats = createStats()
let mixer: THREE.AnimationMixer
const clock = new THREE.Clock()
const controls = createControls(camera, renderer)

const train = createTrainModel()
const lighthouse = createLighthouse()
const ghost = createGhostModel(camera, controls)

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

function initialAnimation() {
    train.startArrivalAnimation()
    lighthouse.startBulbAnimation()
}

function update(delta: number) {
    if (ghost.currentStatus !== ACTION_STATUS.INITIAL) {
        const physicsSteps = PARAMS.PHYSICS_STEPS
        for (let i = 0; i < physicsSteps; i++) {
            ghost.updateControls(delta / physicsSteps)
        }
    }
}

function animateScene() {
    const delta = Math.min(clock.getDelta(), 0.1)
    requestAnimationFrame(animateScene)
    controls.update()
    mixer.update(delta)
    render()
    stats.update()
    update(delta)
}

export async function createMainScene() {
    ghost.reset()
    const animationMixer = await loadScene(scene, { ghost, train, lighthouse })
    if (animationMixer) {
        mixer = animationMixer
        createAnimationFolders(train)
        mixer.addEventListener('finished', createEndAnimationsTrigger({ train, ghost, lighthouse }))
        window.addEventListener('keydown', handleKeyDown, false)
        window.addEventListener('keyup', handleKeyUp, false)
        window.addEventListener('resize', onWindowResize, false)
        initialAnimation()
        animateScene()
    }
}
