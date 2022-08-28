import * as THREE from 'three'

export function loadLight(light: THREE.Light) {
    light.castShadow = false
    light.shadow.bias = -0.003
    light.shadow.mapSize.width = 2048
    light.shadow.mapSize.height = 2048
    return light
}
