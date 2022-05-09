import * as THREE from 'three'

export class Sky {
    constructor(scene: THREE.Scene) {
        const stars = this._createStars()
        stars.position.y = 10
        scene.add(stars)
    }

    private _createStars() {
        const particleGeometry = new THREE.BufferGeometry()
        const particlesCount = 5000 * 3
        const posArray = new Float32Array(particlesCount)

        for (let i = 0; i < particlesCount; i++) {
            posArray[i] = Math.random() * 200
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        const material = new THREE.PointsMaterial({ size: 0.2 })
        return new THREE.Points(particleGeometry, material)
    }
}

export function createSky(scene: THREE.Scene): Sky {
    return new Sky(scene)
}
