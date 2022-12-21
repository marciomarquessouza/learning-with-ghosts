import { CHARACTER } from '../../../const'

export interface DialogMenuStyles {
    container: string
    titleColor: string
    textColor: string
    nextColor: string
    font: string
    border: string
}

export default function getDialogMenuStylesByCharacter(character?: CHARACTER): DialogMenuStyles {
    switch (character) {
        case CHARACTER.PRINCESS:
        default:
            return {
                container:
                    "bg-ivory border-2 border-cherry bg-[url('/img/princess/background-princess-banner.png')]",
                titleColor: 'text-cherry',
                textColor: 'text-cherry',
                nextColor: 'text-cherry',
                font: 'font-princess',
                border: 'border-4 border-cherry',
            }
        case CHARACTER.GHOST:
            return {
                container:
                    "bg-black border-2 border-white bg-[url('/img/ghost/background-ghost-banner.png')]",
                titleColor: 'text-primary-light',
                textColor: 'text-white',
                nextColor: 'text-primary-light',
                font: 'font-ghost',
                border: 'border-4 border-white',
            }
    }
}
