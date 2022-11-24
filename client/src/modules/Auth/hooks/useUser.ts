import { useContext } from 'react'

import { AuthContext } from 'modules/Auth/contexts/AuthContext'

export function useUser() {
    const { user, setChapter, loading, error } = useContext(AuthContext)

    return {
        user,
        setChapter,
        loading,
        error,
    }
}
