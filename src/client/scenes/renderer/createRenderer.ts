import * as THREE from 'three'

export function createRenderer() {
    const renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.physicallyCorrectLights = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = false
    renderer.outputEncoding = THREE.sRGBEncoding
    return renderer
}
