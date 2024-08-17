"use client"
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChartData } from './fetchdata'

function Filter() {
    const dispatch = useDispatch()
    const chartData = useSelector((state) => state.reducer.chartreducer)
    const [filterQuery, setFilterQuery] = useState({
        interval: '1m',
        // interval_duration: '',
        period: '1d',
        // period_duration: ''

    })


    function getFilterQueryData() {
        // console.log(filterQuery)
        fetchChartData({ ...chartData, ...filterQuery, ticker: chartData.symbol }, dispatch)
    }
    return (
        <>


            {/* SELECT CHECKBOX FEATURE */}
            {/* 
            <div className="dropdown dropdown-end">

                <div tabIndex={0} role="button" className="btn m-1 font-extrabold  translate-y-[35%]">+</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-52 p-3">
                    <li className='flex flex-row justify-between'>
                        <span className="label-text">Gartley</span>
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </li>


                    <li className='flex flex-row justify-between'>
                        <span className="label-text">Butterfly</span>
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </li>

                    <li className='flex flex-row justify-between'>
                        <span className="label-text">Bat</span>
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </li>


                    <li className='flex flex-row justify-between'>
                        <span className="label-text">Crab</span>
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </li>

                    <li className='flex flex-row justify-between'>
                        <span className="label-text">ABCD</span>
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </li>

                    <li className='flex flex-row justify-between'>
                        <span className="label-text">Bollinger-Bands</span>
                        <input type="checkbox" className="checkbox checkbox-success" />
                    </li>
                </ul>
            </div> */}


            <label className="form-control w-[80%] max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Select Interval?</span>

                </div>
                <select className="select select-bordered text-white bg-[#101720] w-full border-slate-100 max-w-xs" onChange={(e) => setFilterQuery({ ...filterQuery, interval: e.target.value })}>
                    {/* <option disabled selected>Select Interval</option> */}
                    <optgroup label='Minutes'>
                        <option value='1m'>1 minute</option>
                        <option value='2m'>2 minute</option>
                        <option value='5m'>5 minute</option>
                        <option value='15m'>15 minute</option>
                        <option value='30m'>30 minute</option>
                        <option value='60m'>60 minute</option>
                        <option value='90m'>90 minute</option>


                    </optgroup>
                    <optgroup label='Hours'>
                        <option value='1h'>1 Hour</option>

                    </optgroup>
                    <optgroup label='Days'>
                        <option value='1d'>1 day</option>
                        <option value='5d'>5 days</option>
                    </optgroup>

                    <optgroup label='Weeks'>
                        <option value='1wk'>1 Week</option>

                    </optgroup>


                    <optgroup label='Months'>
                        <option value='1mo'>1 month</option>
                        <option value='3mo'>1 months</option>

                    </optgroup>
                </select>
            </label>



            {/* <label className="form-control w-[80%] max-w-xs">
                <div className="label">
                    <span className="label-text text-white">interval?</span>

                </div>
                <input type="text" placeholder="Type here" className="input border-slate-100 text-white  w-[100%] max-w-xs bg-transparent" onChange={(e) => setFilterQuery({ ...filterQuery, interval_duration: e.target.value })} />

            </label> */}


            <label className="form-control w-[80%] max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Select Period?</span>

                </div>
                <select className="select select-bordered text-white bg-[#101720] w-full border-slate-100 max-w-xs" onChange={(e) => setFilterQuery({ ...filterQuery, period: e.target.value })}>
                    {/* <option disabled selected>Select Period?</option> */}
                    <optgroup label='Days'>
                    <option value='1d'>1 day</option>
                    <option value='5d'>5 days</option>

                    </optgroup>

                    <optgroup label='Months'>
                    <option value='1mo'>1 month</option>
                    <option value='3mo'>3 months</option>
                    <option value='6mo'>6 months</option>

                    </optgroup>


                    <optgroup label='Years'>
                    <option value='1y'>1 year</option>
                    <option value='2y'>2 years</option>
                    <option value='5y'>6 years</option>
                    <option value='10y'>10 years</option>

                    </optgroup>
                    


               
                    <option value='ytd'>Yesterday</option>
                    <option value='max'>Max</option>

                   
                    
                    
                </select>
            </label>



            {/* <label className="form-control w-[80%] max-w-xs">
                <div className="label">
                    <span className="label-text text-white">Period?</span>

                </div>
                <input type="text" placeholder="Type here" className="input border-slate-100 text-white  w-[100%] max-w-xs bg-transparent" onChange={(e) => setFilterQuery({ ...filterQuery, period_duration: e.target.value })} />

            </label> */}


            <button class="btn btn-active btn-neutral translate-y-[40%]" type='submit' onClick={getFilterQueryData}>Submit</button>


        </>
    )
}

export default Filter