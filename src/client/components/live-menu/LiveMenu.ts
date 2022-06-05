import { LiveMenuProps } from '.'
import { ELEMENTS } from '../../const'
import ElementManager from '../../libs/ElementManager'
import html from '../../libs/html'
import createLiveIcons from './LivesIcons'

export interface LiveMenuStates {
    lives: number
    chapterNumber: number
    chapterName: string
    day: number
}

export class LiveMenu extends ElementManager<LiveMenuProps, LiveMenuStates> {
    constructor(props: LiveMenuProps) {
        const { lives, chapterName, chapterNumber, day } = props
        const states: LiveMenuStates = {
            lives,
            chapterNumber,
            chapterName,
            day,
        }
        super(ELEMENTS.LIFE_MENU, props, states)
    }

    public setLives(lives: number) {
        this.states = { ...this.states, lives }
    }

    public setChapterInfo(chapterNumber: number, chapterName: string) {
        this.states = { ...this.states, chapterName, chapterNumber }
    }

    render(): HTMLElement {
        const { lives, chapterNumber, chapterName, day } = this.states
        return html`
            <div
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-modal md:h-full"
            >
                <div class="flex flex-col flex-auto items-end justify-start py-4 pr-6">
                    <div class="flex flex-row">${createLiveIcons({ lives })}</div>
                    <p class="font-josefin font-light flex-shrink mx-4 text-white">
                        <span class="font-medium">Chapter ${chapterNumber}: </span>
                        <span class="font-light uppercase">${chapterName}</span>
                    </p>
                    <p
                        class="font-josefin font-medium flex-shrink mx-4 text-primary-light text-base"
                    >
                        DAY ${day}
                    </p>
                </div>
            </div>
        `
    }
}
