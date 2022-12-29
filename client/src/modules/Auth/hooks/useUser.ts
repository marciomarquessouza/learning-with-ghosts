import { useContext } from 'react'

import { AuthContext } from 'modules/Auth/contexts/AuthContext'

export function useUser() {
    return useContext(AuthContext)
}
