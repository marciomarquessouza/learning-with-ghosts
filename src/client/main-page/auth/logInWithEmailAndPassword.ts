import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'

async function logInWithEmailAndPassword(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        throw new Error('Error to sign in with email and password')
    }
}

export default logInWithEmailAndPassword
