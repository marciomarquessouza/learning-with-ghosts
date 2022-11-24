import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { query, getDocs, collection, where } from 'firebase/firestore'

import { auth, db } from 'config/firebase'
import { createUser } from './createUser'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs = await getDocs(q)
        if (docs?.docs?.length === 0) {
            await createUser({
                name: user?.displayName || '',
                authProvider: 'google',
                email: user?.email || '',
                uid: user.uid,
                photoURL: user?.photoURL,
            })
        }
    } catch (err) {
        throw new Error('Error to sign in with a Google Account')
    }
}
