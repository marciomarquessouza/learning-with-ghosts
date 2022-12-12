interface User {
    authProvider: string
    chapter: number
    day: number
    lives: number
    email: string
    name: string
    uid: string
    photoURL?: string | null
}

export default User
