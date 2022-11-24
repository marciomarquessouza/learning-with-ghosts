import React, { createContext, useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { User } from 'modules/Auth/types/User'
import { useDocument } from 'common/hooks/useDocument'
import { auth } from 'config/firebase'
import { COLLECTIONS } from 'const'
import { useAuth } from 'common/hooks'

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
    const { user: authUser } = useAuth()
    const [user, setUser] = useState<User | null>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { getDocument, setDocument } = useDocument(COLLECTIONS.USERS)

    const handleSetChapter = useCallback(
        async (chapter: number) => {
            if (!user) return null
            setLoading(true)
            setDocument(user.uid, { chapter })
                .then((value) => {
                    setUser(value as User)
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
        if (authUser) {
            getDocument(authUser.uid)
                .then((userData) => {
                    setUser(userData as User)
                    setLoading(false)
                })
                .catch((reason) => {
                    setError(reason)
                })
        }
    }, [getDocument, authUser])

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
