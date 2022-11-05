import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import BackButton from '..'
import { customRender } from '../../../../test-helpers'

describe('components >> BackButton', () => {
    it('should render the component BackButton properly', () => {
        const { container } = render(<BackButton />)

        expect(container).toMatchSnapshot('BackButton.default')
    })

    it('should fire the navigate event when the return button is pressed', () => {
        const { getByText, router } = customRender(<BackButton />)

        act(() => {
            fireEvent.click(getByText('Return'))
        })

        expect(router.back).toHaveBeenCalledTimes(1)
    })
})
