'use client'

import { UserContext } from '@components/client/userProvider'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@components/client/Loading'

export default function SignOut() {
    const router = useRouter()
    const {signOut, setUser} = useContext(UserContext)
    setUser({})
    router.push('/')
    return (
        <Loading/>
    )
}