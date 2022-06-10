import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export interface LiveMenuProps {
    lives: number
    chapterNumber: number
    chapterName: string
    day: number
}

@customElement('live-menu')
export class LiveMenu extends LitElement {
    @property()
    props: LiveMenuProps = {
        lives: 5,
        chapterNumber: 1,
        chapterName: '',
        day: 1,
    }

    createRenderRoot() {
        return this
    }

    render() {
        const { lives, chapterNumber, chapterName, day } = this.props
        return html`
            <div
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 w-full md:inset-0 h-modal md:h-full"
            >
                <div class="flex flex-col flex-auto items-end justify-start py-4 pr-6">
                    <div class="flex flex-row">
                        ${[...Array(lives).keys()].map(() => html`<img src="/img/live.png" />`)}
                    </div>
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
