import { Sea } from './Sea'

function createSea(scene: THREE.Scene) {
    return new Sea(scene)
}

export { Sea, createSea }
