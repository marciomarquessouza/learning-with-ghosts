import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs = await getDocs(q)
        if (docs?.docs?.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
            })
        }
    } catch (err) {
        throw new Error('Error to sign in with a Google Account')
    }
}
