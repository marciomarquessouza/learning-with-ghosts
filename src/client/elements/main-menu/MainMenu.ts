import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ELEMENTS } from '../../const'

@customElement(ELEMENTS.MAIN_MENU)
export default class MainMenu extends LitElement {
    @property({ attribute: false })
    isModalOpen: boolean = false

    createRenderRoot() {
        return this
    }

    toggleModal() {
        this.isModalOpen = !this.isModalOpen
    }

    render() {
        return html`
            <div
                class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 md:inset-0 h-modal md:h-full"
            >
                <div class="flex flex-col flex-auto items-start justify-end h-full pr-6">
                    <div class="m-8">
                        <button
                            @click="${this.toggleModal}"
                            class="group bg-transparent focus:outline-none  active:outline-none"
                        >
                            <svg
                                height="48"
                                width="48"
                                class="text-ivory group-hover:text-primary-light"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                stroke="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M14 42V27.7l-3.05 4.85L8.4 31 24 6l15.6 25-2.55 1.55L34 27.7V42Zm3-3h5.5v-6h3v6H31V22.9l-7-11.2-7 11.2Zm5.5-11.5v-3h3v3ZM17 39h14-14Z"
                                />
                            </svg>
                            <p
                                class="font-josefin font-light text-white group-hover:text-primary-light"
                            >
                                MENU
                            </p>
                        </button>
                    </div>
                </div>
                <!-- Main modal -->
                <div
                    id="defaultModal"
                    tabindex="-1"
                    aria-hidden="true"
                    class="${this.isModalOpen
                        ? 'visible'
                        : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center"
                >
                    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        <div class="relative shadow ">
                            <div class="flex p-4 border-b border-white">
                                <div class="flex flex-1 justify-center items-center">
                                    <img src="/img/logo.png" width="124px" height="77.51px" />
                                </div>
                                <button
                                    @click="${this.toggleModal}"
                                    type="button"
                                    class="text-white bg-transparent  hover:text-primary-light focus:outline-none active:outline-none inline-flex items-center"
                                >
                                    <svg
                                        class="w-8 h-8"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="p-6 space-y-4 bg-indigo-700">
                                <p class="font-josefin text-4xl text-white">MENU</p>
                                <section class="space-y-2 pl-4">
                                    <button
                                        class="flex w-full focus:outline-none active:outline-none"
                                    >
                                        <span
                                            class="w-full flex justify-start font-josefin font-light text-white text-2xl hover:bg-primary-light focus:outline-none active:outline-none p-2"
                                            >HELP</span
                                        >
                                    </button>
                                    <button
                                        class="flex w-full focus:outline-none active:outline-none"
                                    >
                                        <span
                                            class="w-full flex justify-start font-josefin font-light text-white text-2xl hover:bg-primary-light focus:outline-none active:outline-none p-2"
                                            >ABOUT</span
                                        >
                                    </button>
                                    <button
                                        class="flex w-full focus:outline-none active:outline-none"
                                    >
                                        <span
                                            class="w-full flex justify-start font-josefin font-light text-white text-2xl hover:bg-primary-light focus:outline-none active:outline-none p-2"
                                            >QUIT GAME</span
                                        >
                                    </button>
                                </section>
                            </div>
                            <div
                                class="flex items-center p-6 space-x-2 rounded-b border-t border-white"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
