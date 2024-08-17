"use client"
import React from 'react'
import { useState } from 'react'
import { fetchChartData } from './fetchdata'
import { UseDispatch, useDispatch, useSelector } from 'react-redux'
import { AuthencticationAction, AuthenticationReducer } from '@/reducer/reducer'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Rates from './rates'
import Image from 'next/image'



function Navbar() {
    const [data, setData] = useState(null)
    const dispatch = useDispatch()
    const chartData = useSelector(state => state.reducer.chartreducer)
    const authData = useSelector(state => state.reducer.authreducer)
    const router = useRouter()



    const Logout = () => {

        dispatch(AuthencticationAction.Logout())
        router.push('')


    }
    return (

        <div className="navbar navbar_header text-white  justify-between p-4 pl-[5%] pr-[5%]">

            <div className="navbar-left lg:w-[10%] md:w-[20%] sm:w-[20%]  max-sm:w-[30%] h-[10vh]">
                <Image src={require('../../assets/logo.png')} className='w-[100%] ' />
            </div>


            {/* <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="text-black menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link href={'/'}> <li><a>Home</a></li></Link>
                        <Link href={'/packages'}> <li><a>Package</a></li></Link>

                        <li><a>About</a></li>
                    </ul>
                </div>
            </div> */}



            <div className="navbar-end p-2">
                <ul className="menu menu-vertical lg:flex md:hidden sm:hidden max-sm:hidden flex-row bg-transparent rounded-box w-[60%] font-bold justify-evenly ">
                    <Link href={'/'}> <li><a>Home</a></li></Link>
                    <Link href={'/packages'}> <li><a>Package</a></li></Link>
                    <li><a href='#contact_section'>Contact</a></li>
                </ul>

                {/* <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button> */}
                {/* <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button> */}






                {authData.logged_in ?
                    <>
                        <div className="dropdown dropdown-end text-black">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        <Link href={'/profile'}>
                                            Profile
                                        </Link>


                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li onClick={Logout}><a >Logout</a></li>
                            </ul>
                        </div>
                        <button class="btn btn-outline btn-warning float-right btn-sm " onClick={() => document.getElementById('my_modal_2').showModal()}>Get data</button>

                    </>
                    :

                    <Link href={'/auth'}>
                        <button class="btn btn-outline btn-primary float-right btn-sm " >Login</button>


                    </Link>


                }






                <dialog id="my_modal_2" className="modal">
                    <form method='post' onSubmit={e => (e.preventDefault(), fetchChartData({ 'ticker': chartData.symbol, data }, dispatch))} className="modal-box opacity-[90%] flex flex-col min-h-[90vh] items-center justify-center text-black">
                        <label className="input input-bordered flex items-center gap-2 m-4">
                            <h3>{chartData.symbol}</h3>
                            {/* <input type="text" className="grow" placeholder="#" name='ticker' readOnly /> */}
                        </label>

                        <select className="select select-bordered w-full max-w-xs" name='interval' onChange={e => setData({ ...data, 'interval': e.target.value })} >
                            <option disabled selected>Select Interval?</option>
                            <option value='m'>Minutes</option>
                            <option value='h'>Hours</option>
                            <option value='d'>Days</option>
                            <option value='w'>Weeks</option>
                        </select>

                        <label className="input input-bordered flex items-center gap-2 m-8">
                            Interval


                            <input type="text" className="grow" placeholder="interval?" name='interval_value' onChange={e => setData({ ...data, 'interval_duration': e.target.value })} />
                        </label>


                        <select className="select select-bordered w-full max-w-xs" name='period' onChange={e => setData({ ...data, 'period': e.target.value })}>
                            <option disabled selected>Select Period?</option>
                            <option value='m'>Minutes</option>
                            <option value='h'>Hours</option>
                            <option value='d'>Days</option>
                            <option value='w'>Weeks</option>
                        </select>
                        <label className="input input-bordered flex items-center gap-2 m-8">
                            Period
                            <input type="text" className="grow" placeholder="period?" name='period_value' onChange={e => setData({ ...data, 'period_duration': e.target.value })} />
                        </label>


                        <div className="form-control flex flex-row">

                            <label className="cursor-pointer label">
                                <span className="label-text">Gartley</span>
                                <input type="checkbox" className="checkbox checkbox-success" />
                            </label>
                            <label className="cursor-pointer label">
                                <span className="label-text">Butterfly</span>
                                <input type="checkbox" className="checkbox checkbox-success" name='butter_fly' />
                            </label>
                            <label className="cursor-pointer label">
                                <span className="label-text">Bat</span>
                                <input type="checkbox" className="checkbox checkbox-success" name='bat' />
                            </label>
                            <label className="cursor-pointer label">
                                <span className="label-text">Crab</span>
                                <input type="checkbox" className="checkbox checkbox-success" name='crab' />
                            </label>
                            <label className="cursor-pointer label">
                                <span className="label-text">ABCD</span>
                                <input type="checkbox" className="checkbox checkbox-success" name='abcd' />
                            </label>

                        </div><br />

                        <label className="cursor-pointer label flex flex-col">
                            <span className="label-text">Bollinger Bands</span>
                            <input type="checkbox" className="checkbox checkbox-success" name='bollinger' onChange={e => setData({ ...data, 'bollinger': e.target.value })} />
                        </label>

                        <button class="btn btn-active btn-neutral" type='submit'>Submit</button>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>


                <div className="drawer drawer-end navbar-end z-[1000] w-[10%] lg:hidden md:visible sm:visible max-sm:visible max-md:visible">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                    <div className="drawer-content">
                        {/* Page content here */}

                        <label tabIndex={0} htmlFor='my-drawer-4' role="button" className="btn btn-ghost btn-circle mr-4 font-[10px]">
                            <svg xmlns="http://www.w3.org/2000/svg" className=" h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                    </div>


                    <div className="drawer-side " >
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-[90%] bg-[#101720] relative top-[12.5%] text-white" >
                            {/* Sidebar content here */}
                            <Link href={'/'}> <li><a>Home</a></li></Link>
                            <Link href={'/packages'}> <li><a>Package</a></li></Link>
                            <li><a href='#contact_section'>Contact</a></li>

                            {authData.logged_in ?
                                <>
                                    <Link href={'/videos'}> <li><a>Videos</a></li></Link>

                                    <li className='lg:hidden md:block sm:block max-sm:block' onClick={() => { document.getElementById('my_modal_4').showModal() }}><a>Watchlist</a></li>
                                </>
                                : ''
                            }

                        </ul>
                    </div>
                </div>

            </div>

            <dialog id="my_modal_4" className="modal z-[1000]">
                <div className="modal-box w-11/12 max-w-5xl min-h-[70vh] flex justify-center items-center bg-[#0B1215] text-black ">
                    <form method="dialog" onClick={() => setPlaying(false)}>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                    </form>

                    <Rates />


                </div>

                <form method="dialog" className="modal-backdrop" >
                    <button>close</button>
                </form>
            </dialog>
        </div>










    )
}

export default Navbar