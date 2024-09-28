import { makeApiRequest, parseFullSymbol, generateSymbol,resolveGetData } from "./helpers";
import { Urls } from "./urls";
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import { fetchChartData } from "@/components/fetchdata";

// DatafeedConfiguration implementation
// ...
// Obtains all symbols for all exchanges supported by CryptoCompare API



const url = Urls()


// TAKE NOTE
const fetchTicker= ()=>{
    let query=localStorage.getItem('ticker_query')
    // let ticker_data=localStorage.getItem('ticker_data')
    
     var res
    if(query!=null || query!=''){
         res= makeApiRequest(`${url.ticker}?ticker=${query}`,'POST');
    }else{
        res=makeApiRequest(`${url.ticker}?ticker=btc`,'POST');
    }

    return res
}

// DatafeedConfiguration implementation
const configurationData = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: ['1','2','3','5',
        '15','30','60','90',
        '1H','1D',
         '1W', '1M','3M'],
    // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
    exchanges: [
        { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
        
    ],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [
        { name: 'crypto', value: 'crypto' }
    ]
};
async function getAllSymbols() {
    
    var data = await fetchTicker()
    
   
    
    let allSymbols = [];
   

    // const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);

    for (const exchange of configurationData.exchanges) {
        for (const item in data.data) {
            allSymbols.push({
                symbol: data.data[item].symbol,
                ticker: data.data[item].symbol,
                description: data.data[item].name,
                exchange: exchange.value,
                type: 'crypto',
            })

        };

    }
    
    
    return allSymbols;


    // for (const leftPairPart of Object.keys(pairs)) {
    //     const symbols = pairs[leftPairPart].map(rightPairPart => {
    //         const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);

    //         return {
    //             symbol: symbol.short,
    //             ticker: symbol.full,
    //             description: symbol.short,
    //             exchange: exchange.value,
    //             type: 'crypto',
    //         };
    //     });
    //     allSymbols = [...allSymbols, ...symbols];
    // }

}






export default {

    onReady: (callback) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData));
    },

    searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
    ) => {
        console.log('[searchSymbols]: Method call');
        localStorage.setItem('ticker_query',userInput)
        const symbols = await getAllSymbols();
        const newSymbols = symbols.filter(symbol => {
            const isExchangeValid = exchange === '' || symbol.exchange === exchange;
            const isFullSymbolContainsInput = symbol.ticker
                .toLowerCase()
                .indexOf(userInput.toLowerCase()) !== -1;
            return isExchangeValid && isFullSymbolContainsInput;
        });

        onResultReadyCallback(newSymbols);
    },

    resolveSymbol: async (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
        extension
    ) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        const symbols = await getAllSymbols();
        localStorage.setItem('ticker_data',symbolName)
        
        const symbolItem = symbols.find(({ ticker }) => {
            console.log(ticker)
            
            return ticker === symbolName});

       
        if (!symbolItem) {
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
            onResolveErrorCallback('Cannot resolve symbol');
            return;
        }

        var ticker=symbolItem.ticker
        var symbol=symbolItem.symbol
        var description=symbolItem.description
        var type=symbolItem.type
        var exchange=symbolItem.exchange

        if(localStorage.getItem('ticker_data')=='' ||localStorage.getItem('ticker_data')==null){
        var ticker='BTC-USD'
        var symbol='BTC-USD'
        var description='Bitcoin USD'
        var type='crypto'
        var exchange='Bitfinex'

        }
       
        // Symbol information object
        const symbolInfo = {
            ticker: ticker,
            name: symbol,
            description: description,
            type: type,
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: true,
            // visible_plots_set: 'ohlc',
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
        };
        // console.log('INSIDE DATAFEED',symbolName)
        
        console.log('[resolveSymbol]: Symbol resolved', symbolName);
        onSymbolResolvedCallback(symbolInfo);
    },

    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        
        const { from, to, firstDataRequest } = periodParams;
        
         
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
        // const data = chartData.data || [];
       
            
        try {
            
            
            const data = await makeApiRequest(`${url.chart}?ticker=${symbolInfo.ticker}&interval=${resolution.toLowerCase()}&start=${from}&end=${to}`,'GET');
            // localStorage.setItem('ticker',symbolInfo.ticker)
            // fetchChartData({'start':from,'end':to,'interval':resolution.toLowerCase(),'ticker':symbolInfo.ticker})

            localStorage.setItem('ticker_param',JSON.stringify({'start':from,'end':to,'interval':resolution.toLowerCase(),'ticker':symbolInfo.ticker}))
            // localStorage.setItem('end',to)
            // localStorage.setItem('interval',resolution.toLowerCase())
            console.log(resolution)
            if (data.loading && data.loading === true || data.length === 0) {
                // "noData" should be set if there is no data in the requested period
                onHistoryCallback([], { noData: true });
                return;
            }
            
            const obj=resolveGetData(data)
            
            
            
          
            var bars = [];
            obj.forEach(val => {
                // if (val.time >= from && val.time < to) {
                    

                const dateString =  val[0]; // Example "YYYYMMDD" string
                

                const fromDate = new Date(dateString);
                const fromTimestamp = fromDate.getTime();
                

             


                


                    bars = [...bars, {
                        time:  fromTimestamp,
                        low: val[3],
                        high: val[2],
                        open: val[1],
                        close: val[4],
                        volume: val[5],
                        adx: val[6],
                    }];
                // }
            });
            

           
            
            
            console.log(`[getBars]: returned ${bars.length} bar(s)`);
          
            onHistoryCallback(bars, { noData: false });
            console.log('BARS ', bars)
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },


    // In this example we are returning random values (which probably don't make any sense from a trading purpose)
    // but it is just to illustrate how to structure the function and returned object.
    getQuotes(symbols, onDataCallback, onErrorCallback) {
        const data = [];

        symbols.forEach((symbol) => {
            data.push({
                n: symbol,
                s: 'ok',
                v: {
                    ch: Math.random() * (5 - 1) + 1,
                    chp: Math.random() * (5 - 1) + 1,
                    lp: Math.random() * (10 - 1) + 1,
                    ask: Math.random() * (10 - 1) + 1,
                    bid: Math.random() * (10 - 1) + 1,
                    spread: 0.20,
                    open_price: Math.random() * (5 - 1) + 1,
                    high_price: Math.random() * (5 - 1) + 1,
                    low_price: Math.random() * (5 - 1) + 1,
                    prev_close_price: Math.random() * (5 - 1) + 1,
                    original_name: symbol,
                    volume: Math.random() * (5 - 1) + 1,
                },
            });
        });

        // To ensure the callback is only evoked when the library is ready - see Asynchronous callbacks
        setTimeout(() => onDataCallback(data), 0);
    }
};



