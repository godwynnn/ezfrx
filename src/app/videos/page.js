"use client"
import React, { useEffect, useState } from 'react'
import Hero from '../hero'
import ReactPlayer from 'react-player'
import { Urls } from '../urls'
import { useSelector } from 'react-redux'
import Link from 'next/link'


const url = Urls()
function page() {

    const [playing, setPlaying] = useState(false)
    const [videos, setVideos] = useState([])
    const [currentVideo, setCurrentPlayingVideo] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchLoading, setfetchLoading] = useState(true)


    const authData = useSelector(state => state.reducer.authreducer)
    const logged_in = authData.logged_in

    useEffect(() => {
        fetch(url.videos, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log('videos', data.data)
                if (data.status === 'success') {
                    setVideos(data.data)
                    setfetchLoading(false)

                }else{
                    setVideos(data.data)
                    setfetchLoading(false)
                }
            }
            )
    }, [])

    const setCurrentVideo = (val) => {
        document.getElementById('my_modal_3').showModal();
        setLoading(true)
        console.log(val.id)
        fetch(`${url.videos}/${val.id}`, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => {
                console.log(data.data)
                setCurrentPlayingVideo(data.data)

                setPlaying(true)
                setLoading(false)




            }
            )
    }
    console.log(currentVideo)
    return (
        <>
            <Hero>
                <div className='bg-[#101720] min-h-[100vh] flex flex-col justify-center items-center'>
                    {fetchLoading ?
                        <span className="loading loading-bars text-white loading-lg"></span>

                        :

                (videos.length==0?

                    <p className=' text-[35px] text-white font-semibold'>🤭oops no content yet</p>

                    :
              
                    <div className='bg-[#101720] w-[100%] p-8 grid gap-4 lg:grid-cols-3 min-h-[100vh] md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1'>


                        {
                            videos.map((val) => {
                                 return(<div className="card card-compact cursor-pointer w-[100%] lg:h-[70vh] md:h-[70vh] sm:h-[70vh] max-sm:h-[70vh] p-4 shadow-xl bg-[#0B1215] text-white " onClick={(e) => { e.preventDefault(); setCurrentVideo(val); }}>
                                    <figure className='h-[70%]'><ReactPlayer url={val.video_meta.url} width={'100%'} height={'100%'} className='mt-0' muted /></figure>
                                    {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}

                                    <div className="card-body">
                                        <h2 className="card-title">{val.name}</h2>
                                        <p>{val.description}</p>

                                    </div>
                                </div>)
                            })
                        }



                    </div>
               
                   
                    
                    )
                    
                }
                    {logged_in && authData.is_admin ?
                        <Link href={`/videos/create`} >
                            <button className="btn bg-gray-500 outline-none border-none">Add Video</button>

                        </Link>

                        :
                        ''
                    }

                </div>
            </Hero>

            <dialog id="my_modal_3" className="modal z-[1000]">
                <div className="modal-box w-11/12 max-w-5xl h-[70vh] flex justify-center items-center bg-[#0B1215]  ">
                    <form method="dialog" onClick={() => setPlaying(false)}>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                    </form>

                    {loading ?

                        <span className="loading loading-ring loading-lg text-white"></span>

                        :

                        <ReactPlayer url={currentVideo.video_url} width={'90%'} height={'100%'} className='mt-0' playing={playing} controls />

                    }



                </div>

                <form method="dialog" className="modal-backdrop" onClick={() => setPlaying(false)}>
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default page