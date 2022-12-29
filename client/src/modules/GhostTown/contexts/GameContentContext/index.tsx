import React, { createContext, useCallback } from 'react'
import { useQuery } from 'react-query'

import { Chapter } from 'types'
import { fetchGameContent } from './fetchGameContent'
import { useGameProgress } from 'modules/GhostTown/hooks/useGameProgress'

export interface GameContentContextType {
    chapter?: Chapter | null
    status: 'loading' | 'error' | 'idle' | 'success'
    error: boolean
}

interface GameContentProviderProps {
    children: React.ReactNode
}

export const GameContentContext = createContext<GameContentContextType>({
    chapter: null,
    status: 'idle',
    error: false,
})

function GameContentProvider({ children }: GameContentProviderProps) {
    const { gameProgress, isReady: isGameProgressReady } = useGameProgress()
    const { data, status, isError } = useQuery({
        queryKey: ['interactions', gameProgress.chapter],
        queryFn: () => fetchGameContent(gameProgress.chapter),
        enabled: isGameProgressReady,
    })

    return (
        <GameContentContext.Provider
            value={{
                chapter: data,
                error: isError,
                status: status,
            }}
        >
            {children}
        </GameContentContext.Provider>
    )
}

export default GameContentProvider
