import React from 'react'
import Spinner from '../Spinner'

export interface RegisterFormProps {
    email: string
    password: string
    name: string
    loading: boolean
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onChangeName: (name: string) => void
    onSubmit: () => void
}

function RegisterForm({
    email,
    password,
    name,
    loading,
    onChangeEmail,
    onChangePassword,
    onChangeName,
    onSubmit,
}: RegisterFormProps) {
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
            case 'name':
                onChangeName(value)
                break
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-3xl text-white mb-0 mr-4">Registratioooon:</p>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleOnChange}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Name"
                />
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

            <div className="text-center lg:text-left">
                <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-primary-light text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-primary-dark hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    {loading ? <Spinner /> : 'Register'}
                </button>
            </div>
        </form>
    )
}

export default RegisterForm
