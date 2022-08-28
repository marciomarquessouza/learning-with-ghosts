import React from 'react'
import { Hero, LogoHeader, NavigationMenu } from '../components'

const BACKGROUND_IMAGE = "url('img/background_main_page.png')"

function Home() {
    return (
        <main
            className="bg-background h-screen bg-cover bg-no-repeat bg-center p-2 md:p-4"
            style={{
                backgroundImage: BACKGROUND_IMAGE,
            }}
        >
            <section className="flex flex-row justify-between items-center mx-1 md:mx-4">
                <header>
                    <LogoHeader />
                </header>
                <nav>
                    <NavigationMenu />
                </nav>
            </section>
            <section className="flex h-full flex-row justify-start items-center md:ml-4">
                <Hero />
            </section>
        </main>
    )
}

export default Home
