'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const FacebookPage = () => {
    const router = useRouter()
    const handleClickHome = () => {
        router.push("/")
    }

    return (
        <div>
            <div>
                FacebookPage
            </div>
            <div>
                <button onClick={() => handleClickHome()}>
                    Go Home
                </button>
            </div>
        </div>
    )
}

export default FacebookPage