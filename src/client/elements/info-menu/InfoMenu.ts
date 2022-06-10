import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ELEMENTS } from '../../const'

export interface InfoMenuProps {
    avatar: string
    title: string
}

@customElement(ELEMENTS.INFO_MENU)
export class InfoMenu extends LitElement {
    @property()
    props: InfoMenuProps = {
        avatar: '',
        title: '',
    }

    createRenderRoot() {
        return this
    }

    private _hidden() {
        this.hidden = true
    }

    render() {
        const { avatar, title } = this.props

        return html`
            <div
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
            >
                <div class="flex flex-col flex-auto items-center justify-end h-full py-4 pr-6">
                    <div class="w-3/5 max-w-4xl h-24 rounded-xl bg-background">
                        <div class="flex items-center space-x-4">
                            <div class="flex-shrink-0 mt-4 ml-4">
                                <img
                                    src="${avatar}"
                                    class="rounded-full h-16 w-16 border-4 border-secondary"
                                />
                            </div>
                            <div class="flex-1 min-w-0">
                                <p
                                    class="font-josefin font-normal text-lg text-secondary uppercase"
                                >
                                    ${title}
                                </p>
                                <div class="flex flex-row mt-1">
                                    <div class="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect width="15" height="15" fill="#00A1A4" />
                                        </svg>
                                        <p class="font-josefin text-sm text-white ml-1 mt-1">
                                            TALK [SPACE]
                                        </p>
                                    </div>
                                    <div class="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect width="15" height="15" fill="#00A1A4" />
                                        </svg>
                                        <p class="font-josefin text-sm text-white ml-1 mt-1">
                                            MISSIONS [M]
                                        </p>
                                    </div>
                                    <div class="flex flex-row items-center mr-4">
                                        <svg width="15" height="15">
                                            <rect width="15" height="15" fill="#00A1A4" />
                                        </svg>
                                        <button
                                            class="font-josefin text-sm text-white ml-1 mt-1 bg-transparent hover:text-secondary focus:outline-none  active:outline-none"
                                        >
                                            INFO [I]
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                @click="${this._hidden}"
                                class="items-start font-josefin font-normal text-sm text-white bg-transparent hover:text-secondary focus:outline-none  active:outline-none"
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
