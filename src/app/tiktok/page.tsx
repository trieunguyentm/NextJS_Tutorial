'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const TiktokPage = () => {
    const router = useRouter()
    const handleClickHome = () => {
        router.push("/")
    }

    return (
        <div>
            <div>
                TiktokPage
            </div>
            <div>
                <button onClick={() => handleClickHome()}>
                    Go Home
                </button>
            </div>
        </div>
    )
}

export default TiktokPage