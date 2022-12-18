import { CHARACTER } from '../../../const'
import { MenuStyles } from '../../types'

export interface InfoMenuStyles extends MenuStyles {}

export default function getInfoMenuStylesByCharacter(character?: CHARACTER | null): InfoMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                pattern: 'bg-white',
                textColor: 'text-cherry',
                bgColor: 'bg-cherry',
                border: 'border-4 border-cherry',
            }
    }
}
