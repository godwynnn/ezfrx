"use client"
import React, { useState, useEffect, useLayoutEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Urls } from "@/app/urls";
import Hero from "@/app/hero";
import { useRouter, redirect } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Toaster, toast } from 'sonner'

const url = Urls()

function Create() {
    const router = useRouter()

    const [imgData, setImgData] = useState({})
    const [imgInfo, setImgInfo] = useState()

    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in
    console.log(url.create)


    // useLayoutEffect(()=>{
    //     if(!authData.is_admin){
    //         router.push('/dashboard')
    //     }

    // },[])

    const sendData = (e) => {
        e.preventDefault()
        // setImgData(imgData,{'img_info':imgInfo})

        const obj_data = { 'imgData': imgData, 'img_info': imgInfo, 'edit':false }
        console.log(obj_data)
        fetch(url.create, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authData.accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj_data), // body data type must match "Content-Type" header

        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    router.push('/packages')
                    toast.success(data.message)

                }
            }

            )

    }




    return (

        <>
            {authData.logged_in ?
                <Hero>
                    <div className='bg-[#101720]  lg:p-20  md:p-20 sm:p-20 max-sm:p-0.5 flex flex-col justify-center items-center min-h-[100vh] '>
                    <Toaster position="top-right" expand={true} richColors/>
                        <div className="hero h-[90vh] lg:w-[60%] md:w-[80%] sm:w-[100%] max-sm:w-[100%] bg-base-200  rounded-lg">
                            <form className="hero-content text-left p-10 flex flex-col w-[100%]" onSubmit={sendData} method="POST"  >



                                <input type="text" placeholder="Title" className="input input-bordered w-[100%]" name="title" onChange={(e) => setImgData({ ...imgData, 'name': e.target.value })} value={imgData.title} />
                                <textarea className="textarea textarea-bordered  w-[100%]" placeholder="Description" name="description" onChange={(e) => setImgData({ ...imgData, 'description': e.target.value })} value={imgData.description}></textarea>

                                <CldUploadWidget uploadPreset="ezfrx_lib" onSuccess={(results, options) => setImgInfo(results.info)} >
                                    {({ open }) => {
                                        return (
                                            <input className=" bg-gray-500  text-white rounded-md p-3" onClick={() => open()} type="button" value='upload image' />


                                        );
                                    }}
                                </CldUploadWidget>

                                {/* <textarea className="textarea textarea-bordered  w-[100%]" placeholder="Price details"></textarea> */}
                                <input type="text" placeholder="Daily Plan" name="daily" className="input input-bordered w-[100%]" onChange={(e) => setImgData({ ...imgData, 'daily_price': e.target.value })} value={imgData.daily} />
                                <input type="text" placeholder="Weekly Plan" name="weekly" className="input input-bordered w-[100%]" onChange={(e) => setImgData({ ...imgData, 'weekly_price': e.target.value })} value={imgData.weekly} />
                                <input type="text" placeholder="Monthly Plan" name="monthly" className="input input-bordered w-[100%]" onChange={(e) => setImgData({ ...imgData, 'monthly_price': e.target.value })} value={imgData.monthly} />

                                <button className="btn btn-md bg-gray-500  text-white rounded-md" type="submit">Submit</button>

                            </form>
                        </div>
                    <Toaster/>
                    </div>
                </Hero>

                :

                router.push('/dashboard')
            }


        </>

    )
}

export default Create