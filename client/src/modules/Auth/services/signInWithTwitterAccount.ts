import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { query, getDocs, collection, where } from 'firebase/firestore'

import { auth, db } from 'config/firebase'
import { createUser } from './createUser'

const twitterProvider = new TwitterAuthProvider()

export async function signInWithTwitter() {
    try {
        const response = await signInWithPopup(auth, twitterProvider)
        const user = response.user
        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs = await getDocs(q)
        if (docs?.docs?.length === 0) {
            await createUser({
                name: user?.displayName || '',
                authProvider: 'twitter',
                email: user?.email || '',
                uid: user.uid,
                photoURL: user?.photoURL,
            })
        }
    } catch (err) {
        throw new Error('Error to sign in with a Twitter Account')
    }
}
