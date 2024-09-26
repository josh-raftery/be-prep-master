'use client'

import { UserContext } from '@components/client/userProvider'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@components/client/Loading'

export default function SignOut() {
    const router = useRouter()
    const {signOut, setUser} = useContext(UserContext)
    signOut()
    useEffect(() => {
        router.push('/')
    },[])
    return (
        <Loading/>
    )
}