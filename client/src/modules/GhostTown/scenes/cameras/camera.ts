import * as THREE from 'three'
import { CameraProps } from '.'
import { PARAMS } from '../../const'

export class Camera {
    private _camera: THREE.PerspectiveCamera
    private _zoom: number

    constructor({ fov = PARAMS.DEFAULT_ZOOM, far, x, y, z }: CameraProps) {
        this._camera = new THREE.PerspectiveCamera(
            fov,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this._camera.position.set(x, y, z)
        this._camera.far = far
        this._camera.updateProjectionMatrix()
        this._zoom = fov
    }

    get perspectiveCamera() {
        return this._camera
    }

    public zoomIn(value = PARAMS.DEFAULT_ZOOM_IN) {
        this._zoom = value
    }

    public zoomOut() {
        this._zoom = PARAMS.DEFAULT_ZOOM
    }

    public cameraUpdate(delta: number) {
        if (Math.round(this._camera.fov) !== this._zoom) {
            this._zoom > this._camera.fov
                ? (this._camera.fov += this._camera.fov * delta)
                : (this._camera.fov -= this._camera.fov * delta)
            this._camera.updateProjectionMatrix()
        }
    }
}

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
