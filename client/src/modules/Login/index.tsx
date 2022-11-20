import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { LoginForm } from '../../common/components'
import { logInWithEmailAndPassword, signInWithGoogle, signInWithTwitter } from '../../auth'
import { useAlert, useAuth } from '../../common/hooks'
import { ALERTS_TYPE_ENUM } from '../../common/contexts/AlertContext'
import LoginLogoImg from '../../../public/img/login-logo.png'

import BackButton from '../../common/components/BackButton'

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, loading } = useAuth()
    const { openAlert } = useAlert()

    const handleChangeEmail = (email: string) => {
        setEmail(email)
    }

    const handleChangePassword = (password: string) => {
        setPassword(password)
    }

    const handleSubmit = () => {
        if (!email || !password) {
            openAlert({
                title: 'Error',
                message: 'All fields are required',
                type: ALERTS_TYPE_ENUM.ERROR,
            })
            return
        }
        logInWithEmailAndPassword(email, password)
    }

    const handleRegister = () => {
        router.push('/register')
    }

    const handleReset = () => {
        router.push('/reset')
    }

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
        } catch (error: any) {
            openAlert({
                title: 'Error',
                message: error?.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
        }
    }

    const handleTwitterLogin = async () => {
        try {
            await signInWithTwitter()
        } catch (error: any) {
            openAlert({
                title: 'Error',
                message: error?.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/')
        }
    }, [user, router])

    return (
        <div className="relative overflow-hidden bg-background lg:flex lg:justify-center">
            <section className="h-screen font-josefin lg:w-4/5 lg:max-w-screen-2xl">
                <div className="px-6 py-8 md:py-0 h-full">
                    <header className="mt-4 ml-4">
                        <BackButton />
                    </header>
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="hidden grow-0 shrink-1 md:shrink-0 basis-auto xl:w-4/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 md:flex items-center justify-center">
                            <Image src={LoginLogoImg} alt="Ghost Logo" />
                        </div>
                        <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-8/12 mb-12 md:mb-0">
                            <LoginForm
                                email={email}
                                password={password}
                                loading={loading}
                                onChangeEmail={handleChangeEmail}
                                onChangePassword={handleChangePassword}
                                onClickRegister={handleRegister}
                                onClickForgotPassword={handleReset}
                                onClickTwitterLogin={handleTwitterLogin}
                                onClickGoogleLogin={handleGoogleLogin}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
