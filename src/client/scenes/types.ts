import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Camera } from './cameras'

export interface SceneComponents {
    camera: Camera
    controls: OrbitControls
}
