import * as THREE from 'three'

import { createPerspectiveCamera } from '../cameras'
import { createOrbitControls } from '../orbit-controls/orbitControls'
import { SceneComponents } from '../types'

export function createSceneComponents(renderer: THREE.WebGLRenderer): SceneComponents {
    const camera = createPerspectiveCamera({ far: 200, x: -50, y: 10, z: -41 })
    return {
        camera,
        controls: createOrbitControls(camera.perspectiveCamera, renderer),
    }
}
