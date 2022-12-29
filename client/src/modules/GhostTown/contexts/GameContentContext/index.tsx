import React, { createContext, useCallback } from 'react'
import { useQuery } from 'react-query'

import { Challenge, Chapter } from 'types'
import { fetchGameContent } from './fetchGameContent'
import { useGameProgress } from 'modules/GhostTown/hooks/useGameProgress'
import { CHARACTER } from 'modules/GhostTown/const'

export interface GameContentContextType {
    chapter?: Chapter | null
    status: 'loading' | 'error' | 'idle' | 'success'
    error: boolean
    getCurrentChallengesByCharacter: (character?: CHARACTER) => Challenge[]
}

interface GameContentProviderProps {
    children: React.ReactNode
}

export const GameContentContext = createContext<GameContentContextType>({
    chapter: null,
    status: 'idle',
    error: false,
    getCurrentChallengesByCharacter: (character?: CHARACTER) => [],
})

function GameContentProvider({ children }: GameContentProviderProps) {
    const { gameProgress, isReady: isGameProgressReady } = useGameProgress()
    const {
        data: chapter,
        status,
        isError,
    } = useQuery({
        queryKey: ['interactions', gameProgress.chapter],
        queryFn: () => fetchGameContent(gameProgress.chapter),
        enabled: isGameProgressReady,
    })

    const handleGetCurrentChallengesByCharacter = useCallback(
        (character?: CHARACTER) => {
            if (!character) return []
            const day = chapter?.days.find((day) => day.dayReference === gameProgress.day)
            const challenges = day?.challenges.filter(
                (challenge) => challenge.character === character
            )
            return challenges || []
        },
        [gameProgress.day, chapter?.days]
    )

    return (
        <GameContentContext.Provider
            value={{
                chapter,
                error: isError,
                status: status,
                getCurrentChallengesByCharacter: handleGetCurrentChallengesByCharacter,
            }}
        >
            {children}
        </GameContentContext.Provider>
    )
}

export default GameContentProvider
