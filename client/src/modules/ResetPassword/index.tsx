import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { sendPasswordReset } from 'auth'
import { useAlert, useAuth } from 'common/hooks'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'
import LoginLogoImg from 'images/login-logo.png'

import BackButton from 'common/components/BackButton'
import ResetPasswordForm from 'common/components/ResetPasswordForm'

function ResetPassword() {
    const [email, setEmail] = useState('')
    const { user, loading } = useAuth()
    const { openAlert } = useAlert()
    const router = useRouter()

    const handleChangeEmail = (email: string) => {
        setEmail(email)
    }

    const handleSubmit = async () => {
        try {
            if (!email) {
                throw new Error('Please enter your email first')
            }
            await sendPasswordReset(email)
            openAlert({
                title: 'Success!',
                message: `Check your email ${email} to reset your password`,
                type: ALERTS_TYPE_ENUM.SUCCESS,
            })
            router.push('/login')
        } catch (error: any) {
            openAlert({
                title: 'Error',
                message: error?.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
        }
    }

    const handleRegister = () => {
        router.push('/register')
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
        </div>
    )
}

export default ResetPassword
