import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ELEMENTS } from '../../const'

export interface ChapterTitleProps {
    mainTitle: string
    subtitle: string
    chapterNumber: string
}

@customElement(ELEMENTS.CHAPTER_TITLE)
export default class ChapterTitle extends LitElement {
    @property({ type: String }) mainTitle = ''
    @property({ type: String }) subtitle = ''
    @property({ type: String }) chapterNumber = '01'

    createRenderRoot() {
        return this
    }

    render() {
        return html`
            <div
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full animate-chapter-title-out opacity-0"
            >
                <div class="flex h-full">
                    <div class="flex flex-col flex-auto items-center justify-center">
                        <img src="/img/logo.png" width="124px" height="77.51px" />
                        <div class="relative flex py-2 items-center w-96">
                            <div class="flex-grow border-t border-white"></div>
                        </div>
                        <div class="w-96 my-4">
                            <p
                                class="font-josefin font-normal text-5xl text-ivory uppercase text-center"
                            >
                                ${this.mainTitle}
                            </p>
                        </div>
                        <div class="relative flex items-center w-96">
                            <div class="flex-grow border-t border-white"></div>
                            <span
                                class="font-josefin font-light flex-shrink mx-4 text-white text-base"
                                >Chapter ${this.chapterNumber}
                            </span>
                            <div class="flex-grow border-t border-white"></div>
                        </div>
                        <div class="w-96 mt-2">
                            <p
                                class="font-josefin font-light flex-shrink mx-4 text-white text-lg uppercase text-center"
                            >
                                ${this.subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
