'use client';
// import Plot from 'react-plotly.js';
import React, { useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { object } from 'yup';
import { Urls } from '@/app/urls';
import { chartData } from './fetchdata';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from './fetchdata';
import { UseDispatch } from 'react-redux';
import { ChartAction } from '@/reducer/reducer';
import { w3cwebsocket as wS3 } from 'websocket';
// import { createChart } from 'lightweight-charts';
// import Chart from '@/components/chart'
import { widget, version } from '../../public/static/charting_library/charting_library';
import '../../public/static/charting_library/datafeeds/udf/dist/bundle'
import CustomDatafeed from '../app/datafeed'
import { makeApiRequest } from '@/app/helpers';

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });



const url = Urls();


function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function Chart(props) {
  //  client=w3cwebsocket('')
  const dispatch = useDispatch();
  let chartData = useSelector((state) => state.reducer.chartreducer);
  const chart_ref1 = useRef();
  const chart_ref2 = useRef();
  const chartContainerRef = useRef();
  const d = new Date();
  const [tvwidget, setTvwidget] = useState(null)
  const adx_indicators = JSON.parse(localStorage.getItem('adx_indicators'))
  const selected_indicator=chartData.indicator || 'adx'
  // client=new wS3('');

  // const [loading, setLoading] = useState(true);


  console.log('ADX OUTSIDE CHART ', chartData)



  const [type, setType] = useState('candlestick');


  console.log('data', CustomDatafeed);

  const date = chartData.dates;
  const close_data = chartData.close;



  const high_data = chartData.high;





  const low_data = chartData.low;

  const open_data = chartData.open;
  const data = chartData.data || [];

  // console.log(data)








  let chart_Data = {
    series: [{
      data: data,


    }],
    options: {
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
            customIcons: []
          },
          autoSelected: 'pan',
          zoom: {
            enabled: false
          },
        },
        type: props.graph,
        height: 350,

      },
      title: {
        text: chartData.symbol,
        align: 'left',


      },
      grid: {
        // position: 'front',
        borderColor: '#444444',
        strokeDashArray: 1,

        xaxis: {
          lines: {
            show: true
          }
        }
      },

      xaxis: {
        type: 'datetime',
        tickPlacement: 'on',



      },
      yaxis: {
        tooltip: {
          enabled: false
        },
        axisBorder: {
          show: false,
          color: '#78909C',

        },
        labels: {
          formatter: function (value) {
            return (value / 10000).toFixed(4);
          },
          // offsetX:-1,
        },
        dataLabels: {
          enabled: false,
        },
        opposite: true


      },

      plotOptions: {
        candlestick: {
          colors: {
            upward: '#1654B0',
            downward: '#BD0C0C'
          }
        }
      },





    },


  };

 
  

  // useLayoutEffect(() => {
 
  //   getFilterQueryData()
  // },[props.widget_data.symbol,chartData.interval,ticker_param['ticker']])



  // TRADINGVIEW SETUP
  const all_data = {
    adx: [],
    apo: [],
    atr:[],
    cci:[],
    ma5:[],
    ma20:[]
  };
  data.forEach((val, i, arr) => {

    return [
      all_data.adx.push({ value: val[5], time: val[0] }),
      all_data.apo.push({ value: val[6], time: val[0] }),
      all_data.atr.push({ value: val[7], time: val[0] }),
      all_data.cci.push({ value: val[8], time: val[0] }),
      all_data.ma5.push({ value: val[9], time: val[0] }),
      all_data.ma20.push({ value: val[10], time: val[0] })

    ]



  });



  const myPriceFormatter = p => p.toFixed(2);










  useEffect(() => {


    const widgetOptions = {
      symbol: props.widget_data.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      // datafeed: new window.Datafeeds.UDFCompatibleDatafeed("http/s://demo-feed-data.tradingview.com"),
      datafeed: CustomDatafeed,
      interval: props.widget_data.interval,
      container: chartContainerRef.current,
      library_path: props.widget_data.libraryPath,

      locale: getLanguageFromURL() || 'en',
      disabled_features: [],
      enabled_features: [],
      charts_storage_url: props.widget_data.chartsStorageUrl,
      charts_storage_api_version: props.widget_data.chartsStorageApiVersion,
      // client_id: props.widget_data.clientId,
      // user_id: props.widget_data.userId,
      fullscreen: props.widget_data.fullscreen,
      autosize: props.widget_data.autosize,
      studies_overrides: props.widget_data.studiesOverrides,
      theme: 'Dark',
      timezone: 'Asia/Bangkok',
      debug: true,
      // width:300,
      // height:600,
      studies_overrides: {},
      overrides: {
        "paneProperties.background": "rgba(32, 32, 32, 1)",
        "paneProperties.backgroundType": "solid"

      },
      widgetbar: {
        watchlist: true,
        watchlist_settings: {
          default_symbols: ["BTC-USD"],
          readonly: true,
        },
      },


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
            constructor: function () {

              this.init = function (context, inputCallback) {
                this._context = context;
                this._input = inputCallback;
                console.log('CONTEXT ', context)
                // const data = await makeApiRequest(`${url.chart}?ticker=${symbolInfo.ticker}&interval=${resolution.toLowerCase()}&start=${from}&end=${to}`,'GET');

                // Define the symbol to be plotted.
                // Symbol should be a string.
                // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
                // For example,
                //    var symbol = 'AAPL';
                //    var symbol = '#EQUITY';
                //    var symbol = PineJS.Std.ticker(this._context) + '#TEST';
                const symbol = 'BTC-USD'; // #EQUITY should be replaced with the symbol you want to resolve
                this._context.new_sym(symbol, PineJS.Std.period(this._context));
              };


              this.main = function (context, input) {

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

    // let tvWidget = new widget(widgetOptions);
    // setTvwidget(new widget(widgetOptions))
    // console.log(tvwidget)


    // tvWidget.changeTheme()



    // tvWidget.onChartReady(async () => {
    //   tvWidget.headerReady().then(() => {
    //     const button = tvWidget.createButton();
    //     button.setAttribute('title', 'Click to show a notification popup');
    //     button.classList.add('apply-common-tooltip');
    //     button.addEventListener('click', () => tvWidget.showNoticeDialog({
    //       title: 'Notification',
    //       body: 'TradingView Charting Library API works correctly',
    //       callback: () => {
    //         console.log('Noticed!');
    //       },
    //     }));

    //     button.innerHTML = 'Check API';
    //   });


    // })



  }, [])



  return (
    <>


      <div className={'p-0 lg:w-[100%] lg:h-[100vh] max-lg:w-[100%] max-lg:h-[100%] md:w-[100%] max-md:h-[100%] sm:h-[100%] max-sm:h-[100%] '}>

        <div ref={chartContainerRef} className='w-[100%] h-[100vh]'></div>


      </div>
      

 
      





    </>

  )
}

export default Chart