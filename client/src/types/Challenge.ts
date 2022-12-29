import { CHARACTER } from 'modules/GhostTown/const'

interface Challenge {
    uid: string
    title: string
    description: string
    character: CHARACTER
    level: number
    reward: number
    completed: boolean
    blocked: boolean
}

export default Challenge
