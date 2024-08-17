"use client"
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { redirect } from 'next/navigation';
import { PaystackConsumer } from 'react-paystack'
import Hero from '@/app/hero';
import { CldUploadWidget } from "next-cloudinary";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Urls } from '@/app/urls';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation';
import { Toaster, toast } from 'sonner'




const url = Urls()
function Packages({ params }) {
    const router = useRouter()
    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in
    const pathname = usePathname()


    const [interval, setDurationInterval] = useState('DAILY')
    const [duration, setDuration] = useState(1)
    const [imgData, setImgData] = useState({})
    const [imgInfo, setImgInfo] = useState({})
    const [loading, setLoading]=useState(true)

    const [paystackKey, setPaystackKey] = useState({})
    const upload_btn_ref = useRef()
    const modal_3_ref = useRef()


    console.log('ROUTER', paystackKey)

    const handleSetDurationChange = (e) => {
        if (e.target.value < 0 || e.target.value % 1 !== 0) {
            setDuration(1)
        } else {
            changePriceByduration(e.target.value)
        }

    }
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: 100 * imgData.daily_price, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        // publicKey: paystackKey.pk,
        publicKey:'pk_test_0a42290d278ce8ae73a6d894989c87fa3889f21a'
    };

    // you can call this function anything
    const handleSuccess = (reference) => {
        console.log(reference);

        fetch(url.payment, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${authData.accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ ...reference, 'service_id': params.id, 'duration': duration, 'interval': interval }), // body data type must match "Content-Type" header

        }).then((res)=>res-json())
        .then(data=>console.log(data))
    };

    // you can call this function anything
    const handleClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }




    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess: (reference) => handleSuccess(reference),
        onClose: handleClose
    };



    // const sendData = () => {
    //     console.log(imgData)
    // }

    const changePriceByInterval = (val) => {
        setDurationInterval(val)
        fetch(`${url.change_price}?service_id=${params.id}&duration=${duration}&interval=${val}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${authData.accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res) => res.json())
            .then(data => {
                console.log(data);
                setImgData({ ...imgData, 'daily_price': data.data })


            })

    }

    const deletePackage=(id)=>{
        fetch(`${url.delete_package}/${id}`,{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${authData.accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            toast.success(data.message)
            router.push('/packages')
        })
    

    }


    const changePriceByduration = (val) => {
        setDuration(val)
        fetch(`${url.change_price}?service_id=${params.id}&duration=${val}&interval=${interval}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${authData.accessToken}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((res) => res.json())
            .then(data => {
                console.log(data);
                setImgData({ ...imgData, 'daily_price': data.data })

            })

    }


    useLayoutEffect(() => {
        if (!logged_in) {
            redirect('/auth')
        }

    }, [])

    const getData=()=>{
        setLoading(true)
        fetch(`${url.packages}/${params.id}`, {
            method: "GET",
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log(data)
                    setImgData(data.data)
                    setImgInfo(data.data.image_meta)
                    setPaystackKey({ 'pk': data.pkey, 'sk': data.skey })
                    setLoading(false)
                } else {
                    console.log('package not found')
                }
            })
    }


    useEffect(() => {

        getData()

    }, [])




    // upload_btn_ref.current.addEventListener('click', (e) => {
    //     // document.getElementById('my_modal_3').style.visibility='hidden'
    //     // document.getElementById('my_modal_3').style.display='none'
    //     document.getElementById('my_modal_3').removeAttribute('open')

    //     // document.getElementById('my_modal_3').style.opacity='0'
    // })

    return (

        <>
            {logged_in ?

                <Hero>



                    <div className='bg-[#0B1215] lg:p-20 md:p-20 sm:p-20 max-sm:p-0  min-h-[100vh] max-sm:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%]'>
                    <Toaster position="top-right" expand={true} richColors/>
                        <div className="min-h-full lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%]">
                            <form className="hero-content max-sm:w-[100%] flex  items-center lg:flex-row md:flex-col sm:flex-col max-sm:flex-col max-sm:items-center max-sm:justify-center  lg:justify-between">
                                <img src={imgInfo.url } className=" h-[90%] sm:w-[100%] max-sm:w-[100%] rounded-lg shadow-2xl" />


                                <div className='w-[50%] sm:w-[100%] max-sm:w-[100%] bg-base-200 p-20 max-sm:p-10 rounded-lg'>
                                    {loading?<Skeleton/>:<h1 className="lg:text-5xl md:text-[30px] sm:text-[30px] max-sm:text-[25px] font-bold">{imgData.name }</h1>}
                                    <p className="py-6">{loading?<Skeleton />:imgData.description}</p>
                                    <h2 className='font-bold'>N {loading?<Skeleton />:imgData.daily_price}</h2>

                                    <br />

                                    <label className="input input-bordered flex items-center gap-2" name='duration'>
                                        Duration
                                        <input type="number" className="grow" placeholder="Duration" name='duration' min={1} value={duration} onChange={(e) => { handleSetDurationChange(e) }} />
                                    </label>
                                    <br />


                                    <select className="select select-bordered w-full max-w-xs" name='interval' value={interval} onChange={(e) => changePriceByInterval(e.target.value)}>
                                        <option disabled selected>Interval?</option>
                                        <option value={'DAILY'}>daily</option>
                                        <option value={'WEEKLY'}>weekly</option>
                                        <option value={'MONTHLY'}>monthly</option>
                                    </select>
                                    <br />


                                    <PaystackConsumer {...componentProps}>

                                        {({ initializePayment }) => <button className="btn btn-primary mt-5" type='submit' onClick={(e) => { e.preventDefault(); initializePayment(handleSuccess, handleClose) }}>Proceed</button>}

                                    </PaystackConsumer>
                                    {authData.is_admin?
                                    <>
                                    <Link href={`/packages/${params.id}/edit`} >
                                        <button className="btn bg-gray-500 text-white" type='button' >Edit</button>
                                    </Link>

                                    

                                    <button className="btn bg-red-500 text-white" type='button' onClick={()=>deletePackage(params.id)} >Delete</button>


                                    
                                    </>
                                        
                                    
                                    :
                                    ''
                                }

                                    

                                    {/* <button className="btn bg-gray-500 text-white" type='button' onClick={() => document.getElementById('my_modal_3').showModal()}>Edit</button> */}



                                </div>
                            </form>
                        </div>
                        <Toaster/>
                    </div>




                    {/* 
<dialog id="my_modal_3" className="modal " ref={modal_3_ref} >
<div className="modal-box">
    <form method='post' className='justify-center items-center grid  grid-cols-1 gap-5 p-2' onSubmit={sendData} >




        <input type="text" placeholder="Title" className="input input-bordered w-[100%]" name="title" onChange={(e) => setImgData({ ...imgData, 'name': e.target.value })} value={imgData.title} />
        <textarea className="textarea textarea-bordered  w-[100%]" placeholder="Description" name="description" onChange={(e) => setImgData({ ...imgData, 'description': e.target.value })} value={imgData.description}></textarea>


        <CldUploadWidget uploadPreset="ezfrx_lib" onClose={(results, options) => document.getElementById('my_modal_3').showModal()} onSuccess={(results, options) => setImgData({ ...imgData, 'img_info': results.info })}   >
            {({ open }) => {
                return (
                    <button className=" bg-gray-500  text-white rounded-md p-3" onClick={() => open()} type="button" ref={upload_btn_ref}   >
                        Upload an Image
                    </button>

                );
            }}
        </CldUploadWidget>

        <textarea className="textarea textarea-bordered  w-[100%]" placeholder="Price details"></textarea>
        <input type="text" placeholder="Daily Plan" name="daily" className="input input-bordered w-[100%]" onChange={(e) => setImgData({ ...imgData, 'daily_price': e.target.value })} value={imgData.daily} />
        <input type="text" placeholder="Weekly Plan" name="weekly" className="input input-bordered w-[100%]" onChange={(e) => setImgData({ ...imgData, 'weekly_price': e.target.value })} value={imgData.weekly} />
        <input type="text" placeholder="Monthly Plan" name="monthly" className="input input-bordered w-[100%]" onChange={(e) => setImgData({ ...imgData, 'monthly_price': e.target.value })} value={imgData.monthly} />

        <button className="btn btn-md bg-gray-500  text-white rounded-md" type="submit">Submit</button>


    </form>

    <form method="dialog">
        if there is a button in form, it will close the modal
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>

</div>
</dialog> */}
                </Hero>
                :

                router.push(`/auth?next=${pathname}`)

            }

        </>
    )
}

export default Packages