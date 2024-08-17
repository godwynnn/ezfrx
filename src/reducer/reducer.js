
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
//  import { cookies } from "next/headers";

const State = {
    accessToken: null,
    date_exp: null,
    logged_in: false,
    email: '',
    is_admin: false,
    email: '',
    first_name: '',
    curr_package: null,
    is_subscribed: false,
    last_name: '',
    id: null,

    subscription_type: null

}

export const AuthenticationSlice = createSlice({
    name: 'auth',
    initialState: State,

    reducers: {
        Login: (state, action) => {
            console.log('dispatch values', action.payload)
            state.logged_in = true
            state.email = action.payload.email
            state.accessToken = action.payload.data.token
            state.date_exp = action.payload.expiry
            state.first_name = action.payload.data.user.first_name
            state.last_name = action.payload.data.user.last_name
            state.curr_package = action.payload.data.user.current_subscription
            state.email = action.payload.data.user.email
            state.id = action.payload.data.user.id


            if (action.payload.data.user.role === 'ADMIN' || action.payload.data.user.role=== 'SUPERUSER') {
                state.is_admin = true
            } else {
                state.is_admin = false
            }



        },

        Logout: (state, action) => {

            console.log('logged out')
            state.logged_in = false
            state.email = ''
            state.refreshToken = null
            state.accessToken = null

        }
    }
})


export const { actions: AuthencticationAction, reducer: AuthenticationReducer } = AuthenticationSlice

const chartState = {
    dates: null,
    close: null,
    high: null,
    low: null,
    open: null,
    loading: true,
    indicator_load:true,
    using_post: false,
    symbol: 'BTC-USD',
    data: null,
    interval: "1m",
    // interval_duration: 15,
    period: "1d",
    indicator:null
    // period_duration: 1,
    
}

const ChartSlice = createSlice({
    name: 'chart',
    initialState: chartState,

    reducers: {
        setQuery: (state, action) => {
            console.log('inside reducer',action.payload)
            state.dates = action.payload.dates
            state.close = action.payload.close
            state.high = action.payload.high
            state.low = action.payload.low
            state.open = action.payload.open
            state.loading = action.payload.loading
            state.using_post = action.payload.searched_with_post
            state.indicator=action.payload.indicator

            if (action.payload.symbol===undefined){
                state.symbol='BTC-USD'
            }else{
                state.symbol = action.payload.symbol

            }


            // if (action.payload.interval_duration===undefined){
            //     state.interval_duration=15
            // }else{
            //     state.interval_duration = action.payload.interval_duration

            // }



            if (action.payload.interval===undefined || ''){
                state.interval='1m'
            }else{
                state.interval = action.payload.interval

            }



            if (action.payload.period===undefined || ''){
                state.period='1d'
            }else{
                state.period = action.payload.period

            }
            state.indicator=action.payload.indicator

            // if(action.payload.indicator===undefined || ''){
            //     state.indicator_load=true
            //     state.indicator='adx'
            //     setTimeout(()=>{
            //         state.indicator_load=false
            //     },500)
                

            // }else{
            //     state.indicator_load=true
            //     state.indicator=action.payload.indicator.trim()

            //     setTimeout(()=>{
            //         state.indicator_load=false
            //     },500)
                
            // }


            // if (action.payload.period_duration===undefined){
            //     state.period_duration=1
            // }else{
            //     state.period_duration = action.payload.period_duration

            // }
            state.data = action.payload.data
            // state.interval=action.payload.interval
            // state.interval_duration=action.payload.interval_duration
            // state.period=action.payload.period
            // state.period_duration=action.payload.period_duration

        },
        getData: (state, action) => {

        }


    }
})

export const { actions: ChartAction, reducer: ChartReducer } = ChartSlice
// export const authData=useSelector(state=>state.reducer.authreducer)