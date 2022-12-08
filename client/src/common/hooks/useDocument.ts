import { useCallback } from 'react'
import { doc, getDoc, setDoc, deleteDoc, DocumentData, WithFieldValue } from 'firebase/firestore'
import { db } from 'config/firebase'
import { COLLECTIONS } from 'const'

export function useDocument() {
    const getDocRef = useCallback((collection: COLLECTIONS, uid: string) => {
        if (!collection || !uid) return null
        return doc(db, collection, uid)
    }, [])

    const getDocument = useCallback(
        async function <T>(collection: COLLECTIONS, uid: string): Promise<T | null> {
            const docRef = getDocRef(collection, uid)
            if (!docRef) return null
            try {
                const returnedValue = await getDoc(docRef)
                return returnedValue.data() as T
            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        [getDocRef]
    )

    const setDocument = useCallback(
        async function <T>(
            collection: COLLECTIONS,
            uid: string,
            updateData: WithFieldValue<DocumentData>
        ): Promise<T | null> {
            const docRef = getDocRef(collection, uid)
            if (!docRef) return null
            try {
                await setDoc(docRef, updateData)
                return await getDocument<T>(collection, uid)
            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        [getDocRef, getDocument]
    )

    const removeDocument = useCallback(
        async function <T>(collection: COLLECTIONS, uid: string): Promise<T | null> {
            const docRef = getDocRef(collection, uid)
            if (!docRef) return null
            try {
                return (await deleteDoc(docRef)) as T
            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        [getDocRef]
    )

    return { getDocument, setDocument, removeDocument }
}
