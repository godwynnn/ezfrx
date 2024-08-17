'use client'

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Hero from '@/app/hero'
import { useSearchParams, useRouter } from 'next/navigation'
import { Urls } from '@/app/urls'
import { Toaster, toast } from 'sonner'


const url = Urls()

function page() {
    const searchparams = useSearchParams()

    let token = searchparams.get('q')
    // console.log(token)
    const [Password, setPassword] = useState("")
    const router = useRouter()

    const ChangePassword = async (e) => {
        e.preventDefault()
        const res = await fetch(url.reset_token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/form-data',
            },
            body: JSON.stringify({ 'token': token, 'password': Password })
        })

        const data = await res.json()
        if (data.status === 'success') {
            toast.success(data.message)
            router.push('/auth')
        }else{
            toast.error('An error occured')
        }

        console.log(data)

    }
    useLayoutEffect(() => {
        const ResetPassword = async () => {

            const res = await fetch(`${url.reset_token}/${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/form-data',
                },
                // body: JSON.stringify({'email':userEmail})
            })

            const data = await res.json()
            if(data.status === 'success'){
                return
            }else{
                toast.error('Reset token expired')
                router.push('/auth')
            }

            console.log(data)

        }

        ResetPassword()

    }, [])
    return (


        <Hero>

            <Toaster position="top-right" expand={true} richColors />

            <div className='bg-[#0B1215] lg:p-20 md:p-20 sm:p-20 max-sm:p-0  min-h-[100vh] max-sm:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]'>

                <div className=" min-h-full lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%]">
                    <form onSubmit={ChangePassword} className="hero-content max-sm:w-[100%] flex  items-center lg:flex-row md:flex-col sm:flex-col max-sm:flex-col max-sm:items-center max-sm:justify-center  lg:justify-center">


                        <div className='lg:w-[50%] sm:w-[100%] max-sm:w-[100%] bg-base-200 p-20 max-sm:p-10 rounded-lg flex flex-col justify-center items-center'>

                            <label className="input input-bordered flex items-center gap-2 w-[100%]">
                                Password
                                <input type="text" className="grow w-[100%]" value={Password} onChange={e => setPassword(e.target.value)} />
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