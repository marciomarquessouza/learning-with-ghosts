import { CHARACTER } from '../../../const'
import { MenuStyles } from '../../types'

export interface InfoMenuStyles {
    container: string
    textColor: string
    bgColor: string
    border: string
}

export default function getInfoMenuStylesByCharacter(character?: CHARACTER | null): InfoMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                container:
                    "w-3/5 max-w-4xl h-24 rounded-xl m-10 bg-ivory border-2 border-cherry bg-[url('/img/princess/background-princess-banner.png')]",
                textColor: 'text-cherry',
                bgColor: 'bg-cherry',
                border: 'border-4 border-cherry',
            }
    }
}
