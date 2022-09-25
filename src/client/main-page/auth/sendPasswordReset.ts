import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../config/firebase'

export async function sendPasswordReset(email: string) {
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (err: any) {
        throw new Error('Error to send the email')
    }
}
