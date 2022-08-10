import { CHARACTER } from '../../../const'
import { MenuStyles } from '../../types'

export interface DialogMenuStyles extends MenuStyles {
    font: string
    textColor: string
    nextColor: string
}

export default function getDialogMenuStylesByCharacter(character: CHARACTER): DialogMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                pattern: 'bg-white',
                color: 'cherry',
                textColor: 'cherry',
                nextColor: 'cherry',
                fillColor: '#CB214A',
                font: 'font-princess',
            }
        case CHARACTER.GHOST:
            return {
                pattern: 'bg-black',
                color: 'primary-light',
                textColor: 'white',
                nextColor: 'white',
                fillColor: '#6C63FF',
                font: 'font-ghost',
            }
    }
}
