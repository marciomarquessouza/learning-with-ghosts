import React from 'react'
import { Link } from 'react-router-dom'

export interface LogoHeaderProps {
    url?: string
    altText?: string
}

const DEFAULTS = {
    url: '/',
    altText: 'Ghost Town - Learning with Ghosts',
}

function LogoHeader({ url = DEFAULTS.url, altText = DEFAULTS.altText }: LogoHeaderProps) {
    return (
        <Link to={url}>
            <img src="/img/logo.png" alt={altText} />
        </Link>
    )
}

export default LogoHeader
