import { setDoc, doc } from 'firebase/firestore'
import { db } from 'config/firebase'
import { COLLECTIONS, DEFAULT_AVATAR } from 'const'

export interface CreateUserProps {
    name: string
    authProvider: string
    email: string
    uid: string
    photoURL?: string | null
}

export async function createUser({
    name,
    authProvider,
    email,
    uid,
    photoURL = DEFAULT_AVATAR,
}: CreateUserProps) {
    await setDoc(doc(db, COLLECTIONS.USERS, uid), {
        name,
        authProvider,
        email,
        uid,
        chapter: 1,
        day: 1,
        lives: 5,
        photoURL,
    })
}
