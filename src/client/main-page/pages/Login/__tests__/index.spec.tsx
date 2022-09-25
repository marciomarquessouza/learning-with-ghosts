import React from 'react'
import { fireEvent, waitFor, act } from '@testing-library/react'

import { customRender, getMockedUser } from '../../../test-helpers'
import { MESSAGE_TIMEOUT } from '../../../const'
import * as authTwitter from '../../../auth/signInWithTwitter'
import * as authGoogle from '../../../auth/signInWithGoogle'
import * as authEmailPassword from '../../../auth/logInWithEmailAndPassword'

import Login from '..'

describe('pages >> Login', () => {
    afterEach(() => {
        jest.resetAllMocks()
    })

    jest.useFakeTimers()

    it('should render the Login page properly', () => {
        const { container } = customRender(<Login />)
        expect(container).toMatchSnapshot('Login-default')
    })

    it('should redirect to main page if exist a signed user', () => {
        const mockedUser = getMockedUser()
        const { history } = customRender(<Login />, {
            auth: {
                user: mockedUser,
            },
            navigation: {
                initialEntries: ['/login'],
            },
        })

        expect(history.location.pathname).toBe('/')
    })

    it('should navigate to /register path case the Forgot password link is pressed', async () => {
        const { getByText, history } = customRender(<Login />, {
            navigation: {
                initialEntries: ['/login'],
            },
        })

        expect(history.location.pathname).toBe('/login')

        await waitFor(() => {
            fireEvent.click(getByText('Forgot password?'))
        })

        expect(history.location.pathname).toBe('/reset')
    })

    it('should navigate to /register path case the Register link is pressed', async () => {
        const { getByText, history } = customRender(<Login />, {
            navigation: {
                initialEntries: ['/login'],
            },
        })

        expect(history.location.pathname).toBe('/login')

        await waitFor(() => {
            fireEvent.click(getByText('Register'))
        })

        expect(history.location.pathname).toBe('/register')
    })

    it('should show an error message if the submit button was pressed and the email was not filled in', async () => {
        const spyLogInWithEmailAndPassword = jest.spyOn(
            authEmailPassword,
            'logInWithEmailAndPassword'
        )
        const { getByText, container } = customRender(<Login />)

        fireEvent.click(getByText('Login'))

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-email')
        expect(spyLogInWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should show an error message if the submit button was pressed and the password was not filled in', async () => {
        const spyLogInWithEmailAndPassword = jest.spyOn(
            authEmailPassword,
            'logInWithEmailAndPassword'
        )
        const { getByText, getByPlaceholderText, container } = customRender(<Login />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-password')
        expect(spyLogInWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should close the error message when the close button is pressed', async () => {
        const spyLogInWithEmailAndPassword = jest.spyOn(
            authEmailPassword,
            'logInWithEmailAndPassword'
        )
        const { getByText, getByPlaceholderText, queryByText } = customRender(<Login />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(spyLogInWithEmailAndPassword).toHaveBeenCalledTimes(0)

        waitFor(() => {
            fireEvent.click(getByText('Close'))
        })

        expect(queryByText('All fields are required')).not.toBeInTheDocument()
    })

    it('should close the error message after the timeout', async () => {
        const spyLogInWithEmailAndPassword = jest.spyOn(
            authEmailPassword,
            'logInWithEmailAndPassword'
        )
        const { getByText, getByPlaceholderText, queryByText } = customRender(<Login />)

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        await waitFor(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(spyLogInWithEmailAndPassword).toHaveBeenCalledTimes(0)

        act(() => {
            jest.advanceTimersByTime(MESSAGE_TIMEOUT)
        })

        expect(queryByText('All fields are required')).not.toBeInTheDocument()
    })

    it('should call the logInWithEmailAndPassword function when the submit button is pressed', async () => {
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'

        const spyLogInWithEmailAndPassword = jest.spyOn(
            authEmailPassword,
            'logInWithEmailAndPassword'
        )
        const { getByText, getByPlaceholderText, container } = customRender(<Login />)

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
            fireEvent.click(getByText('Login'))
        })

        expect(spyLogInWithEmailAndPassword).toHaveBeenCalledTimes(1)
        expect(spyLogInWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword)
    })

    describe('Twitter SigIn method:', () => {
        it('should call the signInWithTwitter event if the twitter button was pressed', () => {
            const spySignInWithTwitter = jest
                .spyOn(authTwitter, 'signInWithTwitter')
                .mockResolvedValue()
            const { getByRole } = customRender(<Login />)

            fireEvent.click(getByRole('button', { name: /twitter/i }))

            expect(spySignInWithTwitter).toHaveBeenCalledTimes(1)
        })

        it('should show am error alert if the signInWithTwitter event thrown an error ', async () => {
            const mockError = '__MOCK__TWITTER__ERROR__'
            jest.spyOn(authTwitter, 'signInWithTwitter').mockRejectedValue(new Error(mockError))
            const { container, getByRole, getByText } = customRender(<Login />)
            fireEvent.click(getByRole('button', { name: /twitter/i }))

            await waitFor(() => {
                getByText(mockError)
            })

            expect(container).toMatchSnapshot('Twitter-error')
        })
    })

    describe('Google SigIn method:', () => {
        it('should call the signInWithGoogle event if the Google button was pressed', () => {
            const spySignInWithGoogle = jest
                .spyOn(authGoogle, 'signInWithGoogle')
                .mockResolvedValue()
            const { getByRole } = customRender(<Login />)

            fireEvent.click(getByRole('button', { name: /google/i }))

            expect(spySignInWithGoogle).toHaveBeenCalledTimes(1)
        })

        it('should show am error alert if the signInWithGoogle event thrown an error ', async () => {
            const mockError = '__MOCK__GOOGLE__ERROR__'
            jest.spyOn(authGoogle, 'signInWithGoogle').mockRejectedValue(new Error(mockError))
            const { container, getByRole, getByText } = customRender(<Login />)
            fireEvent.click(getByRole('button', { name: /google/i }))

            await waitFor(() => {
                getByText(mockError)
            })

            expect(container).toMatchSnapshot('Google-error')
        })
    })
})
