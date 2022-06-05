import { ELEMENTS } from '../const'

export default class ElementManager<P, S> {
    private _states: S

    constructor(public elementId: ELEMENTS, public props: P, initialState: S) {
        this._states = initialState
        if (!elementId) {
            throw new Error('You need to give the elementId to the parent class')
        }

        const parentElement = document.getElementById(this.elementId)

        if (!parentElement) {
            throw new Error(`The parent element ${elementId} was not found in the HTML template`)
        }

        parentElement.replaceChildren(this.render())
    }

    get states() {
        return this._states
    }

    set states(newState: S) {
        this._states = newState
        document.getElementById(this.elementId)?.replaceChildren(this.render())
    }

    public unmount() {
        document.getElementById(this.elementId)?.replaceChildren('')
    }

    render(): HTMLElement {
        throw new Error('You have to implement the render method!!!')
    }
}
