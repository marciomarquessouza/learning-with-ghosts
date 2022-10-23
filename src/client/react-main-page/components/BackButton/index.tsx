import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface BackButtonProps {
    label?: string
}

function BackButton({ label = 'Return' }: BackButtonProps) {
    const navigate = useNavigate()
    const handleOnPress = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <section className="px-4 pt-4">
            <a onClick={handleOnPress} href="#">
                <div className="flex flex-row items-center justify-items-center">
                    <svg
                        className="h-10 w-10"
                        viewBox="0 0 219.151 219.151"
                        stroke="white"
                        fill="white"
                    >
                        <g>
                            <path
                                d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
		C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
		c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"
                            />
                            <path
                                d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
		c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
		c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
		c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"
                            />
                        </g>
                    </svg>
                    <span className="text-white text-xl ml-2">{label}</span>
                </div>
            </a>
        </section>
    )
}

export default BackButton
