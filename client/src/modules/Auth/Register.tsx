import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { registerWithEmailAndPassword, signInWithGoogle, signInWithTwitter } from './services'
import { RegisterForm } from 'common/components'
import { useAlert } from 'common/hooks/useAlert'
import { useUser } from './hooks/useUser'
import { PAGES_ROUTERS } from 'const'
import { ALERTS_TYPE_ENUM } from 'common/contexts/AlertContext'

import BackButton from 'common/components/BackButton'
import SideHero from 'common/components/SideHero'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const { user } = useUser()
    const router = useRouter()
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
        setLoading(true)
        registerWithEmailAndPassword(name, email, password).catch((error) => {
            openAlert({
                title: 'Error',
                message: error.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
            setLoading(false)
        })
    }

    const handleGoogleLogin = async () => {
        try {
            setLoading(true)
            await signInWithGoogle()
        } catch (error: any) {
            openAlert({
                title: 'Error',
                message: error?.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
            setLoading(false)
        }
    }

    const handleTwitterLogin = async () => {
        try {
            setLoading(true)
            await signInWithTwitter()
        } catch (error: any) {
            openAlert({
                title: 'Error',
                message: error?.message,
                type: ALERTS_TYPE_ENUM.ERROR,
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            router.push(`${PAGES_ROUTERS.GHOST_TOWN}/${user.chapter}`)
        }
    }, [user, router])

    return (
        <div className="relative overflow-hidden bg-background lg:flex lg:justify-center">
            <section className="h-screen font-josefin lg:w-4/5 lg:max-w-screen-2xl">
                <div className="px-6 py-8 md:py-0 h-full">
                    <header className="mt-4 ml-4">
                        <BackButton path="/" />
                    </header>
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <SideHero />
                        <div className="xl:ml-20 xl:w-4/12 lg:w-4/12 md:w-8/12 mb-12 md:mb-0">
                            <RegisterForm
                                name={name}
                                email={email}
                                password={password}
                                loading={loading}
                                onChangeEmail={handleChangeEmail}
                                onChangePassword={handleChangePassword}
                                onChangeName={handleChangeName}
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

export default Register
