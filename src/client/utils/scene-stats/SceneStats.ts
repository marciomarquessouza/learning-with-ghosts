import Stats from 'three/examples/jsm/libs/stats.module'

export class SceneStats {
    constructor(private stats = Stats()) {
        document.body.appendChild(this.stats.domElement)
    }

    update() {
        if (process.env.NODE_ENV === 'development') {
            this.stats.update()
        }
    }
}
