import { setDoc, doc } from 'firebase/firestore'
import { db } from 'config/firebase'
import { COLLECTIONS, DEFAULT_AVATAR, DEFAULT_LIVES } from 'const'
import { LANGUAGES } from 'modules/GhostTown/const'

export interface CreateUserProps {
    name: string
    authProvider: string
    email: string
    uid: string
    photoURL?: string | null
    gameLanguage?: LANGUAGES
}

export async function createUser({
    name,
    authProvider,
    email,
    uid,
    photoURL = DEFAULT_AVATAR,
    gameLanguage = LANGUAGES.GERMAN,
}: CreateUserProps) {
    await setDoc(doc(db, COLLECTIONS.USERS, uid), {
        name,
        authProvider,
        email,
        uid,
        photoURL,
        gameLanguage,
    })
    await setDoc(doc(db, COLLECTIONS.USERS, uid, COLLECTIONS.PROGRESS, gameLanguage), {
        language: gameLanguage,
        chapter: 1,
        day: 1,
        lives: DEFAULT_LIVES,
    })
}
