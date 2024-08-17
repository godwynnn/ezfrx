"use client"
import React from 'react'
import Navbar from '@/components/navbar'

function Hero({children}) {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default Hero