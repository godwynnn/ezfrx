"use client"
import React, { useEffect, useRef, useState,useLayoutEffect } from 'react'
// import { useRef } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { AuthencticationAction } from '@/reducer/reducer'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Urls } from '../urls'
import AuthComponent from '@/components/authcomponent'
import AuthValidator from '@/components/authValidator'
import { useSearchParams } from 'next/navigation'


const url = Urls()
function Auth() {
  const authData = useSelector(state => state.reducer.authreducer)
  const logged_in = authData.logged_in


  const dispatch = useDispatch()
  const router = useRouter()


  useLayoutEffect(() => {
    if (logged_in) {
      redirect('/dashboard')
    }

  }, [])


  return (
    <>



      <AuthComponent />

    </>


  )
}

export default Auth