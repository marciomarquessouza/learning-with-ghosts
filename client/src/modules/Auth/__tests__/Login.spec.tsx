import React from 'react'
import { fireEvent, waitFor, act } from '@testing-library/react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

import { customRender, getMockedUser } from '../../../../test-helpers'
import { MESSAGE_TIMEOUT } from '../../../const'

import Login from '../Login'

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
        const { router } = customRender(<Login />, {
            auth: {
                user: mockedUser,
            },
        })

        expect(router.push).toHaveBeenCalledWith('/')
    })

    it('should navigate to /register path case the Forgot password link is pressed', async () => {
        const { getByText, router } = customRender(<Login />)

        act(() => {
            fireEvent.click(getByText('Forgot password?'))
        })

        expect(router.push).toHaveBeenCalledWith('/reset')
    })

    it('should navigate to /register path case the Register link is pressed', async () => {
        const { getByText, router } = customRender(<Login />)

        act(() => {
            fireEvent.click(getByText('Register'))
        })

        expect(router.push).toHaveBeenCalledWith('/register')
    })

    it('should show an error message if the submit button was pressed and the email was not filled in', async () => {
        const { getByText, container } = customRender(<Login />)

        act(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-email')
        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should show an error message if the submit button was pressed and the password was not filled in', async () => {
        const { getByText, getByPlaceholderText, container } = customRender(<Login />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        act(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(container).toMatchSnapshot('Error-password')
        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)
    })

    it('should close the error message when the close button is pressed', async () => {
        const { getByText, getByPlaceholderText, queryByText } = customRender(<Login />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        act(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)

        act(() => {
            fireEvent.click(getByText('Close'))
        })

        expect(queryByText('All fields are required')).not.toBeInTheDocument()
    })

    it('should close the error message after the timeout', async () => {
        const { getByText, getByPlaceholderText, queryByText } = customRender(<Login />)

        act(() => {
            fireEvent.change(getByPlaceholderText('Email address'), {
                target: { value: '__MOCK__EMAIL_' },
            })
        })

        act(() => {
            fireEvent.click(getByText('Login'))
        })

        await waitFor(() => {
            getByText('All fields are required')
        })

        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0)

        act(() => {
            jest.advanceTimersByTime(MESSAGE_TIMEOUT)
        })

        expect(queryByText('All fields are required')).not.toBeInTheDocument()
    })

    it('should call the logInWithEmailAndPassword function when the submit button is pressed', async () => {
        const mockEmail = '__MOCK__EMAIL__'
        const mockPassword = '__MOCK__PASSWORD__'
        const { getByText, getByPlaceholderText } = customRender(<Login />)

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
            fireEvent.click(getByText('Login'))
        })

        expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, mockEmail, mockPassword)
    })

    describe('Twitter SigIn method:', () => {
        it('should call the signInWithTwitter event if the twitter button was pressed', async () => {
            const { getByRole } = customRender(<Login />)
            ;(signInWithPopup as jest.Mock).mockResolvedValue({ user: {} })

            act(() => {
                fireEvent.click(getByRole('button', { name: /twitter/i }))
            })

            await waitFor(() => {})

            expect(signInWithPopup).toHaveBeenCalledTimes(1)
        })

        it('should show am error alert if the signInWithTwitter event thrown an error ', async () => {
            const mockError = '__MOCK__TWITTER__ERROR__'
            ;(signInWithPopup as jest.Mock).mockRejectedValue(new Error(mockError))
            const { container, getByRole, getByText } = customRender(<Login />)
            act(() => {
                fireEvent.click(getByRole('button', { name: /twitter/i }))
            })

            await waitFor(() => {
                getByText('Error to sign in with a Twitter Account')
            })

            expect(container).toMatchSnapshot('Twitter-error')
        })
    })

    describe('Google SigIn method:', () => {
        it('should call the signInWithGoogle event if the Google button was pressed', () => {
            ;(signInWithPopup as jest.Mock).mockResolvedValue({ user: {} })
            const { getByRole } = customRender(<Login />)

            act(() => {
                fireEvent.click(getByRole('button', { name: /google/i }))
            })

            expect(signInWithPopup).toHaveBeenCalledTimes(1)
        })

        it('should show am error alert if the signInWithGoogle event thrown an error ', async () => {
            const mockError = '__MOCK__GOOGLE__ERROR__'
            ;(signInWithPopup as jest.Mock).mockRejectedValue(new Error(mockError))
            const { container, getByRole, getByText } = customRender(<Login />)
            act(() => {
                fireEvent.click(getByRole('button', { name: /google/i }))
            })

            await waitFor(() => {
                getByText('Error to sign in with a Google Account')
            })

            expect(container).toMatchSnapshot('Google-error')
        })
    })
})
