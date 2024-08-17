"use client"
import React, { useEffect } from 'react'
import { Urls } from '../urls'


const url=Urls()
function page() {

    useEffect(()=>{
        fetch(url.test,{
          method: "GET",
          }).then(res=>res.json())
        .then(data=>console.log(data))
    },[])

    
  return (
    <h2>hello</h2>
  )
}

export default page