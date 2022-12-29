import * as THREE from 'three'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { User } from 'types'
import { PAGES_ROUTERS } from 'const'
import { createMainScene } from 'modules/GhostTown/scenes/main-scene'
import { useGameGui } from 'modules/GhostTown/hooks/useGameGui'

import GhostLoading from 'common/components/GhostLoading'
import { useGameProgress } from './hooks/useGameProgress'
import { useGameContent } from './hooks/useGameContent'

interface GhostTownProps {
    user: User
}

export default function GhostTown({ user }: GhostTownProps) {
    const router = useRouter()
    const refContainer = useRef<HTMLDivElement>(null)
    const gameGuiContext = useGameGui()
    const gameProgressContext = useGameProgress()
    const gameContentContext = useGameContent()
    const [loading, setLoading] = useState(true)
    const [rendererState, setRenderer] = useState<THREE.WebGLRenderer>()
    const [removeScene, setRemoveScene] = useState({ exec: () => {} })

    useEffect(() => {
        const container = refContainer?.current

        if (!gameContentContext.chapter) return

        if (container) {
            createMainScene({
                container,
                gameGuiContext,
                gameProgressContext,
                gameContentContext,
            }).then((sceneData) => {
                if (sceneData && container.childNodes.length === 0) {
                    const { renderer, removeScene } = sceneData
                    container.appendChild(renderer.domElement)
                    setRenderer(renderer)
                    setRemoveScene({ exec: removeScene })
                    setLoading(false)
                }
            })
        }
    }, [loading, gameGuiContext, gameContentContext, gameProgressContext])

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
