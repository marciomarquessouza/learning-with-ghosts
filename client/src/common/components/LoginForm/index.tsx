import React from 'react'

import SocialMediaLogin from '../SocialMediaLogin'
import Spinner from '../Spinner'

export interface LoginFormProps {
    email: string
    password: string
    loading: boolean
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onClickRegister: () => void
    onClickForgotPassword: () => void
    onClickTwitterLogin: () => void
    onClickGoogleLogin: () => void
    onSubmit: () => void
}

function LoginForm({
    email,
    password,
    loading,
    onChangeEmail,
    onChangePassword,
    onClickRegister,
    onClickForgotPassword,
    onClickTwitterLogin,
    onClickGoogleLogin,
    onSubmit,
}: LoginFormProps) {
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const target = e.currentTarget.name
        const value = e.currentTarget.value

        switch (target) {
            case 'email':
                onChangeEmail(value)
                break
            case 'password':
                onChangePassword(value)
                break
        }
    }

    const handleSocialMediaClick = (target: string) => {
        switch (target) {
            case 'twitter':
                onClickTwitterLogin()
                break
            case 'google':
                onClickGoogleLogin()
                break
        }
    }

    const handleRegister = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onClickRegister()
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
    }

    const handleForgotPassword = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        onClickForgotPassword()
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-3xl text-white mb-2 mr-4">Looogin</p>
            <SocialMediaLogin onClick={handleSocialMediaClick} />
            <div className="flex items-center justify-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-white text-center font-semibold mx-4 mb-0">Or</p>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                />
            </div>

            <div className="mb-6">
                <input
                    type="password"
                    name="password"
                    onChange={handleOnChange}
                    value={password}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                />
            </div>

            <div className="flex items-center justify-center md:justify-start mb-6">
                <a onClick={handleForgotPassword} className="text-white" href="#">
                    Forgot password?
                </a>
            </div>

            <div className="text-center lg:text-left">
                <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-primary-light text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary-dark hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    {loading ? <Spinner size="sm" /> : 'Login'}
                </button>
                <p className="text-lg text-white font-semibold mt-4 pt-1 mb-0">
                    {`Don't have an account? `}
                    <a
                        onClick={handleRegister}
                        href="#"
                        className="text-primary-light hover:text-primary-dark focus:text-primary transition duration-200 ease-in-out"
                    >
                        {` Register Here =)`}
                    </a>
                </p>
            </div>
        </form>
    )
}

export default LoginForm
