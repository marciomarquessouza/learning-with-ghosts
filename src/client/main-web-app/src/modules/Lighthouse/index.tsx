import { useState, useEffect } from 'react'
import { config } from './main/config'
import { getPhaser } from './api'
import { scene01 } from './main/scenes/scene-01'
import GhostLoading from 'components/GhostLoading'

export default function Lighthouse() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (typeof window !== 'object') {
            return
        }
        if (loading) {
            const gameConfig = config(scene01)
            getPhaser({ ...gameConfig, parent: 'game-container' }).then(() => {
                setLoading(false)
            })
        }
    }, [loading])

    return loading ? <GhostLoading /> : null
}
