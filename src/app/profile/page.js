"use client"
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Urls } from '../urls'
import Hero from '../hero'
import { useSelector } from "react-redux";
import { CldUploadWidget } from "next-cloudinary";




const url = Urls()
function Profile({ params }) {


    const [user, setUser] = useState({})


    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in

    const getUsers = () => {
        fetch(`${url.get_user}`, {
            method: 'GET',

            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            },

        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data.data)

            })
    }



    useEffect(() => {
        getUsers()
    }, [])
    console.log('users', user)

    return (



        <Hero>



            <div className='bg-[#0B1215] lg:p-20 md:p-20 sm:p-20 max-sm:p-0  min-h-[100vh] max-sm:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]'>

                <div className=" min-h-full lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%]">
                    <form className="hero-content max-sm:w-[100%] flex  items-center lg:flex-row md:flex-col sm:flex-col max-sm:flex-col max-sm:items-center max-sm:justify-center  lg:justify-between">
                        <img src='' className=" h-[90%] sm:w-[100%] max-sm:w-[100%] rounded-lg shadow-2xl" />


                        <div className='w-[50%] sm:w-[100%] max-sm:w-[100%] bg-base-200 p-20 max-sm:p-10 rounded-lg'>

                            <label className="input input-bordered flex items-center gap-2">
                                Firstname
                                <input type="text" className="grow" name='name' value={`${user.first_name}`} onChange={(e) => { handleSetDurationChange(e) }} />
                            </label>
                            <br />

                            <label className="input input-bordered flex items-center gap-2">
                                Lastname
                                <input type="text" className="grow" name='name' value={`${user.last_name}`} onChange={(e) => { handleSetDurationChange(e) }} />
                            </label>
                            <br />


                            <label className="input input-bordered flex items-center gap-2" name=''>
                                Email
                                <input type="email" className="grow" name='email' value={user.email} onChange={(e) => { handleSetDurationChange(e) }} />
                            </label>
                            <br />


                            <label className="input input-bordered flex items-center gap-2" name=''>
                                Phone
                                <input type="text" className="grow" name='phone_no' min={1} value='phone number' onChange={(e) => { handleSetDurationChange(e) }} />
                            </label>
                            <br />

                            <CldUploadWidget uploadPreset="ezfrx_lib" onSuccess={(results, options) => setvidInfo(results.info)} >
                                {({ open }) => {
                                    return (
                                        <button className=" bg-gray-500  text-white rounded-md p-3" onClick={() => open()}  >
                                            Upload Photo
                                        </button>

                                    );
                                }}
                            </CldUploadWidget>







                        </div>
                    </form>
                </div>
            </div>




        </Hero>





    )
}

export default Profile