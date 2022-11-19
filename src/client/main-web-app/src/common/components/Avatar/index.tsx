import React from 'react'
import Image from 'next/image'

import { getInitials } from '../../../utils'

interface AvatarProps {
    name: string
    photoUrl?: string | null
}

function Avatar({ name, photoUrl }: AvatarProps) {
    return (
        <div>
            {photoUrl ? (
                <Image
                    className="inline-block h-12 w-12 rounded-full"
                    referrerPolicy={'no-referrer'}
                    src={photoUrl}
                    alt="User Avatar"
                    width={200}
                    height={200}
                />
            ) : (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
                    <span className="text-lg font-medium leading-none text-white">
                        {getInitials(name)}
                    </span>
                </span>
            )}
        </div>
    )
}

export default Avatar
