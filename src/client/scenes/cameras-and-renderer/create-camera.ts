import * as THREE from 'three'

/**
 * Main character perspective camera
 * @param fov camera zoom
 * @param far camera area
 * @param x
 * @param y
 * @param z
 * @returns Camera
 * @example Animal Crossing perspective 40, 200, -275, 80, 0
 */
export function createPerspectiveCamera(
    fov = 40,
    far = 200,
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
    camera.far = far
    camera.updateProjectionMatrix()

    return camera
}
