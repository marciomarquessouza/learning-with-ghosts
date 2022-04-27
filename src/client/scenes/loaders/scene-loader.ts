import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ACTION_STATUS, ANIMATIONS, ARMATURES, MESHES } from '../../const'
import { SceneModels } from '../../models'
import { loadLight } from './light-loader'

export async function loadScene(scene: THREE.Scene, models: SceneModels): Promise<THREE.AnimationMixer> {
    const loader = new GLTFLoader()
    const { ghost, train, lighthouse } = models
    return new Promise((resolve, reject) => {
        loader.load(
            'models/learning-with-ghosts.glb',
            (gltf) => {
                gltf.scene.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh
                        mesh.receiveShadow = true
                        mesh.castShadow = true
                        switch (mesh.name) {
                            case MESHES.GHOST:
                                ghost.ghostMesh = mesh
                                break
                            case MESHES.TRAIN:
                                train.trainMesh = mesh
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

                scene.add(gltf.scene)
                ghost.currentStatus = ACTION_STATUS.LOADED
                train.currentStatus = ACTION_STATUS.LOADED
                lighthouse.currentStatus = ACTION_STATUS.LOADED
                resolve(animationMixer)
            },
            undefined,
            (error) => {
                reject(error)
            }
        )
    })
}
