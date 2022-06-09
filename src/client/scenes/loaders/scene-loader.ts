import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ACTION_STATUS, ANIMATIONS, ARMATURES, MESHES } from '../../const'
import { SceneModels } from '../../models'
import { loadLight } from './light-loader'

export async function loadScene(
    scene: THREE.Scene,
    models: SceneModels
): Promise<THREE.AnimationMixer> {
    const loader = new GLTFLoader()
    const { ghost, princess, train, lighthouse, scenario } = models
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
                                console.log('LOAD PRINCESS DIALOG')
                                scenario.addPrincessDialog(mesh)
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
