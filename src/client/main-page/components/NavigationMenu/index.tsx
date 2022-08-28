import React from 'react'
import { Link } from 'react-router-dom'

function NavigationMenu() {
    return (
        <div className="flex flex-row items-center">
            <div className="mx-4">
                <a
                    href="https://github.com/marciomarquessouza/learning-with-ghosts"
                    target="_blank"
                >
                    <span className="font-josefin font-bold text-lg text-white">ABOUT</span>
                </a>
            </div>
            <div className="mx-4">
                <Link to="/login">
                    <button className="bg-primary hover:bg-primary-dark py-2 px-4 rounded">
                        <span className="font-josefin font-bold text-lg text-white">LOGIN</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default NavigationMenu
