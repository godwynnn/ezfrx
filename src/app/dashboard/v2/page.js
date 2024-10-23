"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'


import Chart from '@/components/chart'
import Navbar from '@/components/navbar'
import Rates from '@/components/rates'
import Amt from '@/components/amt'
import { useSelector, useDispatch } from 'react-redux'
import AuthValidator from '@/components/authValidator'
import { redirect } from 'next/navigation'
import Hero from '@/app/hero'
// import { cookies } from 'next/headers'
import { Urls } from '@/app/urls'
import { useRouter, } from 'next/navigation'
import Filter from '@/components/filter'
import { AuthencticationAction } from '@/reducer/reducer'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import dynamic from 'next/dynamic'
// import HighchartsReact from 'highcharts-react-official'
import Highcharts from "highcharts/highstock";
import HighchartsExporting from 'highcharts/modules/exporting'
import patternFill from "highcharts/modules/pattern-fill";
import highchartsGantt from "highcharts/modules/gantt";
// Load Highcharts modules
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)
require('highcharts/indicators/price-channel')(Highcharts);

import dataModule from 'highcharts/modules/data';
import exportingModule from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import ema from 'highcharts/indicators/ema';
import apo from 'highcharts/indicators/apo';
import { name } from 'plotly.js/lib/bar'
import HC_drag_panes from "highcharts/modules/drag-panes"


dataModule(Highcharts);
exportingModule(Highcharts);
indicators(Highcharts);
ema(Highcharts);
apo(Highcharts);
highchartsGantt(Highcharts);
HC_drag_panes(Highcharts)
// import Chart from '@/components/chart'



// const ChartContainer = dynamic(
//     () =>
//       import("@/components/chart").then((mod) => mod.Chart),
//     { ssr: false }
//   );
// const Highcharts = dynamic(() => import('highcharts/highstock'), {
//     ssr: false
//   });
  
  const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
    ssr: false
  });


  // Load Highcharts modules



const url = Urls()
function Dashboard() {

    const router = useRouter()
    const [graph, setGraph] = useState('candlestick')
    const dispatch = useDispatch()

    const [expiry, setExpiry] = useState(null)
    const [TestchartData, setchartData] = useState({})
    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in

    const chartData = useSelector(state => state.reducer.chartreducer)
    const ChartContainer = useRef()
    let ticker_symbol = localStorage.getItem('ticker_data')

    console.log('chartData', chartData)






    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
    }

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

    const fetchHighchartData = async () => {
        setchartData({
            data: [],
            data_volume: [],
            show_data: false
        })
        const data = await fetch(
            'https://demo-live-data.highcharts.com/aapl-ohlcv.json'
        ).then(response => response.json());
        // split the data set into ohlc and volume
        const ohlc = [],
            volume = [],
            dataLength = data.length;

        for (let i = 0; i < dataLength; i += 1) {
            ohlc.push([
                data[i][0], // the date
                data[i][1], // open
                data[i][2], // high
                data[i][3], // low
                data[i][4] // close
            ]);

            volume.push([
                data[i][0], // the date
                data[i][5] // the volume
            ]);
        }
        setchartData({
            data: ohlc,
            data_volume: volume,
            show_data: true
        })

        console.log(this)
    }



    useLayoutEffect(() => {
        
        fetchHighchartData()

        const handleResize = () => {
            console.log(ChartContainer.current.chart.reflow())
            if (ChartContainer.current) {
                ChartContainer.current.chart.reflow();
            }
          };
      
          window.addEventListener('resize', handleResize);
          
          return () => window.removeEventListener('resize', handleResize);
       

    }, [])

    const options = {
        chart:{
           height:'600',
            // backgroundColor: 'transparent', // Change background color of the chart
            color:'white',
            padding:'20',
        },

        responsive: {
            rules: [{
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  enabled: false
                }
              }
            }]
          },
      
           
        title: {
            text: 'My chart',
            
        },

        yAxis: [{
            height: '75%',
            width:'100%',
            labels: {
              align: 'right',
              x: -3
              
            },
            title: {
              text: 'OHLC'
            }
          }, {
            top: '75%',
            height: '25%',
            labels: {
              align: 'right',
              x: -3
            },
            offset: 0,
            title: {
              text: 'MACD'
            }
          }],
          
        

        series: [{
            type:'candlestick',
            id: 'aapl',
            name: 'AAPL',
            data: TestchartData.data,
            
        },
        {
            type: 'pc',
            id: 'overlay',
            linkedTo: 'aapl',
            yAxis: 0,
            data: TestchartData.data_volume,
        },
        // {
        //     type: "column",
        //     name: 'volume',
        //     linkedTo: 'aapl',
        //     id: 'volume',
        //     yAxis: 1,
        //     data: TestchartData.data_volume,
        
        // },
        
        {
            type: "macd",
            name:'Volume',
           
            linkedTo: 'aapl',
            id: 'oscillator',
            yAxis: 1,
            data: TestchartData.data_volume,
        
        }
        ],
        rangeSelector:{
            buttons:[
                {
                    type:'month',
                    count:1,
                    text:'1mo',
                    events:{
                        click:function(obj){
                            console.log(this)
                        }
                    }
                },
                {
                    type:'month',
                    count:3,
                    text:'3mo',
                    events:{
                        click:function(obj){
                            console.log(this)
                        }
                    }
                }
            ]
        },
        plotOptions: {
            candlestick: {
              color: '#A03C3C', // Color for bearish candles
              upColor: '#338546', // Color for bullish candles
              lineColor: '#000000', // Border color for candlesticks
              upLineColor: '#000000', // Border color for bullish candlesticks
            },
          },


    }
    // console.log(options)
    
    

    const fetchOscillatorData=(chart)=>{
        const series = chart.get('overlay');
        console.log(series)
    }








    useLayoutEffect(() => {

        if (!logged_in) {
            redirect('/auth')
        }

    }, [])


    useEffect(()=>{
        
    },[])



    return (
        <>
            {authData.logged_in ?
                <Hero>
                    <main className={'bg-[#0B1215] lg:w-[100%] lg:h-[120vh]  max-xl:h-[100vh] lg:overflow-x-hidden md:h-[150vh] md:w-[100%] max-md:h-[100vh] max-md:w-[100%] '}>

                        <div className={'flex lg:w-full lg:h-[100%] md:h-full lg:flex-row p-2'}>
                            <aside className={' lg:flex lg:w-[25%] lg:h-[full] md:h-full p-5 md:hidden sm:hidden max-sm:hidden'}>
                                <Rates handleGraphChange={handleGraphChange} />
                            </aside>

                            <div className={'flex lg:flex-row p-0 lg:w-[100%] lg:h-full md:w-[100%] md:h-[100%] sm:w-[100%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%]  border-white bg-[#101720] max-md:flex-col max-xl:flex-col md:flex-col'}>
                                <div className='flex flex-col w-[100%] h-[100%] p-2'>

                                    <div className='p-0 m-0 w-[100%] lg:h-[10%] flex justify-center items-center'>
                                        <FlipClockCountdown

                                            // to={new Date(expiry).getTime() + 24 * 3600 * 1000 + 5000}
                                            to={'2024-09-12'}
                                            className='h-full' title='Count-Down'
                                            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}

                                            digitBlockStyle={{ height: 45, width: 25, backgroundColor: 'white', color: 'bg-[#0B1215]' }}
                                            // dividerStyle={{ color: 'white', height: 1 }}
                                            //  separatorStyle={{ color: 'red', size: '6px' }}
                                            labelStyle={{ fontSize: 15, fontWeight: 500, textTransform: 'uppercase', color: 'white', marginTop: '10%' }}
                                        />;

                                    </div>


                                    {/* 
                                    <div className='w-[100%] lg:h-[20%] md:h-[40%] sm:h-[50%] max-sm:h-[70%] p-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-2  place-items-center' >
                                        <Filter />
                                    </div> */}
                                    <div   className='p-0 flex overflow-y-hidden justify-center items-center lg:w-[100%] lg:h-[90%] max-lg:w-[100%] max-lg:h-[70%] md:w-[100%] md:h-[70%] max-md:h-[100%] sm:w-[100%] sm:h-[100%] max-sm:w-[100%] max-sm:h-[100%]  '>
                                       
                                        {TestchartData.show_data ?
                                        
                                            <HighchartsReact
                                                highcharts={ Highcharts }
                                                options={options}
                                                constructorType={'stockChart'}
                                                containerProps={{ style: { width: "100%" } }}
                                               
                                                callback={ fetchOscillatorData }
                                                ref={ChartContainer}
                                                
                                            />
                                            
                                            :
                                            <span className="loading loading-bars text-white loading-lg"></span>

                                            
                                        }


                                    </div>
                                </div>




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