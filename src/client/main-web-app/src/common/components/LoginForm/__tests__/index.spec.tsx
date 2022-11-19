import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import LoginFrom from '..'

describe('components >> LoginForm', () => {
    const defaultMockedProps = {
        email: '__MOCK__EMAIL__',
        password: '__MOCK__PASSWORD__',
        loading: false,
        onChangeEmail: jest.fn(),
        onChangePassword: jest.fn(),
        onClickRegister: jest.fn(),
        onClickForgotPassword: jest.fn(),
        onClickTwitterLogin: jest.fn(),
        onClickGoogleLogin: jest.fn(),
        onSubmit: jest.fn(),
    }

    it('should render the LoginFrom properly', () => {
        const { container } = render(<LoginFrom {...defaultMockedProps} />)

        expect(container).toMatchSnapshot('LoginFrom-default')
    })

    it('should render the LoginFrom properly in loading state', () => {
        const mockProps = { ...defaultMockedProps, loading: true }
        const { container } = render(<LoginFrom {...mockProps} />)

        expect(container).toMatchSnapshot('LoginFrom-loading')
    })

    it('should fire the onSubmit event when the button submit is pressed', () => {
        const spyOnSubmit = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onSubmit: spyOnSubmit,
        }
        const { getByText } = render(<LoginFrom {...mockedProps} />)

        fireEvent.click(getByText('Login'))

        expect(spyOnSubmit).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClickGoogleLogin event when the google icon is pressed', () => {
        const spyOnClickGoogleLogin = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onClickGoogleLogin: spyOnClickGoogleLogin,
        }
        const { getByRole } = render(<LoginFrom {...mockedProps} />)

        fireEvent.click(getByRole('button', { name: /google/i }))

        expect(spyOnClickGoogleLogin).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClickTwitterLogin event when the twitter icon is pressed', () => {
        const spyOnClickTwitterLogin = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onClickTwitterLogin: spyOnClickTwitterLogin,
        }
        const { getByRole } = render(<LoginFrom {...mockedProps} />)
        fireEvent.click(getByRole('button', { name: /twitter/i }))

        expect(spyOnClickTwitterLogin).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClickForgotPassword event when the forgot password link is pressed', () => {
        const spyOnClickForgotPassword = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onClickForgotPassword: spyOnClickForgotPassword,
        }
        const { getByText } = render(<LoginFrom {...mockedProps} />)
        fireEvent.click(getByText('Forgot password?'))

        expect(spyOnClickForgotPassword).toHaveBeenCalledTimes(1)
    })

    it('should fire the onClickRegister event when the register link is pressed', () => {
        const spyOnClickRegister = jest.fn()
        const mockedProps = {
            ...defaultMockedProps,
            onClickRegister: spyOnClickRegister,
        }
        const { getByText } = render(<LoginFrom {...mockedProps} />)
        fireEvent.click(getByText('Register'))

        expect(spyOnClickRegister).toHaveBeenCalledTimes(1)
    })

    it('should fire the onChangeEmail event when the email is entered by the user', () => {
        const spyOnChangeEmail = jest.fn()
        const mockEmail = '__MOCK__EMAIL__'
        const mockedProps = {
            ...defaultMockedProps,
            email: '',
            onChangeEmail: spyOnChangeEmail,
        }
        const { getByPlaceholderText } = render(<LoginFrom {...mockedProps} />)
        fireEvent.change(getByPlaceholderText('Email address'), { target: { value: mockEmail } })

        expect(spyOnChangeEmail).toHaveBeenCalledTimes(1)
        expect(spyOnChangeEmail).toHaveBeenCalledWith(mockEmail)
    })

    it('should fire the onChangePassword event when the password is entered by the user', () => {
        const spyOnChangePassword = jest.fn()
        const mockPassword = '__MOCK__PASSWORD__'
        const mockedProps = {
            ...defaultMockedProps,
            password: '',
            onChangePassword: spyOnChangePassword,
        }
        const { getByPlaceholderText } = render(<LoginFrom {...mockedProps} />)
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: mockPassword } })

        expect(spyOnChangePassword).toHaveBeenCalledTimes(1)
        expect(spyOnChangePassword).toHaveBeenCalledWith(mockPassword)
    })
})
