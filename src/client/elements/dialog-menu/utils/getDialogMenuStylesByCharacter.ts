import { CHARACTER } from '../../../const'
import { MenuStyles } from '../../types'

export interface DialogMenuStyles extends MenuStyles {
    font: string
}

export default function getDialogMenuStylesByCharacter(character: CHARACTER): DialogMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                pattern: 'bg-lighthouse-princess-pattern',
                color: 'cherry',
                fillColor: '#CB214A',
                font: 'font-princess',
            }
    }
}
