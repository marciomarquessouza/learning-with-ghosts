import React, { createContext } from 'react'
import { useQuery } from 'react-query'

import cmsApi from 'config/cms'
import { Chapter } from 'types'
import { useUser } from 'modules/Auth/hooks/useUser'
import { parseInteractions, RawInteractionData } from '../utils/parseInteractions'

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

async function fetchGameInteractions(chapterNumber?: number) {
    if (!chapterNumber) return null
    const data = await cmsApi(
        `chapters?populate[days][populate][0]=dialogs&filters[chapterNumber]=${chapterNumber}`
    ).json()
    return parseInteractions(data as RawInteractionData)
}

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
