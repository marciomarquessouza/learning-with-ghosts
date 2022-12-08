import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import {
    logInWithEmailAndPassword,
    signInWithGoogle,
    signInWithTwitter,
} from 'modules/Auth/services'
import { useAlert } from 'common/hooks/useAlert'
import { useUser } from 'modules/Auth/hooks/useUser'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'
import { PAGES_ROUTERS } from 'const'

import BackButton from 'common/components/BackButton'
import SideHero from 'common/components/SideHero'
import LoginForm from 'common/components/LoginForm'

function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useUser()
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
        setLoading(true)
        logInWithEmailAndPassword(email, password).catch((error) => {
            openAlert({
                title: 'Error',
                message: error.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
            setLoading(false)
        })
    }

    const handleRegister = () => {
        router.push(PAGES_ROUTERS.REGISTER)
    }

    const handleReset = () => {
        router.push(PAGES_ROUTERS.RESET)
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
            setLoading(false)
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
                        <SideHero />
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
