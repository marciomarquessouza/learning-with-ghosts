import { CHARACTER, EXPRESSION, INTERACTIONS_TYPES } from '../../const'

interface InteractionDialog {
    type: INTERACTIONS_TYPES.DIALOG
    from: CHARACTER
    expression: EXPRESSION
    text: string
}

interface InteractionTextInput {
    type: INTERACTIONS_TYPES.TEXT_INPUT
    from: CHARACTER
    expression: EXPRESSION
    text: string
}

interface InteractionAudioInput {
    type: INTERACTIONS_TYPES.AUDIO_INPUT
    from: CHARACTER
    expression: EXPRESSION
    text: string
}

export type InteractionType = InteractionDialog | InteractionTextInput | InteractionAudioInput
