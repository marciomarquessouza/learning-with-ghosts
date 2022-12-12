import React, { createContext, useEffect, useState, useCallback } from 'react'

import { User } from 'types'
import { useDocument } from 'common/hooks/useDocument'
import { COLLECTIONS } from 'const'
import { useAuth } from 'modules/Auth/hooks/useAuth'

export interface AuthContextType {
    user?: User | null
    loading: boolean
    error?: Error | null
    setChapter(chapter: number): Promise<null | undefined>
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    setChapter: async (chapter: number) => null,
})

function AuthProvider({ children }: AuthProviderProps) {
    const { user: authUser, loading: authUserLoading } = useAuth()
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { getDocument, setDocument } = useDocument()

    const handleSetChapter = useCallback(
        async (chapter: number) => {
            if (!user) return null
            setLoading(true)
            setDocument<User>(COLLECTIONS.USERS, user.uid, { chapter })
                .then((updatedUser) => {
                    setUser(updatedUser)
                })
                .catch((reason) => {
                    setError(reason)
                })
                .finally(() => {
                    setLoading(false)
                })
        },
        [setDocument, user]
    )

    useEffect(() => {
        if (authUserLoading) return
        if (authUser) {
            getDocument<User>(COLLECTIONS.USERS, authUser.uid)
                .then((userData) => {
                    setUser(userData)
                    setLoading(false)
                })
                .catch((reason) => {
                    setError(reason)
                })
        } else {
            setUser(null)
            setLoading(false)
        }
    }, [getDocument, authUser, authUserLoading])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                setChapter: handleSetChapter,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
