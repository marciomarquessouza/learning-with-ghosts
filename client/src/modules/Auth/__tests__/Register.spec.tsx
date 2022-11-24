import React from 'react'
import { fireEvent, waitFor, act } from '@testing-library/react'

import { customRender, getMockedUser } from '../../../../test-helpers'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import Register from '../Register'

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
        const { router } = customRender(<Register />, {
            auth: {
                user: mockedUser,
            },
        })

        expect(router.push).toHaveBeenCalledWith('/')
    })

    it('should show an error message if the submit button was pressed and the email was not filled in', async () => {
        const { getByText, container } = customRender(<Register />)

        act(() => {
            fireEvent.click(getByText('Register'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-email')
        expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should show an error message if the submit button was pressed and the password was not filled in', async () => {
        const { getByText, getByPlaceholderText, container } = customRender(<Register />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        act(() => {
            fireEvent.click(getByText('Register'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-password')
        expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should show an error message if the submit button was pressed and the name was not filled in', async () => {
        const { getByText, getByPlaceholderText, container } = customRender(<Register />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        act(() => {
            fireEvent.change(getByPlaceholderText('Password'), {
                target: { value: '__MOCK__PASSWORD_' },
            })
        })

        act(() => {
            fireEvent.click(getByText('Register'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-name')
        expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should call the registerWithEmailAndPassword function when the submit button is pressed', async () => {
        const mockName = '__MOCK__NAME__'
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        ;(createUserWithEmailAndPassword as jest.Mock).mockImplementation(() =>
            Promise.resolve({ user: { uid: '__MOCK__' } })
        )

        const { getByText, getByPlaceholderText } = customRender(<Register />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Name'), {
                target: { value: mockName },
            })
        })

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: mockEmail },
            })
        })

        act(() => {
            fireEvent.change(getByPlaceholderText('Password'), {
                target: { value: mockPassword },
            })
        })

        act(() => {
            fireEvent.click(getByText('Register'))
        })

        expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1)
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            undefined,
            mockEmail,
            mockPassword
        )
    })
})
