import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const twitterProvider = new TwitterAuthProvider()

async function signInWithTwitter() {
    try {
        const res = await signInWithPopup(auth, twitterProvider)
        const user = res.user
        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'twitter',
                email: user.email,
            })
        }
    } catch (err) {
        throw new Error('Error to sign in with Twitter')
    }
}

export default signInWithTwitter