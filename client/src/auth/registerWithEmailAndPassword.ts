import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { COLLECTIONS } from '../const'

export async function registerWithEmailAndPassword(name: string, email: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, COLLECTIONS.USERS), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (err) {
        throw new Error('Error to register with email and password')
    }
}
