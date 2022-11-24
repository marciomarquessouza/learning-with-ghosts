import { useCallback } from 'react'
import { doc, getDoc, setDoc, deleteDoc, DocumentData, WithFieldValue } from 'firebase/firestore'
import { db } from 'config/firebase'

export function useDocument(collection: string) {
    const getDocRef = useCallback(
        (uid: string) => {
            if (!collection || !uid) return null
            return doc(db, collection, uid)
        },
        [collection]
    )

    const getDocument = useCallback(
        async (uid: string) => {
            const docRef = getDocRef(uid)
            if (!docRef) return null
            try {
                const returnedValue = await getDoc(docRef)
                return returnedValue.data()
            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        [getDocRef]
    )

    const setDocument = useCallback(
        async (uid: string, updateData: WithFieldValue<DocumentData>) => {
            const docRef = getDocRef(uid)
            if (!docRef) return null
            try {
                await setDoc(docRef, updateData)
                return await getDocument(uid)
            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        [getDocRef, getDocument]
    )

    const removeDocument = useCallback(
        async (uid: string) => {
            const docRef = getDocRef(uid)
            if (!docRef) return null
            try {
                return await deleteDoc(docRef)
            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        [getDocRef]
    )

    return { getDocument, setDocument, removeDocument }
}
