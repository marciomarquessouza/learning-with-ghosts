import * as THREE from 'three'

import { Scenario } from '../../../models'
import { Models } from '../../../models/types'
import { Player } from '../../Player'

export type Ray = { start: THREE.Vector3; end: THREE.Vector3 }

export interface Intersection {
    vector: THREE.Vector3
    offset: number
}

export class Sensor {
    private rayCount = 5
    private rayLength = 150
    private raySpread = Math.PI / 2
    private rays: Ray[] = []
    private readings: (Intersection | null)[] = []

    constructor(private player: Player) {}

    public update(scenario: Scenario, models: Models) {}

    public draw() {}

    private castRays() {
        for (let index = 0; index < this.rayCount; index++) {
            const rayAngle = THREE.MathUtils.lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.rayCount === 1 ? 0.5 : index / (this.rayCount - 1)
            )
        }
    }
}
