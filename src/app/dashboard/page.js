import React from 'react'
import Dashboard from './dashboard'
import { cookies } from 'next/headers'

// import { useEffect } from 'react'

function page() {
    // console.log('cookies',cookies().getAll())


    
  return (
    <Dashboard/>
  )
}

export default page