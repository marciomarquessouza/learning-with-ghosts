import { CHARACTER } from '../../../const'
import { MenuStyles } from '../../types'

export interface DialogMenuStyles extends MenuStyles {
    font: string
    textColor: string
    nextColor: string
}

export default function getDialogMenuStylesByCharacter(character?: CHARACTER): DialogMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                pattern: 'bg-white',
                bgColor: 'bg-cherry',
                textColor: 'text-cherry',
                nextColor: 'text-cherry',
                font: 'font-princess',
                border: 'border-4 border-cherry',
            }
        case CHARACTER.GHOST:
            return {
                pattern: 'bg-black',
                bgColor: 'primary-light',
                textColor: 'text-white',
                nextColor: 'text-white',
                font: 'font-ghost',
                border: 'border-4 border-white',
            }
    }
}
