import React from 'react'

function Hero() {
    return (
        <article className="font-josefin text-white">
            <section className="text-6xl font-bold w-4/6 mb-2">
                <p>How about learning something new</p>
                <p className="text-primary-light">while you are playing?</p>
            </section>
            <section className="mb-6">
                <p className="text-lg">
                    <span className="font-bold">Ghost Town </span>
                    <span className="font-light">
                        is a new way to gamify education using the full power of WebGL
                    </span>
                </p>
            </section>
            <section className="my-10">
                <a href="/ghost-town">
                    <button className="bg-transparent hover:bg-primary-light text-white font-semibold hover:text-white py-4 px-14 border-4 border-primary-light hover:border-transparent rounded-full">
                        <p className="text-3xl">Let's Start</p>
                    </button>
                </a>
            </section>
        </article>
    )
}

export default Hero
