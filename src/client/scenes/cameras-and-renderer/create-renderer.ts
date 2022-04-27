import * as THREE from 'three'

export function createRenderer(bgColor: number) {
    const renderer = new THREE.WebGL1Renderer({ antialias: true })
    renderer.setClearColor(bgColor, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.physicallyCorrectLights = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = false
    renderer.outputEncoding = THREE.sRGBEncoding
    document.body.appendChild(renderer.domElement)
    return renderer
}
