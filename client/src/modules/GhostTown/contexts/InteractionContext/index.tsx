import React, { createContext } from 'react'
import { useQuery } from 'react-query'

import { Chapter } from 'types'
import { useUser } from 'modules/Auth/hooks/useUser'
import { fetchGameInteractions } from './fetchGameInteractions'

export interface InteractionContextType {
    chapter?: Chapter | null
    statusInteraction: 'loading' | 'error' | 'idle' | 'success'
    errorInteraction: boolean
}

interface InteractionProviderProps {
    children: React.ReactNode
}

export const InteractionContext = createContext<InteractionContextType>({
    chapter: null,
    statusInteraction: 'idle',
    errorInteraction: false,
})

function InteractionProvider({ children }: InteractionProviderProps) {
    const { user } = useUser()
    const { data, status, isError } = useQuery({
        queryKey: ['interactions', user?.chapter],
        queryFn: () => fetchGameInteractions(user?.chapter),
        enabled: !!user?.chapter,
    })

    return (
        <InteractionContext.Provider
            value={{
                chapter: data,
                errorInteraction: isError,
                statusInteraction: status,
            }}
        >
            {children}
        </InteractionContext.Provider>
    )
}

export default InteractionProvider
