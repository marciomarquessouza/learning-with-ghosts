import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

function useAuth() {
    const [user, loading, error] = useAuthState(auth)

    return { user, loading, error }
}

export default useAuth
