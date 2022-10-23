import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import BackButton from '..'

const mockUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockUsedNavigate,
}))

describe('components >> BackButton', () => {
    it('should render the component BackButton properly', () => {
        const { container } = render(<BackButton />)

        expect(container).toMatchSnapshot('BackButton.default')
    })

    it('should fire the navigate event when the return button is pressed', () => {
        const { getByText } = render(<BackButton />)

        fireEvent.click(getByText('Return'))

        expect(mockUsedNavigate).toHaveBeenCalledTimes(1)
        expect(mockUsedNavigate).toHaveBeenCalledWith(-1)
    })
})
