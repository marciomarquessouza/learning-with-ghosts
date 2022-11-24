import { signOut } from 'firebase/auth'

import { auth } from 'config/firebase'

export function logout() {
    signOut(auth)
}
