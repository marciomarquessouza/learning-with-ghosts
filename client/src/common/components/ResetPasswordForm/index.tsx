import React from 'react'
import Spinner from '../Spinner'

export interface ResetPasswordFormProps {
    email: string
    loading: boolean
    onChangeEmail: (email: string) => void
    onClickRegister: () => void
    onSubmit: () => void
}

function ResetPasswordForm({
    email,
    loading,
    onChangeEmail,
    onClickRegister,
    onSubmit,
}: ResetPasswordFormProps) {
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const target = e.currentTarget.name
        const value = e.currentTarget.value

        switch (target) {
            case 'email':
                onChangeEmail(value)
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-3xl text-white mb-0 mx-4">Reset Passwoooord:</p>
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

            <div className="text-center lg:text-left">
                <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-primary-light text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary-dark hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    {loading ? <Spinner /> : 'Send'}
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

export default ResetPasswordForm
