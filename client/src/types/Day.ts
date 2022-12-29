import { Challenge, Dialog } from './'

interface Day {
    dayReference: number
    title: string
    dialogs: Dialog[]
    challenges: Challenge[]
}

export default Day
