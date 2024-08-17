'use client'
import React, { useState, useEffect } from 'react'
import Hero from '@/app/hero'
import { Urls } from '@/app/urls'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'


import { Toaster, toast } from 'sonner'

const url = Urls()
function page() {

    const router=useRouter()


    const [userEmail, setUserEmail] = useState('')

    const sendEmail = async (e) => {
        e.preventDefault()
        const res = await fetch(url.forgot_password, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/form-data',
            },
            body: JSON.stringify({ 'email': userEmail })
        })

        const data = await res.json()
        if (data.status === 'success') {
            toast.success(data.status)
            router.push(data.link)

        } else {

            toast.error('An error occured please try again ')

        }

        console.log(data)

    }

    return (
        <Hero>

            <Toaster position="top-right" expand={true} richColors />

            <div className='bg-[#0B1215] lg:p-20 md:p-20 sm:p-20 max-sm:p-0  min-h-[100vh] max-sm:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]'>

                <div className=" min-h-full lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%]">
                    <form onSubmit={(e) => sendEmail(e)} className="hero-content max-sm:w-[100%] flex  items-center lg:flex-row md:flex-col sm:flex-col max-sm:flex-col max-sm:items-center max-sm:justify-center  lg:justify-center">


                        <div className='lg:w-[50%] sm:w-[100%] max-sm:w-[100%] bg-base-200 p-20 max-sm:p-10 rounded-lg flex flex-col justify-center items-center'>

                            <label className="input input-bordered flex items-center gap-2 w-[100%]">
                                Email
                                <input type="email" className="grow w-[100%]" onChange={(e) => setUserEmail(e.target.value)} />
                            </label>
                            <br />

                            <button class="btn btn-neutral mt-5" type='submit'>Submit</button>



                        </div>
                    </form>
                </div>
            </div>


            <Toaster />

        </Hero>
    )
}

export default page