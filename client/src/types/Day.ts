import { Challenge, Dialog } from './'

interface Day {
    day?: number
    title: string
    order: number
    dialogs: Dialog[]
    challenges: Challenge[]
}

export default Day
