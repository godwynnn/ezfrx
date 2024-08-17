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

    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in

    const [itemData, setitemData] = useState({})
    const [vidInfo, setvidInfo] = useState('')
    const [packages, setPackages] = useState([])


    // console.log(url.create)


    // useLayoutEffect(()=>{
    //     if(!authData.is_admin){
    //         router.push('/dashboard')
    //     }

    // },[])
    useEffect(() => {

        


        fetch(url.packages, {
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                // console.log(data.data)
                setPackages(data.data)
            })


    })


    // console.log(packages)

    const sendData = (e) => {


        e.preventDefault()

        const data = { 'item_Data': itemData, 'video_info': vidInfo }
        console.log(data)
        fetch(url.create_video, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${authData.accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header

        }).then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.status==='success'){
                    toast.success(data.message)
                    router.push('/videos')
                }
            })


    }



    return (

        <>
        {authData.is_admin && authData.logged_in?
        <Hero>
        <div className='bg-[#101720]  lg:p-20  md:p-20 sm:p-20 max-sm:p-0.5 flex flex-col justify-center items-center min-h-[100vh] '>
        <Toaster position="top-right" expand={true} richColors/>
            <div className="hero h-[90vh] lg:w-[60%] md:w-[80%] sm:w-[100%] max-sm:w-[100%] bg-base-200 ">
                <form className="hero-content text-left p-10 flex flex-col w-[100%]" method="POST" onSubmit={sendData} >
                    <input type="text" placeholder="Title" className="input input-bordered w-[100%]" onChange={(e) => setitemData({ ...itemData, 'name': e.target.value })} />
                    <textarea className="textarea textarea-bordered  w-[100%]" placeholder="Description" onChange={(e) => setitemData({ ...itemData, 'description': e.target.value })}></textarea>
                    <CldUploadWidget uploadPreset="ezfrx_lib" onSuccess={(results, options) => setvidInfo(results.info)} >
                        {({ open }) => {
                            return (
                                <button className=" bg-gray-500  text-white rounded-md p-3" onClick={() => open()}  >
                                    Upload Video
                                </button>

                            );
                        }}
                    </CldUploadWidget>

                    <select className="select select-bordered w-full max-w-xs align-middle" name='graph' onChange={(e) => setitemData({ ...itemData, 'package': e.target.value })} >
                    <option disabled selected >Select Package</option>
                        {packages.map((val) => {
                            // console.log(val.name);
                           return <option   key={val.id}  value={val.id}>{val.name}</option>
                        })}


                    </select>

                    {/* <textarea className="textarea textarea-bordered  w-[100%]" placeholder="Price details"></textarea> */}

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