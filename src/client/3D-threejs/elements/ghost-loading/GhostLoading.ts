import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('ghost-loading')
export default class GhostLoading extends LitElement {
    createRenderRoot() {
        return this
    }

    render() {
        return html`
            <div class="h-screen m-0 bg-background">
                <div class="flex flex-col h-full">
                    <div class="flex-initial">
                        <div class="mt-6 ml-6">
                            <img src="/img/logo.png" />
                        </div>
                    </div>
                    <div class="flex flex-auto items-center justify-center">
                        <div class="flex flex-col items-center justify-center">
                            <img
                                src="/img/ghost-loader-body.png"
                                class="animate-ghost-levitation"
                            />
                            <img src="/img/ghost-loader-floor-shadow.png" />
                            <div class="mt-4">
                                <svg id="progress" viewBox="0 0 200 8" width="200" height="8">
                                    <rect fill="#FFFAEF" class="w-64 h-2" opacity="0.5" />
                                    <rect fill="#6C63FF" class="animate-progress-bar w-64 h-2" />
                                </svg>
                            </div>
                            <div class="my-4">
                                <p class="font-josefin font-medium text-2xl text-ivory">
                                    Looooading....
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
