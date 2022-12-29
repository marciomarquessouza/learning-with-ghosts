import { useCallback } from 'react'
import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    DocumentData,
    WithFieldValue,
    CollectionReference,
    query,
    collection,
    where,
    WhereFilterOp,
} from 'firebase/firestore'
import { db } from 'config/firebase'
import { COLLECTIONS } from 'const'

export function useDocument() {
    const getDocRef = useCallback(function (...options: string[]) {
        if (!options) return null
        const firebase: unknown = db
        return doc(firebase as CollectionReference<unknown>, ...options)
    }, [])

    const getDocument = useCallback(
        async function <T>(...options: string[]): Promise<T | null> {
            const docRef = getDocRef(...options)
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

    const getDocuments = useCallback(async function <T>(
        collectionPath: string,
        condition: [string, WhereFilterOp, unknown]
    ): Promise<T> {
        const q = query(collection(db, collectionPath), where(...condition))
        if (!q) return [] as T
        try {
            const returnedValue = await getDocs(q)
            const documents: unknown[] = []
            returnedValue.forEach((doc) => {
                documents.push({ uid: doc.id, ...doc.data() })
            })
            return documents as T
        } catch (error: any) {
            throw new Error(error?.message)
        }
    },
    [])

    const setDocument = useCallback(
        async function <T>(
            updateData: WithFieldValue<DocumentData>,
            ...options: string[]
        ): Promise<T | null> {
            const docRef = getDocRef(...options)
            if (!docRef) return null
            try {
                await setDoc(docRef, updateData)
                return await getDocument<T>(...options)
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

    return { getDocument, getDocuments, setDocument, removeDocument }
}
