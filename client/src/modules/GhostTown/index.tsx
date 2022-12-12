import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { User, Chapter } from 'types'

import { createMainScene } from 'modules/GhostTown/scenes/main-scene'
import { useScreenGUI } from 'modules/GhostTown/hooks/useScreenGUI'

import GhostLoading from 'common/components/GhostLoading'

interface GhostTownProps {
    user: User
    chapter?: Chapter | null
}

export default function GhostTown({ user, chapter }: GhostTownProps) {
    const refContainer = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState(true)
    const [rendererState, setRenderer] = useState<THREE.WebGLRenderer>()
    const [removeScene, setRemoveScene] = useState({ exec: () => {} })

    const screenGUI = useScreenGUI()

    useEffect(() => {
        const container = refContainer?.current
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.physicallyCorrectLights = true
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = false
        renderer.outputEncoding = THREE.sRGBEncoding

        if (!chapter) return

        if (container) {
            createMainScene({ renderer, container, screenGUI, user, chapter }).then((sceneData) => {
                if (sceneData && container.childNodes.length === 0) {
                    container.appendChild(sceneData.sceneDomElement)
                    setRenderer(renderer)
                    setRemoveScene({ exec: sceneData.removeScene })
                    setLoading(false)
                }
            })
        }
    }, [loading, screenGUI, user, chapter])

    useEffect(() => {
        return () => {
            rendererState?.dispose()
            removeScene.exec()
        }
    }, [rendererState, removeScene])

    return (
        <>
            {loading && <GhostLoading />}
            <div
                className="bg-gradient-to-b from-background to-primary-dark"
                ref={refContainer}
            ></div>
        </>
    )
}
