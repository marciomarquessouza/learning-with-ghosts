import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react'

import { customRender, getMockedUser } from '../../../test-helpers'
import * as register from '../../../auth/registerWithEmailAndPassword'

import Register from '..'

describe('pages >> Register', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the Register page properly', () => {
        const { container } = customRender(<Register />)
        expect(container).toMatchSnapshot('Register-default')
    })

    it('should redirect to main page if exist a signed user', () => {
        const mockedUser = getMockedUser()
        const { history } = customRender(<Register />, {
            auth: {
                user: mockedUser,
            },
            navigation: {
                initialEntries: ['/register'],
            },
        })

        expect(history.location.pathname).toBe('/')
    })

    it('should show an error message if the submit button was pressed and the email was not filled in', async () => {
        const spyRegisterWithEmailAndPassword = jest.spyOn(register, 'registerWithEmailAndPassword')
        const { getByText, container } = customRender(<Register />)

        fireEvent.click(getByText('Register'))

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-email')
        expect(spyRegisterWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should show an error message if the submit button was pressed and the password was not filled in', async () => {
        const spyRegisterWithEmailAndPassword = jest.spyOn(register, 'registerWithEmailAndPassword')
        const { getByText, getByPlaceholderText, container } = customRender(<Register />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Register'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-password')
        expect(spyRegisterWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should show an error message if the submit button was pressed and the name was not filled in', async () => {
        const spyRegisterWithEmailAndPassword = jest.spyOn(register, 'registerWithEmailAndPassword')
        const { getByText, getByPlaceholderText, container } = customRender(<Register />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Password'), {
                target: { value: '__MOCK__PASSWORD_' },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Register'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-name')
        expect(spyRegisterWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should call the registerWithEmailAndPassword function when the submit button is pressed', async () => {
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'

        const spyRegisterWithEmailAndPassword = jest.spyOn(register, 'registerWithEmailAndPassword')
        const { getByText, getByPlaceholderText } = customRender(<Register />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Name'), {
                target: { value: mockName },
            })
        })

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: mockEmail },
            })
        })

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Password'), {
                target: { value: mockPassword },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Register'))
        })

        expect(spyRegisterWithEmailAndPassword).toHaveBeenCalledTimes(1)
        expect(spyRegisterWithEmailAndPassword).toHaveBeenCalledWith(
            mockName,
            mockEmail,
            mockPassword
        )
    })
})
