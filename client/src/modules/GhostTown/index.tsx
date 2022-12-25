import * as THREE from 'three'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { User, Chapter } from 'types'
import { PAGES_ROUTERS } from 'const'
import { createMainScene } from 'modules/GhostTown/scenes/main-scene'
import { useGhostTownGui } from 'modules/GhostTown/hooks/useGhostTownGui'

import GhostLoading from 'common/components/GhostLoading'

interface GhostTownProps {
    user: User
    chapter?: Chapter | null
}

export default function GhostTown({ user, chapter }: GhostTownProps) {
    const router = useRouter()
    const refContainer = useRef<HTMLDivElement>(null)
    const screenGUI = useGhostTownGui()
    const [loading, setLoading] = useState(true)
    const [rendererState, setRenderer] = useState<THREE.WebGLRenderer>()
    const [removeScene, setRemoveScene] = useState({ exec: () => {} })

    useEffect(() => {
        const container = refContainer?.current

        if (!chapter) return

        if (container) {
            createMainScene({ container, screenGUI, user, chapter }).then((sceneData) => {
                if (sceneData && container.childNodes.length === 0) {
                    const { renderer, removeScene } = sceneData
                    container.appendChild(renderer.domElement)
                    setRenderer(renderer)
                    setRemoveScene({ exec: removeScene })
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

    if (!user) {
        router.push(PAGES_ROUTERS.REGISTER)
    }

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
