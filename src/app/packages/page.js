"use client"
import React, { useEffect, useState } from 'react'
import { UseSelector, useSelector } from 'react-redux'
import Link from 'next/link'
import Hero from '../hero'
import { Urls } from '../urls'
import { Toaster, toast } from 'sonner'



const url = Urls()

function Packages() {


    const data = useSelector(state => state.reducer.chartreducer)
    const authData = useSelector(state => state.reducer.authreducer)
    const [loading, setLoading] = useState(true)
    const logged_in = authData.logged_in
    console.log(data)
    const [allPackages, setPackage] = useState([])





    useEffect(() => {
        setLoading(true)
        fetch(url.packages, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
               
                console.log('packages:', data)
                if (data.status === 'success') {
                    setPackage(data.data)
                    setLoading(false)
    
                }else{
                    setPackage(data.data)
                    setLoading(false)
                }
            }

            
            )



    }, [])

    console.log('packages:',allPackages)



    return (

        <>
            <Hero>


                <div className='bg-[#101720] min-h-[100vh] flex flex-col justify-center items-center'>
                    {loading ?

                        <span className="loading loading-bars text-white loading-lg"></span>

                        :


                        (allPackages.length === 0 ?
                           
                            <p className=' text-[35px] text-white font-semibold'>🤭oops no content yet</p>


                            :

                            <div className=' lg:p-10 md:p-20 sm:p-20 max-sm:p-5  grid gap-3 lg:grid-cols-4 min-h-[100%] md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1'>


                            {allPackages.map((val, idx) =>


                                <div className="card card-compact lg:w-[100%] lg:h-[100vh] md:h-[70vh] md:w-[90%] bg-base-100 shadow-xl" key={val.id} >
                                    <figure><img src={val.image_meta.secure_url} alt="Shoes" /></figure>

                                    <div className="card-body flex   items-center ">
                                        <h2 className="card-title text-[25px] p-0 text-center">{val.name}</h2>
                                        <p className='text-[14px] text-center'>
                                            {val.description}
                                        </p>


                                        <p><b>Daily plan:</b> #{val.daily_price}</p>
                                        <p><b>Weekly plan:</b> #{val.weekly_price}</p>
                                        <p><b>Monthly plan:</b> #{val.monthly_price}</p>

                                        <div className="card-actions justify-end">
                                            <Link href={`/packages/${val.id}`} >
                                                <button className="btn btn-primary">Buy Now</button>

                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            )}






                        </div>
                        )




                    }


                    {logged_in && authData.is_admin?
                        <Link href={`/packages/create`} >
                            <button className="btn bg-gray-500 outline-none border-none">Add package</button>

                        </Link>

                        :
                        ''
                    }




                </div>
            </Hero>
        </>
    )
}

export default Packages