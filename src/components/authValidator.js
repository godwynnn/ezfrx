"use client"
import { redirect } from 'next/navigation'
import React, { useEffect, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

function AuthValidator(Component) {

    return function AuAuthValidator(props){
        const authData=useSelector(state=>state.reducer.authreducer)
        const logged_in=authData.logged_in
        console.log('authvalidator',authData)

        useLayoutEffect(()=>{
            if(!logged_in){
                redirect('/auth')
            }

        },[])

        if(!logged_in){
            return null
        }

        return <Component {...props}/>
    }

 
}

export default AuthValidator