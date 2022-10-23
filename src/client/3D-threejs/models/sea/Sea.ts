import * as THREE from 'three'
import vertexShader from './glsl/vertex.glsl'
import fragmentShader from './glsl/fragment.glsl'

export class Sea {
    private _geometry = new THREE.PlaneGeometry(16, 80, 8, 8)
    private _material: THREE.ShaderMaterial | undefined

    constructor(scene: THREE.Scene) {
        const waves = this._createWaves()
        waves.scale.set(1, 1, 2)
        waves.position.set(27, -5.5, -20)
        waves.rotation.x = Math.PI / 2
        scene.add(waves)
    }

    private _createWaves() {
        this._material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib['lights'],
                {
                    uTime: { value: 0.0 },
                    seaColor: { value: new THREE.Color(0x06072d) },
                },
            ]),
            wireframe: false,
            side: THREE.DoubleSide,
            lights: true,
        })
        return new THREE.Mesh(this._geometry, this._material)
    }

    public update(delta: number) {
        if (this._material) {
            this._material.uniforms.uTime.value = delta
        } else {
            console.error('Error to create waves')
        }
    }
}
