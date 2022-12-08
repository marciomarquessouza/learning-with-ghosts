import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import env from 'config/env'

const firebaseConfig = {
    apiKey: env.FIREBASE.API_KEY,
    authDomain: env.FIREBASE.AUTH_DOMAIN,
    projectId: env.FIREBASE.PROJECT_ID,
    storageBucket: env.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE.MESSAGING_SENDER_ID,
    appId: env.FIREBASE.APP_ID,
    measurementId: env.FIREBASE.MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
