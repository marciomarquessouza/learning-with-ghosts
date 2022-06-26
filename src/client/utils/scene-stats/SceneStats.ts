import Stats from 'three/examples/jsm/libs/stats.module'

export class SceneStats {
    private _isDevEnv = process.env.NODE_ENV === 'development'

    constructor(private stats = Stats()) {
        this._isDevEnv && document.body.appendChild(this.stats.domElement)
    }

    update() {
        if (this._isDevEnv) {
            this.stats.update()
        }
    }
}
