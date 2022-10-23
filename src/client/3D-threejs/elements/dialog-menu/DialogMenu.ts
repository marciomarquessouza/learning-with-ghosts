import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { CHARACTER, DIALOG_MENU, ELEMENTS, EXPRESSION } from '../../const'
import getDialogMenuStylesByCharacter from './utils/getDialogMenuStylesByCharacter'

export interface DialogMenuProps {
    character: CHARACTER | null
    expression: EXPRESSION
    title?: string
    text: string
    onClose: () => void
    onNext: () => void
}

export const DIALOG_MENU_DEFAULTS: DialogMenuProps = {
    character: CHARACTER.GHOST,
    expression: EXPRESSION.NORMAL,
    title: '',
    text: '',
    onClose: () => {},
    onNext: () => {},
}

@customElement(ELEMENTS.DIALOG_MENU)
export default class DialogMenu extends LitElement {
    @property()
    character: CHARACTER | null = DIALOG_MENU_DEFAULTS.character
    @property()
    expression: EXPRESSION = DIALOG_MENU_DEFAULTS.expression
    @property()
    title = ''
    @property()
    text: string = ''
    @property()
    onClose = () => {}
    @property()
    onNext = () => {}

    createRenderRoot(): Element | ShadowRoot {
        return this
    }

    render() {
        if (!this.character) {
            return null
        }

        const styles = getDialogMenuStylesByCharacter(this.character)
        const expressionImg = DIALOG_MENU[this.character].expressions[this.expression]
        const dialogTitle = this.title || DIALOG_MENU[this.character].title

        return html`
            <div
                class="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            >
                <div class="flex flex-col flex-auto items-center justify-end h-full pr-6">
                    <div class="w-3/5 max-w-4xl h-32 animate-dialog-menu-in  mb-14">
                        <div class="flex flex-1 pb-1">
                            <button
                                @click="${this.onClose}"
                                class="items-start font-josefin font-normal text-sm text-white bg-transparent hover:text-${styles.color} focus:outline-none  active:outline-none"
                            >
                                CLOSE [ESC]
                            </button>
                        </div>
                        <div class="rounded-xl ${styles.pattern}">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0 m-2 px-2">
                                    <img
                                        src="${expressionImg}"
                                        class="rounded-full h-28 w-28 border-4 border-${styles.color}"
                                    />
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p
                                        class="font-josefin font-bold text-lg text-${styles.color} uppercase"
                                    >
                                        ${dialogTitle}
                                    </p>
                                    <div
                                        id="${ELEMENTS.DIALOG_MENU_TEXT}"
                                        class="w-full h-16 overflow-hidden animate-typing-slow will-change-transform"
                                    >
                                        <p
                                            class="${styles.font} text-5xl text-${styles.textColor} ml-1 mt-1 text-clip whitespace-nowrap"
                                        >
                                            ${this.text}
                                        </p>
                                    </div>
                                </div>
                                <div class="mb-16">
                                    <button
                                        @click="${this.onNext}"
                                        class="items-start font-josefin font-normal text-sm text-${styles.nextColor} bg-transparent hover:text-${styles.nextColor} focus:outline-none  active:outline-none"
                                    >
                                        NEXT [SPACE]
                                    </button>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
