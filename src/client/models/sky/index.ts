import { Sky } from './Sky'

function createSky(scene: THREE.Scene): Sky {
    return new Sky(scene)
}

export { Sky, createSky }
