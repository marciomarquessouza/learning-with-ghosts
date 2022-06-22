import { Camera } from './Camera'

export interface CameraProps {
    fov?: number
    far: number
    x: number
    y: number
    z: number
}

function createPerspectiveCamera(props: CameraProps): Camera {
    return new Camera(props)
}

export { Camera, createPerspectiveCamera }
