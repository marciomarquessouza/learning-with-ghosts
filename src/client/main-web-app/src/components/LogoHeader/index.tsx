import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import LogoImg from '../../../public/img/logo.png'

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
        <Link href={url}>
            <Image src={LogoImg} alt={altText} width={150} height={170} />
        </Link>
    )
}

export default LogoHeader
