'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const YoutubePage = () => {
    const router = useRouter()
    const handleClickHome = () => {
        router.push("/")
    }

    return (
        <div>
            <div>
                YoutubePage
            </div>
            <div>
                <button onClick={() => handleClickHome()}>
                    Go Home
                </button>
            </div>
        </div>
    )
}

export default YoutubePage