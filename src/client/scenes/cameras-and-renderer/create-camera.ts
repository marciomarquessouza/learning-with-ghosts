import * as THREE from 'three'

export function createPerspectiveCamera(
    fov = 50,
    x = -35,
    y = 20,
    z = -41
): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(x, y, z)
    camera.far = 100
    camera.updateProjectionMatrix()

    return camera
}
