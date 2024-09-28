import { Urls } from "./urls";
import { useDispatch } from "react-redux"
import { ChartAction } from "@/reducer/reducer"



const url=Urls()
// Makes requests to CryptoCompare API
export async function makeApiRequest(path,q_method) {

    try {
        const response = await fetch(path, {
            method: q_method,
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/form-data',
            },})
        // const response = await fetch(`${path}`);
      
        return response.json();

    } catch(error) {
        throw new Error(`request error: ${error.status}`);
    }
}

// Generates a symbol ID from a pair of the coins
export function generateSymbol(symbol, idx) {
    const short = symbol[idx];
    return {
        short,
        full: `${short}`,
    };
    
}

// Returns all parts of the symbol
export function parseFullSymbol(fullSymbol) {
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    if (!match) {
        return null;
    }
    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}


export function resolveGetData(obj){
    const all_dates = Object.entries(obj.prices.datetime)
    const all_highs = Object.entries(obj.prices.high)
    const all_opens = Object.entries(obj.prices.open)
    const all_closes = Object.entries(obj.prices.close)
    const all_lows = Object.entries(obj.prices.low)
    const all_volumes=Object.entries(obj.prices.volume)
    const adx = Object.entries(obj.prices.adx)
    // const apo = Object.entries(obj.prices.apo)
    // const atr = Object.entries(obj.prices.atr)
    // const cci = Object.entries(obj.prices.cci)
    // const ma5 = Object.entries(obj.prices.ma5)
   


    const adx_indicators=[]
    


    all_dates.forEach((val, idx) => {

        all_highs.forEach(val => {
            return val
        })
        all_opens.forEach(val => {
            return val
        })
        all_lows.forEach(val => {
            return val
        })
        all_closes.forEach(val => {
            return val
        })

        all_volumes.forEach(val => {
            return val
        })

        adx.forEach(val => {
            return val
        })

        




        if (idx === all_opens.indexOf(all_opens[idx])) {
            val[2] = parseFloat(all_opens[idx][1])
            

        }
        if (idx === all_highs.indexOf(all_highs[idx])) {
            val[3] = parseFloat(all_highs[idx][1])
            
        }

        if (idx === all_lows.indexOf(all_lows[idx])) {
            val[4] = parseFloat(all_lows[idx][1])
            

        }
        if (idx === all_closes.indexOf(all_closes[idx])) {
            val[5] = parseFloat(all_closes[idx][1])
            

        }

        if (idx === all_volumes.indexOf(all_volumes[idx])) {
            val[6] = parseFloat(all_volumes[idx][1])
            

        }

        if (idx === adx.indexOf(adx[idx])) {
            val[7] = parseFloat(adx[idx][1])
            // adx_indicators.push({time:val[1],value:parseFloat(adx[idx][1])})
            

        }

  
        // let obj_data=val.slice(1,val.length)
        
        val.splice(0,1)
        
        
        return val




    })
   
    // window.localStorage.setItem('adx_indicators',JSON.stringify(adx_indicators))
    console.log('ADX INSDIE CHART',all_dates)
    let all_data=all_dates

    return all_data

}