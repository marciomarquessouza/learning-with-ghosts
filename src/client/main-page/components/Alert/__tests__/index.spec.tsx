import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Alert from '../'
import { ALERTS_TYPE_ENUM } from '../../../contexts/AlertContext'

const defaultMockedProps = {
    title: '_MOCK_TITLE_',
    message: '_MOCK_MESSAGE_',
    type: ALERTS_TYPE_ENUM.SUCCESS,
    open: true,
    onClose: jest.fn(),
}

describe('components >> Alert', () => {
    it('should render all types of Alerts properly', () => {
        const mockedSuccessProps = { ...defaultMockedProps, type: ALERTS_TYPE_ENUM.SUCCESS }
        const mockedErrorProps = { ...defaultMockedProps, type: ALERTS_TYPE_ENUM.ERROR }

        const { container: containerSuccess } = render(<Alert {...mockedSuccessProps} />)
        const { container: containerError } = render(<Alert {...mockedErrorProps} />)

        expect(containerSuccess).toMatchSnapshot('Alert-success')
        expect(containerError).toMatchSnapshot('Alert-error')
    })

    it('should fire the "onClose" function when the close button is pressed', () => {
        const spyOnClose = jest.fn()
        const mockedProps = { ...defaultMockedProps, onClose: spyOnClose }

        const { getByRole } = render(<Alert {...mockedProps} />)

        fireEvent.click(getByRole('button'))

        expect(spyOnClose).toHaveBeenCalledTimes(1)
    })
})
