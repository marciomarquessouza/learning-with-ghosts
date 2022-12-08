import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { User } from 'types/User'

import { createMainScene } from 'modules/GhostTown/scenes/main-scene'
import GhostLoading from 'common/components/GhostLoading'
import { useScreenGUI } from 'modules/GhostTown/hooks/useScreenGUI'

interface GhostTownProps {
    user: User
}

export default function GhostTown({ user }: GhostTownProps) {
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

        if (container) {
            createMainScene({ renderer, container, screenGUI, user }).then((sceneData) => {
                if (sceneData && container.childNodes.length === 0) {
                    container.appendChild(sceneData.sceneDomElement)
                    setRenderer(renderer)
                    setRemoveScene({ exec: sceneData.removeScene })
                    setLoading(false)
                }
            })
        }
    }, [loading, screenGUI, user])

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
