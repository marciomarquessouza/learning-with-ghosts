import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'

import { customRender, getMockedUser } from '../../../test-helpers'
import * as reset from '../../../auth/sendPasswordReset'

import ResetPassword from '..'

describe('pages >> ResetPassword', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the ResetPassword page properly', () => {
        const { container } = customRender(<ResetPassword />)
        expect(container).toMatchSnapshot('ResetPassword-default')
    })

    it('should redirect to main page if exist a signed user', () => {
        const mockedUser = getMockedUser()
        const { history } = customRender(<ResetPassword />, {
            auth: {
                user: mockedUser,
            },
            navigation: {
                initialEntries: ['/reset'],
            },
        })

        expect(history.location.pathname).toBe('/')
    })

    it('should navigate to /register path case the Register link is pressed', async () => {
        const { getByText, history } = customRender(<ResetPassword />, {
            navigation: {
                initialEntries: ['/reset'],
            },
        })

        expect(history.location.pathname).toBe('/reset')

        await waitFor(() => {
            fireEvent.click(getByText('Register'))
        })

        expect(history.location.pathname).toBe('/register')
    })

    it('should show an error message if the Send button was pressed and the email was not filled in', async () => {
        const spySendPasswordReset = jest.spyOn(reset, 'sendPasswordReset')
        const { getByText, container } = customRender(<ResetPassword />)

        fireEvent.click(getByText('Send'))

        await waitFor(() => {
            getByText('Please, fill in the "Email" field')
        })

        expect(container).toMatchSnapshot('Error-email')
        expect(spySendPasswordReset).toHaveBeenCalledTimes(0)
    })

    it('should call the sendPasswordReset function when the "Send" button is pressed', async () => {
        const mockEmail = '__MOCK__EMAIL__'

        const spySendPasswordReset = jest.spyOn(reset, 'sendPasswordReset')
        const { getByText, getByPlaceholderText } = customRender(<ResetPassword />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: mockEmail },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Send'))
        })

        expect(spySendPasswordReset).toHaveBeenCalledTimes(1)
        expect(spySendPasswordReset).toHaveBeenCalledWith(mockEmail)
    })

    it('should open a error message in case of the sendPasswordReset fail', async () => {
        const mockEmail = '__MOCK__EMAIL__'
        const mockError = '__MOCK__ERROR__'

        jest.spyOn(reset, 'sendPasswordReset').mockRejectedValue(new Error(mockError))
        const { getByText, getByPlaceholderText, container } = customRender(<ResetPassword />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: mockEmail },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Send'))
        })

        await waitFor(() => {
            getByText(mockError)
        })

        expect(container).toMatchSnapshot('error-on-sendPasswordReset')
    })
})
