import { ChapterTitleProps } from '.'
import { ELEMENTS } from '../../const'
import ElementManager from '../../libs/ElementManager'
import html from '../../libs/html'

export default class ChapterTitle extends ElementManager<ChapterTitleProps, {}> {
    constructor(props: ChapterTitleProps) {
        super(ELEMENTS.CHAPTER_TITLE, props, {})
    }

    render(): HTMLElement {
        const { title, subtitle, chapterNumber } = this.props

        return html`
            <div
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full animate-chapter-title-out"
            >
                <div class="flex h-full animate-chapter-title-in">
                    <div class="flex flex-col flex-auto items-center justify-center">
                        <img src="/img/logo.png" width="124px" height="77.51px" />
                        <div class="relative flex py-2 items-center w-96">
                            <div class="flex-grow border-t border-white"></div>
                        </div>
                        <div class="w-96 my-4">
                            <p
                                class="font-josefin font-normal text-5xl text-ivory uppercase text-center"
                            >
                                ${title}
                            </p>
                        </div>
                        <div class="relative flex items-center w-96">
                            <div class="flex-grow border-t border-white"></div>
                            <span
                                class="font-josefin font-light flex-shrink mx-4 text-white text-base"
                                >Chapter ${chapterNumber}
                            </span>
                            <div class="flex-grow border-t border-white"></div>
                        </div>
                        <div class="w-96 mt-2">
                            <p
                                class="font-josefin font-light flex-shrink mx-4 text-white text-lg uppercase text-center"
                            >
                                ${subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
