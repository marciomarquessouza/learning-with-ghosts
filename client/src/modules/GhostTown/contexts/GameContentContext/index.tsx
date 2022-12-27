import React, { createContext } from 'react'
import { useQuery } from 'react-query'

import { Chapter } from 'types'
import { useUser } from 'modules/Auth/hooks/useUser'
import { fetchGameContent } from './fetchGameContent'

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
    const { user } = useUser()
    const { data, status, isError } = useQuery({
        queryKey: ['interactions', user?.chapter],
        queryFn: () => fetchGameContent(user?.chapter),
        enabled: !!user?.chapter,
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
