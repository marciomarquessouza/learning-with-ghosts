import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ANIMATIONS, ARMATURES, MESHES } from '../../../const'
import { Models } from '../../../models/types'
import { loadLight } from './loadLight'

export async function loadScene(scene: THREE.Scene, models: Models): Promise<THREE.AnimationMixer> {
    const loader = new GLTFLoader()
    const { princess, train, lighthouse, scenario, ghost } = models
    return new Promise((resolve, reject) => {
        loader.load(
            'models/learning-with-ghosts.glb',
            (gltf) => {
                gltf.scene.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh
                        mesh.receiveShadow = true
                        mesh.castShadow = true

                        if (mesh.name.includes(MESHES.GHOST)) {
                            ghost.addMesh(mesh)
                        }

                        if (mesh.name.includes(MESHES.PRINCESS)) {
                            if (mesh.name.includes(MESHES.PRINCESS_DIALOG)) {
                                scenario.addPrincessDialogBox(mesh)
                            } else {
                                princess.addMesh(mesh)
                            }
                        }

                        if (mesh.name.includes(MESHES.SCENARIO_COLLISION)) {
                            scenario.addScenarioCollision(mesh)
                        }
                    }

                    if ((child as THREE.Object3D).isObject3D) {
                        const armature = child as THREE.Object3D
                        switch (armature.name) {
                            case ARMATURES.GHOST_ARMATURE:
                                ghost.ghostArmature = armature
                                break
                        }
                    }

                    if ((child as THREE.Light).isLight) {
                        const light = child as THREE.Light
                        loadLight(light)
                    }
                })

                const animationMixer = new THREE.AnimationMixer(gltf.scene)

                gltf.animations.forEach((animation) => {
                    switch (animation.name) {
                        case ANIMATIONS.GHOST_LEVITATION:
                            ghost.levitationAction = animationMixer.clipAction(animation)
                            break
                        case ANIMATIONS.PRINCESS_LEVITATION:
                            princess.levitationAction = animationMixer.clipAction(animation)
                            break
                        case ANIMATIONS.TRAIN_ARRIVAL:
                            train.arrivalAction = animationMixer.clipAction(animation)
                            break
                        case ANIMATIONS.TRAIN_DEPARTURE:
                            train.departureAction = animationMixer.clipAction(animation)
                            break
                        case ANIMATIONS.LIGHTHOUSE_BULB:
                            lighthouse.bulbAction = animationMixer.clipAction(animation)
                            break
                    }
                })

                ghost.init(scene)
                scene.add(gltf.scene)
                resolve(animationMixer)
            },
            undefined,
            (error) => {
                reject(error)
            }
        )
    })
}
