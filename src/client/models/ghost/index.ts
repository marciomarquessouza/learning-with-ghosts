import { Scenario } from '../scenario/Scenario'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ghost } from './Ghost'
import { ScreenGUI } from '../screen-gui/ScreenGUI'
import checkCollisions from './helpers/checkCollision'

export function createGhostModel(
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    scenario: Scenario,
    screenGUI: ScreenGUI
) {
    return new Ghost(camera, controls, scenario, screenGUI, checkCollisions)
}
