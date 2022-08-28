import { html, fixture, expect } from '@open-wc/testing'

import DialogMenu, { DIALOG_MENU_DEFAULTS } from '../DialogMenu'
import '../../index'
import { CHARACTER, EXPRESSION } from '../../../const'

describe('client > elements > chapter-title > DialogMenu', () => {
    it('renders properly with default values', async () => {
        const { character, expression, text, onClose, onNext } = DIALOG_MENU_DEFAULTS
        const dialogMenu: DialogMenu = await fixture(html`<dialog-menu></dialog-menu>`)

        expect(dialogMenu.character).to.equal(character)
        expect(dialogMenu.expression).to.equal(expression)
        expect(dialogMenu.text).to.equal(text)
    })

    it('renders all props properly ', async () => {
        const props = {
            character: CHARACTER.GHOST,
            expression: EXPRESSION.HAPPINESS,
            text: '__MOCK__TEXT__',
            onClose: () => {},
            onNext: () => {},
        }
        const dialogMenu: DialogMenu = await fixture(html`<dialog-menu
            character=${props.character}
            expression=${props.expression}
            text=${props.text}
            onClose=${props.onClose}
            onNext=${props.onNext}
        ></dialog-menu>`)

        expect(dialogMenu.character).to.equal(props.character)
        expect(dialogMenu.expression).to.equal(props.expression)
        expect(dialogMenu.text).to.equal(props.text)
    })

    it('fires the onClose callback when the CLOSE button is pressed', async () => {})
})
