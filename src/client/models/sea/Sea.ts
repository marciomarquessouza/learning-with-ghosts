import * as THREE from 'three'

export class Sea {
    constructor(scene: THREE.Scene) {}

    private _createWaves() {}
}

export function createSea(scene: THREE.Scene) {
    return new Sea(scene)
}
