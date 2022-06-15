import { Camera } from './camera'

export interface CameraProps {
    fov?: number
    far: number
    x: number
    y: number
    z: number
}

export function createPerspectiveCamera(props: CameraProps): Camera {
    return new Camera(props)
}
