import { CHARACTER } from '../../../const'
import { MenuStyles } from '../../types'

export interface InfoMenuStyles extends MenuStyles {}

export default function getInfoMenuStylesByCharacter(character: CHARACTER): InfoMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                pattern: 'bg-white',
                color: 'cherry',
                fillColor: '#CB214A',
            }
    }
}
