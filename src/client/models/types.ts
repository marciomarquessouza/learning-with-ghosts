import * as THREE from 'three'

import { Lighthouse } from './lighthouse/Lighthouse'
import { Train } from './train/Train'
import { Scenario } from './scenario/Scenario'
import { Princess } from './princess/Princess'
import { Sky } from './sky/Sky'
import { Ghost } from './ghost'

export interface PlayerMesh {
    get characterMesh(): THREE.Mesh
    get characterMeshes(): THREE.Mesh[]
    get characterGroup(): THREE.Group
    get characterArmature(): THREE.Object3D
    get isLocked(): boolean
    set isLocked(value: boolean)
}

export interface Models {
    ghost: Ghost
    lighthouse: Lighthouse
    princess: Princess
    scenario: Scenario
    sky: Sky
    train: Train
}
