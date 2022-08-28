import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { CHARACTER, ELEMENTS } from '../../const'
import getInfoMenuStylesByCharacter from './utils/getInfoMenuStylesByCharacter'

export interface InfoMenuProps {
    character: CHARACTER | null
    avatar: string
    title: string
    onTalk?: (character: CHARACTER) => void
}

export const INFO_MENU_DEFAULTS: InfoMenuProps = {
    character: null,
    avatar: '',
    title: '',
    onTalk: (character: CHARACTER) => {},
}

@customElement(ELEMENTS.INFO_MENU)
export default class InfoMenu extends LitElement {
    @property()
    props: InfoMenuProps = INFO_MENU_DEFAULTS

    createRenderRoot() {
        return this
    }

    private _hidden() {
        this.hidden = true
    }

    private _handleTalk(event: MouseEvent) {
        event.stopPropagation()
        const { character, onTalk } = this.props
        if (character) {
            onTalk && onTalk(character)
        }
    }

    render() {
        const { avatar, title, character } = this.props

        if (!character) {
            return null
        }

        const styles = getInfoMenuStylesByCharacter(character)

        return html`
            <div
                class="overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            >
                <div class="flex flex-col flex-auto items-center justify-end h-full pr-6">
                    <div
                        class="w-3/5 max-w-4xl h-24 rounded-xl m-10 ${styles.pattern} animate-info-menu-in"
                    >
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0 mt-4 ml-4">
                                <img
                                    src="${avatar}"
                                    class="rounded-full h-16 w-16 border-4 border-${styles.color}"
                                />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="font-josefin font-normal text-lg text-${styles.color} uppercase"
                                >
                                    ${title}
                                </p>
                                <div class="flex flex-row mt-1">
                                    <div class="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect
                                                width="15"
                                                height="15"
                                                fill="${styles.fillColor}"
                                            />
                                        </svg>
                                        <button
                                            @click="${this._handleTalk}"
                                            class="font-josefin text-sm text-${styles.color} ml-1 mt-1 bg-transparent hover:text-${styles.color} focus:outline-none  active:outline-none"
                                        >
                                            TALK [SPACE]
                                        </button>
                                    </div>
                                    <div class="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect
                                                width="15"
                                                height="15"
                                                fill="${styles.fillColor}"
                                            />
                                        </svg>
                                        <p
                                            class="font-josefin text-sm text-${styles.color} ml-1 mt-1"
                                        >
                                            MISSIONS [M]
                                        </p>
                                    </div>
                                    <div class="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect
                                                width="15"
                                                height="15"
                                                fill="${styles.fillColor}"
                                            />
                                        </svg>
                                        <button
                                            class="font-josefin text-sm text-${styles.color} ml-1 mt-1 bg-transparent hover:text-${styles.color} focus:outline-none  active:outline-none"
                                        >
                                            INFO [I]
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                @click="${this._hidden}"
                                class="items-start font-josefin font-normal text-sm text-${styles.color} bg-transparent hover:text-${styles.color} focus:outline-none  active:outline-none"
                            >
                                CLOSE [ESC]
                            </button>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
