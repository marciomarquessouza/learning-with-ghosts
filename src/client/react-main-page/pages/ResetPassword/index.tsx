import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { sendPasswordReset } from '../../auth'
import { useAlert, useAuth } from '../../hooks'
import { ALERTS_TYPE_ENUM } from '../../contexts/AlertContext'

import BackButton from '../../components/BackButton'
import ResetPasswordForm from '../../components/ResetPasswordForm'

function ResetPassword() {
    const [email, setEmail] = useState('')
    const { user, loading } = useAuth()
    const { openAlert } = useAlert()
    const navigate = useNavigate()

    const handleChangeEmail = (email: string) => {
        setEmail(email)
    }

    const handleSubmit = async () => {
        try {
            if (!email) {
                throw new Error('Please, fill in the "Email" field')
            }
            await sendPasswordReset(email)
            openAlert({
                title: 'Success!',
                message: `Check your email ${email} to reset your password`,
                type: ALERTS_TYPE_ENUM.SUCCESS,
            })
            navigate('/login')
        } catch (error: any) {
            openAlert({
                title: 'Error',
                message: error?.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
        }
    }

    const handleRegister = () => {
        navigate('/register')
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
                    <div className="hidden grow-0 shrink-1 md:shrink-0 basis-auto xl:w-4/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 md:flex items-center justify-center">
                        <img src="/img/login-logo.png" alt="Ghost Town" />
                    </div>
                    <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-8/12 mb-12 md:mb-0">
                        <ResetPasswordForm
                            email={email}
                            loading={loading}
                            onChangeEmail={handleChangeEmail}
                            onClickRegister={handleRegister}
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword
