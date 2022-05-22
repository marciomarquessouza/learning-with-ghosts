import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { ACTION_STATUS, PARAMS } from '../../const'

export class Ghost {
    private _currentStatus = ACTION_STATUS.INITIAL
    private _ghostMeshes: THREE.Mesh[] = []
    private _ghostMeshGroup = new THREE.Group()
    private _ghostArmature: THREE.Object3D | undefined
    private _levitationAction: THREE.AnimationAction | undefined
    private _fwdPressed = false
    private _bkdPressed = false
    private _lftPressed = false
    private _rgtPressed = false
    private _ghostVelocity = new THREE.Vector3()
    private _characterMesh = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 5, 2.5),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, visible: false })
    )
    private _lockCommands = false

    constructor(
        private _camera: THREE.PerspectiveCamera,
        private _controls: OrbitControls,
        private _scenarioColliders: THREE.Mesh[]
    ) {}

    set currentStatus(status: ACTION_STATUS) {
        this._currentStatus = status
    }

    get currentStatus(): ACTION_STATUS {
        return this._currentStatus
    }

    set ghostArmature(armature: THREE.Object3D) {
        this._ghostArmature = armature
    }

    set levitationAction(animationAction: THREE.AnimationAction) {
        this._levitationAction = animationAction
    }

    public addMesh(mesh: THREE.Mesh) {
        mesh.frustumCulled = false
        this._ghostMeshes.push(mesh)
    }

    public init(scene: THREE.Scene) {
        scene.add(this._ghostMeshGroup)
        this._ghostMeshes.forEach((mesh) => {
            this._ghostMeshGroup.add(mesh)
        })
        this._ghostArmature?.position.set(0, 4, -16)
        this.visible(false)

        this._characterMesh.position.set(0, 4, -16)
        scene.add(this._characterMesh)
    }

    reset() {
        this._ghostVelocity.set(0, 0, 0)
        if (this._ghostArmature) this._controls.target.copy(this._ghostArmature.position)
    }

    visible(value: boolean): void {
        if (this._ghostMeshGroup && this._ghostArmature) {
            this._ghostMeshGroup.visible = value
        } else {
            console.error('Ghost Mesh was not loaded properly')
        }
    }

    startLevitationAnimation(): void {
        this.visible(true)
        this._lockCommands = true
        if (this._levitationAction) {
            this._levitationAction.play()
        } else {
            console.error('Ghost Levitation Action was not loaded properly')
        }
    }

    private _setKeyPressed(event: KeyboardEvent, keyPressed: boolean): void {
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this._fwdPressed = keyPressed
                break
            case 'KeyS':
            case 'ArrowDown':
                this._bkdPressed = keyPressed
                break
            case 'KeyD':
            case 'ArrowRight':
                this._rgtPressed = keyPressed
                break
            case 'KeyA':
            case 'ArrowLeft':
                this._lftPressed = keyPressed
                break
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (this._lockCommands) {
            this._setKeyPressed(event, true)
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        if (this._lockCommands) {
            this._setKeyPressed(event, false)
        }
    }

    private _checkCollisions(vector: THREE.Vector3, delta: number): boolean {
        let originPoint = this._characterMesh.position.clone()
        const positionAttribute = this._characterMesh.geometry.getAttribute('position')
        const localVertex = new THREE.Vector3()
        const globalVertex = new THREE.Vector3()
        const nextPosition = this._characterMesh.position.clone()
        let hasCollision = false

        for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
            localVertex.fromBufferAttribute(positionAttribute, vertexIndex)
            globalVertex.copy(localVertex).applyMatrix4(this._characterMesh.matrix)
            let directionVector = globalVertex.sub(
                nextPosition.addScaledVector(
                    vector,
                    delta * PARAMS.GHOST_SPEED * PARAMS.COLLISION_LIMIT
                )
            )
            let raycaster = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
            let collisions = raycaster.intersectObjects(this._scenarioColliders)

            if (collisions.length > 0 && collisions[0].distance < directionVector.length()) {
                hasCollision = true
                break
            }
        }

        return hasCollision
    }

    private _setPosition(vector: THREE.Vector3, quaternion: THREE.Quaternion, delta: number): void {
        if (!this._ghostArmature) {
            throw new Error('Error to load Ghost Model')
        }

        const characterQuaternion = this._characterMesh.quaternion.clone()
        const hasCollisions = this._checkCollisions(vector, delta)

        if (!hasCollisions) {
            characterQuaternion.slerp(quaternion, delta * PARAMS.GHOST_SPEED)
            this._characterMesh.quaternion.copy(characterQuaternion)
            this._characterMesh.position.addScaledVector(vector, delta * PARAMS.GHOST_SPEED)
            this._ghostArmature.copy(this._characterMesh)
        }
    }

    updateControls(delta: number): void {
        if (!this._ghostArmature) {
            new THREE.BoxGeometry()
            throw new Error('Error loading Ghost Model')
        }

        const quaternion = new THREE.Quaternion()
        this._characterMesh.position.addScaledVector(this._ghostVelocity, delta)

        if (this._fwdPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)
            this._setPosition(new THREE.Vector3(1, 0, 0), quaternion, delta)
        }

        if (this._bkdPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0)
            this._setPosition(new THREE.Vector3(-1, 0, 0), quaternion, delta)
        }

        if (this._lftPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2)
            this._setPosition(new THREE.Vector3(0, 0, -1), quaternion, delta)
        }

        if (this._rgtPressed) {
            quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            this._setPosition(new THREE.Vector3(0, 0, 1), quaternion, delta)
        }

        this._ghostArmature.updateMatrixWorld()
        this._camera.position.sub(this._controls.target)
        this._controls.target.copy(this._characterMesh.position)
        this._camera.position.add(this._characterMesh.position)
    }
}

export function createGhostModel(
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls,
    scenarioColliders: THREE.Mesh[]
) {
    return new Ghost(camera, controls, scenarioColliders)
}
