import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from 'config/firebase'
import { createUser } from './createUser'

export async function registerWithEmailAndPassword(name: string, email: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        if (auth.currentUser) {
            await updateProfile(auth.currentUser, {
                displayName: name,
            })
        }
        await createUser({ name, authProvider: 'email_password', email, uid: user.uid })
    } catch (err) {
        throw new Error(`Error to register with email and password`)
    }
}
