export interface User {
    authProvider: string
    chapter: number
    day: number
    email: string
    name: string
    uid: string
    photoURL?: string | null
}
