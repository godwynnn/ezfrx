"use client"

import React, { useEffect, useLayoutEffect, useState } from 'react'


import Chart from '@/components/chart'
import Navbar from '@/components/navbar'
import Rates from '@/components/rates'
import Amt from '@/components/amt'
import { useSelector, useDispatch } from 'react-redux'
import AuthValidator from '@/components/authValidator'
import { redirect } from 'next/navigation'
import Hero from '../hero'
// import { cookies } from 'next/headers'
import { Urls } from '../urls'
import { useRouter, } from 'next/navigation'
import Filter from '@/components/filter'
import { AuthencticationAction } from '@/reducer/reducer'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import {ChartingLibraryWidgetOptions,ResolutionString} from '../../../public/static/charting_library/charting_library'
import dynamic from 'next/dynamic'
import '../../../public/static/charting_library/'
import CustomDatafeed from '../../app/datafeed'

// import Chart from '@/components/chart'



// const ChartContainer = dynamic(
//     () =>
//       import("@/components/chart").then((mod) => mod.Chart),
//     { ssr: false }
//   );


const url = Urls()
function Dashboard() {

    const router = useRouter()
    const [graph, setGraph] = useState('candlestick')
    const dispatch = useDispatch()

    const [expiry, setExpiry] = useState(null)
    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in

    const chartData = useSelector(state => state.reducer.chartreducer)
    let ticker_symbol=localStorage.getItem('ticker_data')


    const defaultWidgetProps={
        symbol: ticker_symbol || 'BTC-USD',
        // symbol:  'aapl',
        interval: "1D",
        datafeedUrl: url.chart,
        libraryPath: "/static/charting_library/charting_library/",
        locale: "en",
        charts_storage_url: "http://localhost:3000/",
        charts_storage_api_version: "1.1",
        client_id: "http://localhost:3000/",
        user_id: "public_user_id",
        fullscreen: true,
        autosize: true,
        studiesOverrides: {},

        // widgetbar: {
        //     watchlist: true,
        //     watchlist_settings: {
        //         default_symbols: ["BTC-USD"],
        //         readonly: true,
        //     },
        // },

        custom_indicators_getter: function (PineJS) {
            return Promise.resolve([
                {
                    name: 'Bar Colorer Demo',
                    metainfo: {
                        _metainfoVersion: 51,
        
                        id: "BarColoring@tv-basicstudies-1",
                        name: "BarColoring",
                        description: "Bar Colorer Demo",
                        shortDescription: "Bar Coloring",
        
                        isCustomIndicator: true,
                        is_price_study: true,
        
                        format: {
                            type: 'price',
                            precision: 4,
                        },
        
                        defaults: {
                            palettes: {
                                palette_0: {
                                    // palette colors
                                    // change it to the default colors that you prefer,
                                    // but note that the user can change them in the Style tab
                                    // of indicator properties
                                    colors: [
                                        { color: '#FFFF00' },
                                        { color: '#0000FF' }
                                    ]
                                }
                            }
                        },
                        inputs: [],
                        plots: [{
                            id: 'plot_0',
        
                            // plot type should be set to 'bar_colorer'
                            type: 'bar_colorer',
        
                            // this is the name of the palette that is defined
                            // in 'palettes' and 'defaults.palettes' sections
                            palette: 'palette_0'
                        }],
                        palettes: {
                            palette_0: {
                                colors: [
                                    { name: 'Color 0' },
                                    { name: 'Color 1' }
                                ],
        
                                // the mapping between the values that
                                // are returned by the script and palette colors
                                valToIndex: {
                                    100: 0,
                                    200: 1
                                }
                            }
                        }
                    },
                    constructor: function() {
                        this.main = function(context, input) {
                            this._context = context;
                            this._input = input;
        
                            var valueForColor0 = 100;
                            var valueForColor1 = 200;
        
                            // perform your calculations here and return one of the constants
                            // that is specified as a key in 'valToIndex' mapping
                            var result =
                                Math.random() * 100 % 2 > 1 ? // we randomly select one of the color values
                                    valueForColor0 : valueForColor1;
        
                            return [result];
                        }
                    }
                }
            ]);
        },
        
      };
      



    const getSubscriptionData = () => {
        fetch(`${url.subscription_data}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            },
        }).then(res => res.json())
            .then(data => {
                console.log('subscription_Data', data.data[0])
                setExpiry(data.data[0].end_date)
                // dispatch(AuthencticationAction.Login({...authData,'expiry':data.data[0].end_date}))
            })
    }

    useLayoutEffect(() => {
        getSubscriptionData()

    }, [])

    const handleGraphChange = e => {
        setGraph(e.target.value)
    }











    useLayoutEffect(() => {

        if (!logged_in) {
            redirect('/auth')
        }

    }, [])

    // console.log('dashboard', authData)

    return (
        <>
            {authData.logged_in ?
                <Hero>
                    <main className={'bg-[#0B1215] lg:w-[100%] lg:h-[120vh]  max-xl:h-[100vh] lg:overflow-x-hidden md:h-[150vh] md:w-[100%] max-md:h-[100vh] max-md:w-[100%] '}>

                        <div className={'flex lg:w-full lg:h-[100%] md:h-full lg:flex-row p-2'}>
                            {/* <aside className={' lg:flex lg:w-[40%] lg:h-[full] md:h-full p-5 md:hidden sm:hidden max-sm:hidden'}>
                                <Rates handleGraphChange={handleGraphChange} />
                            </aside> */}

                            <div className={'flex lg:flex-row p-0 lg:w-[100%] lg:h-full md:w-[100%] md:h-[100%] sm:w-[100%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%]  border-white bg-[#101720] max-md:flex-col max-xl:flex-col md:flex-col'}>
                                <div className='flex flex-col w-[100%] h-[100%] p-2'>

                                    <div className='p-0 m-0 w-[100%] lg:h-[10%] flex justify-center items-center'>
                                        <FlipClockCountdown

                                            // to={new Date(expiry).getTime() + 24 * 3600 * 1000 + 5000}
                                            to={'2024-09-12'}
                                            className='h-full' title='Count-Down'
                                            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                                            
                                            digitBlockStyle={{ height: 45,width:25,backgroundColor:'white',color: 'bg-[#0B1215]'}}
                                            // dividerStyle={{ color: 'white', height: 1 }}
                                            //  separatorStyle={{ color: 'red', size: '6px' }}
                                            labelStyle={{ fontSize: 15, fontWeight: 500, textTransform: 'uppercase', color: 'white', marginTop: '10%' }}
                                        />;

                                    </div>
                                   

{/* 
                                    <div className='w-[100%] lg:h-[20%] md:h-[40%] sm:h-[50%] max-sm:h-[70%] p-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-2  place-items-center' >
                                        <Filter />
                                    </div> */}
                                    <div className='p-5 flex overflow-y-hidden justify-center items-center lg:w-[100%] lg:h-[90%] max-lg:w-[100%] max-lg:h-[70%] md:w-[100%] md:h-[70%] max-md:h-[100%] sm:w-[100%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%]  '>

                                        <Chart graph={graph} widget_data={defaultWidgetProps} />
                                    </div>
                                </div>



                                {/* 
             <aside className={'lg:w-[40%] lg:h-full flex items-center flex-col justify-center p-0 md:w-[100%] md:h-full '}>
                 <Amt/>
             </aside> */}
                            </div>

                        </div>

                    </main>
                </Hero>

                :
                router.push('/')

            }



        </>
    )
}

export default Dashboard