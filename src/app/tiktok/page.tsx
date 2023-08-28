'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap'

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
                <Button variant='primary' onClick={handleClickHome}>Go Home</Button>
            </div>
        </div>
    )
}

export default TiktokPage