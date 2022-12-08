import Stats from 'three/examples/jsm/libs/stats.module'

export class SceneStats {
    private _isDevEnv = process.env.NODE_ENV === 'development'

    constructor(private stats = Stats()) {
        if (this._isDevEnv) {
            const hasGhostTownStatsElement = !!document.getElementById('ghost-town-stats')
            if (!hasGhostTownStatsElement) {
                const nextElement = document.getElementById('__next')
                const statsElement = this.stats.domElement
                statsElement.setAttribute('id', 'ghost-town-stats')
                nextElement && nextElement.appendChild(statsElement)
            }
        }
    }

    update() {
        if (this._isDevEnv) {
            this.stats.update()
        }
    }

    close() {
        this.stats.end()
        this.stats.domElement.remove()
    }
}
