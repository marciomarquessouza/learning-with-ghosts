import { LANGUAGES } from 'modules/GhostTown/const'

interface User {
    authProvider: string
    email: string
    name: string
    uid: string
    photoURL?: string | null
    gameLanguage?: LANGUAGES
}

export default User
