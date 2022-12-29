import React, { createContext, useEffect, useState, useCallback } from 'react'

import { User } from 'types'
import { useDocument } from 'common/hooks/useDocument'
import { COLLECTIONS } from 'const'
import { useAuth } from 'modules/Auth/hooks/useAuth'
import { LANGUAGES } from 'modules/GhostTown/const'

export interface AuthContextType {
    user?: User | null
    loading: boolean
    error?: Error | null
    setLanguage: (language: LANGUAGES) => void
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    setLanguage: (language: LANGUAGES) => {},
})

function AuthProvider({ children }: AuthProviderProps) {
    const { user: authUser, loading: authUserLoading } = useAuth()
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { getDocument, setDocument } = useDocument()

    const handleSetLanguage = useCallback(
        async (language: LANGUAGES) => {
            if (!user) return null
            setLoading(true)
            setDocument<User>({ language }, COLLECTIONS.USERS, user.uid)
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
                setLanguage: handleSetLanguage,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
