import React from 'react'
import { fireEvent, waitFor, act } from '@testing-library/react'

import { customRender } from '../../../../test-helpers'
import { sendPasswordResetEmail } from 'firebase/auth'

import ResetPassword from '..'

describe('pages >> ResetPassword', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the ResetPassword page properly', () => {
        const { container } = customRender(<ResetPassword />)
        expect(container).toMatchSnapshot('ResetPassword-default')
    })

    it('should navigate to /register path case the Register link is pressed', () => {
        const { getByText, router } = customRender(<ResetPassword />)

        act(() => {
            fireEvent.click(getByText('Register'))
        })

        expect(router.push).toHaveBeenCalledTimes(1)
        expect(router.push).toHaveBeenCalledWith('/register')
    })

    it('should show an error message if the Send button was pressed and the email was not filled in', async () => {
        const { getByText, container } = customRender(<ResetPassword />)

        act(() => {
            fireEvent.click(getByText('Send'))
        })

        await act(async () => {
            await waitFor(() => {
                getByText('Please enter your email first')
            })
        })

        expect(container).toMatchSnapshot('Error-email')
        expect(sendPasswordResetEmail).toHaveBeenCalledTimes(0)
    })

    it('should call the sendPasswordReset function when the "Send" button is pressed', async () => {
        const mockEmail = '__MOCK__EMAIL__'

        ;(sendPasswordResetEmail as jest.Mock).mockImplementation(() => {
            return Promise.resolve()
        })
        const { getByText, getByPlaceholderText, container } = customRender(<ResetPassword />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: mockEmail },
            })
        })

        act(() => {
            fireEvent.click(getByText('Send'))
        })

        await waitFor(() => {
            getByText('Success!')
        })

        expect(container).toMatchSnapshot('success-on-sendPasswordReset')

        expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1)
        expect(sendPasswordResetEmail).toHaveBeenCalledWith(undefined, mockEmail)
    })

    it('should open a error message in case of the sendPasswordReset fail', async () => {
        const mockEmail = '__MOCK__EMAIL__'
        const mockError = '__MOCK__ERROR__'

        ;(sendPasswordResetEmail as jest.Mock).mockImplementation(() => {
            throw new Error(mockError)
        })
        const { getByText, getByPlaceholderText, container } = customRender(<ResetPassword />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: mockEmail },
            })
        })

        act(() => {
            fireEvent.click(getByText('Send'))
        })

        await waitFor(() => {
            getByText('Error')
        })

        expect(container).toMatchSnapshot('error-on-sendPasswordReset')
    })
})
