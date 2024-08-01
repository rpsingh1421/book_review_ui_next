"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthLayout = ({children}) => {
    const router = useRouter();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (!token && router.pathname !== '/login') {
            router.push('/login')
        }
    },[])
  return (
    <>
      {children}
    </>
  )
}

export default AuthLayout
