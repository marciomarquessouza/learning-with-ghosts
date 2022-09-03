import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

function logout() {
    signOut(auth)
}

export default logout
