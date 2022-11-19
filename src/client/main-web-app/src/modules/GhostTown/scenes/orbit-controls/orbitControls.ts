import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PARAMS } from '../../const'

export function createOrbitControls(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxPolarAngle = Math.PI / 2
    controls.minDistance = PARAMS.CONTROL_MIN_DISTANCE
    controls.maxDistance = PARAMS.CONTROL_MAX_DISTANCE
    return controls
}
