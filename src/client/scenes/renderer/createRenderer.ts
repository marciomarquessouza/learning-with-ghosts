import * as THREE from 'three'
import { COLORS } from '../../const'

export function createRenderer() {
    const renderer = new THREE.WebGL1Renderer({ antialias: true })
    renderer.setClearColor(COLORS.BACKGROUND, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.physicallyCorrectLights = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = false
    renderer.outputEncoding = THREE.sRGBEncoding
    return renderer
}
