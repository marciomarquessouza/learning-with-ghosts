import { CHARACTER, EXPRESSION } from 'modules/GhostTown/const'

interface Dialog {
    type: string
    from: CHARACTER
    text: string
    expression: EXPRESSION
    order: number
    character: CHARACTER
    step: number
}

export default Dialog
