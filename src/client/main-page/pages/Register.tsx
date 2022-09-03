import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { registerWithEmailAndPassword } from '../auth'
import { RegisterForm } from '../components'
import BackButton from '../components/BackButton'
import { ALERTS_TYPE_ENUM } from '../contexts/AlertContext'
import useAlert from '../hooks/useAlert'
import useAuth from '../hooks/useAuth'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    const { openAlert } = useAlert()

    const handleChangeEmail = (email: string) => {
        setEmail(email)
    }

    const handleChangePassword = (password: string) => {
        setPassword(password)
    }

    const handleChangeName = (name: string) => {
        setName(name)
    }

    const handleSubmit = () => {
        if (!name || !email || !password) {
            openAlert({
                title: 'Error',
                message: 'All fields are required',
                type: ALERTS_TYPE_ENUM.ERROR,
            })
            return
        }

        registerWithEmailAndPassword(name, email, password)
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <section className="h-screen bg-background font-josefin">
            <BackButton />
            <div className="px-6 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-4/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 flex items-center justify-center">
                        <img src="/img/login-logo.png" alt="Ghost Town" />
                    </div>
                    <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-8/12 mb-12 md:mb-0">
                        <RegisterForm
                            name={name}
                            email={email}
                            password={password}
                            loading={loading}
                            onChangeEmail={handleChangeEmail}
                            onChangePassword={handleChangePassword}
                            onChangeName={handleChangeName}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
