"use client"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Hero from "./hero";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import Vara from "vara";
import Footer from "@/components/footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactPlayer from 'react-player'
// import Typed from "typed.js";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "@/components/headernav";
import img25 from '../../assets/img25.png'
import img20 from '../../assets/img20.png'
import img27 from '../../assets/img27.png'




// import required modules
import { Autoplay, Pagination, Navigation,EffectFade} from 'swiper/modules';





export default function Home() {

  const authData = useSelector(state => state.reducer.authreducer)
  console.log(authData)
  const header_ref = useRef()
  const svg_ref = useRef()
  const img3_ref = useRef()
  const img10_ref = useRef()
  const img12_ref = useRef()
  const img20_ref = useRef()
  const section_4_ref = useRef()
  const section_3_ref = useRef()
  const img20_ref_holder = useRef()
  const feature_holder = useRef()
  const feature_holder_img = useRef()
  const anime_ref_holder = useRef()
  const anime_ref = useRef()


  const bg_images = ['/img21.png', '/img22.png', '/img23.png']


  var count = 0
  function BackgroundChange() {

    count++
    if (count == bg_images.length) {
      count = 0

    }




    console.log(count)


    document.getElementById('bg_header').style.backgroundImage = `url(${bg_images[count]})`

  }







  setInterval(BackgroundChange, 8000)




  useLayoutEffect(() => {
    ScrollTrigger.normalizeScroll(true)

    if (authData.logged_in) {
      redirect('/dashboard')
    }

  }, [])
  gsap.registerPlugin(ScrollTrigger)


  useGSAP(() => {



    gsap.from(svg_ref.current, {
      opacity: 0,
      delay: .8,
      ease: "expo.in",
    })

    gsap.from(img3_ref.current, {
      y: 10,
      opacity: 0,
      delay: 1.2
    })

    gsap.from(feature_holder_img.current, {
      scrollTrigger: {
        trigger: feature_holder_img.current,
        start: '-40%top top',
        // end: 'top top',
        // markers:true,

      },
      y: -50,
      delay: 0.2,
      duration: 0.2,
      opacity: 0,
    })


    gsap.from(feature_holder.current, {
      scrollTrigger: {
        trigger: feature_holder.current,
        start: '-50%top top',
        // end: 'top top',
        // markers:true,

      },
      y: 50,
      delay: 0.2,
      duration: 0.2,
      opacity: 0,
    })

    gsap.from(img10_ref.current, {
      scrollTrigger: {
        trigger: img10_ref.current,
        start: '-70%top top',
        // end: 'top top',
        // markers: true,

      },
      x: 30,
      delay: 0.2,
      duration: 0.2,
      opacity: 0,
    })

    gsap.from(section_3_ref.current, {
      scrollTrigger: {
        trigger: section_3_ref.current,
        start: '-50%top top',
        // end: 'top top',
        // markers: true,

      },
      x: -30,
      delay: 0.2,
      duration: 0.2,

      opacity: 0,
    })

    gsap.from(img20_ref.current, {
      scrollTrigger: {
        trigger: img20_ref_holder.current,
        start: '-45%top top',
        // end: 'top top',
        // markers: true,

      },
      x: -30,
      delay: 0.21,
      duration: 0.2,
      opacity: 0,
      ease: 'elastic.in'
    })

    gsap.from(img20_ref_holder.current, {
      scrollTrigger: {
        trigger: img20_ref_holder.current,
        start: '-70%top top',
        // end: 'top top',
        // markers: true,

      },
      x: -30,
      delay: 0.2,
      duration: 0.2,
      opacity: 0,
    })

    gsap.from(section_4_ref.current, {
      scrollTrigger: {
        trigger: section_4_ref.current,
        start: '-170%top top',
        // end: 'top top',
        // markers: true,

      },
      x: -30,
      delay: 0.2,
      duration: 0.2,

      opacity: 0,
    })

    gsap.from(img12_ref.current, {
      scrollTrigger: {
        trigger: img12_ref.current,
        start: '90%top top',
        end: '+=800',
        // markers: true,

      },
      y: 10,
      delay: 0.2,
      duration: 1.2,
      // rotateY: '360deg',
      opacity: 0,
      scale: 0.5,

    })
    const anime_refs = gsap.utils.toArray('.anime_ref')
    const animeTl = gsap.timeline();
    // animeTl.to(anime_refs[0], { xPercent: -100, opacity: 1, duration: 4 })
    // animeTl.to(anime_refs[1], { xPercent: -200, opacity: 1, duration: 4 })
    // animeTl.to(anime_refs[2], { xPercent: -300, opacity: 1, duration: 4 })
    // ScrollTrigger.create({

    //   animation: animeTl,
    //   trigger: anime_ref_holder.current,
    //   markers: true,
    //   start: "50%top center",
    //   end: '+=500',
    //   scrub: true,
    //   pin: "main",
    //   pinSpacing: false,
    //   // toggleActions:'restart pause reverse pause',
    // })


    gsap.to(anime_refs, {
      scrollTrigger: {
        trigger: anime_ref_holder.current,
        // markers:true,
        start: "50%top center",
        end: '+=800',
        scrub: 1,
        pin: 'main',
        // snap:1/(anime_refs.length-1)
        // toggleActions:'restart pause reverse pause',
      },
      xPercent: -100 * (anime_refs.length - 1),
      duration: 10,
      ease: 'none',
      delay: 6,
      // opacity:0
    })


    const intro_videos = gsap.utils.toArray('.intro_video')
    gsap.from(intro_videos[0], {
      scrollTrigger: {
        trigger: anime_refs[1],
        // markers:true,
        start: "10%left left",
        end: '40%right left',
        scrub: 3,
        // pin:'main',
        // snap:1,
        // toggleActions:'restart pause reverse pause',
      },
      xPercent: -50,
      duration: 0.2,
      ease: 'none',
      delay: 0.1,
      opacity: 0
    })


    gsap.from(intro_videos[1], {
      scrollTrigger: {
        trigger: anime_refs[2],
        // markers:true,
        start: "80%left left",
        end: '0%right left',
        scrub: 3,
        // pin:'main',
        // snap:1,
        // toggleActions:'restart pause reverse pause',
      },
      xPercent: -50,
      duration: 0.2,
      ease: 'none',
      delay: 0.1,
      opacity: 0
    })


  })

  useLayoutEffect(() => {
    // INTERSECTION OBSERVER


    var video_1 = document.getElementById('video_1')
    var video_2 = document.getElementById('video_2')
    let autoplayVideo = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // entry.target.children[0].muted=false
          //  console.log(entry.target)
          //  entry.target.children[0].play()
          entry.target.children[0].pause()

        }
        //  else{
        //   console.log(entry.target)
        //   entry.target.children[0].pause()
        //  }
      })
    })

    autoplayVideo.observe(video_1)
    autoplayVideo.observe(video_2)

  })








  return (
    <>

      <main className="relative min-h-[100vh] w-[100%] overflow-hidden">
        <Navbar />
        <header id="bg_header" className="header  relative w-[100%] h-[120vh] flex lg:flex-row md:flex-row sm:flex-col max-sm:flex-col justify-center items-center  "   >
        <section className="h-full absolute top-0 z-50 left-0 max-lg:w-[100%] lg:w-[100%] max-md:w-[40%] md:w-[100%] sm:w-[100%] max-sm:w-[100%] text-white flex flex-col justify-center lg:p-[5%] md:p-[10%] header_caption "  >

        <div className="p-2 lg:w-[55%]  md:w-[100%] sm:w-[100%] max-sm:w-[100%] h-[100%] flex flex-col justify-center  ">
              <p className="text-white p-[0%] lg:text-[60px] md:text-[50px] sm:text-[50px] max-sm:text-[35px]  lg:text-left md:text-center sm:text-center max-sm:text-center">Profitable Trading,Your Trading Ally</p>
              <ReactTyped
                // startWhenVisible
                className=" lg:text-[20px] md:text-[25px] sm:text-[18px] max-sm:text-[18px] max-sm:text-center font-[400] text-white lg:text-left md:text-center sm:text-center"
                id="header_text"
                strings={[
                  "<p>Transform Your Trading Experience<span className=text-white font-[700]> Simplicity Meets Success!</span> </p>",
                  "<p>Join the fastest growing global trading platform</p>",
                  "<p>Stay Ahead of the Market with Our Cutting-Edge Trading Signals.</p>",
                ]}
                typeSpeed={40}
                startDelay={1000}
                backDelay={500}
                backSpeed={40}
                smartBackspace={true}
                loop={true}
                cursorChar=" "
              />

            </div>
        
        </section>
          <Swiper
            spaceBetween={10}
            effect={'fade'}
         
            loop={true}

            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            
            modules={[EffectFade,Autoplay]}
            className="mySwiper"
          >

            <SwiperSlide>

            </SwiperSlide>

            <SwiperSlide>

            </SwiperSlide>

            <SwiperSlide>

            </SwiperSlide>

           
          </Swiper>








          {/* <section className="h-[70%] lg:w-[50%] md:w-[100%] sm:w-[60%]  relative">
              <svg ref={svg_ref} id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="md:hidden lg:block sm:hidden">                   <defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" stop-color="rgba(212.951, 212.951, 212.951, 1)" offset="0%"></stop>                            <stop id="stop2" stop-color="rgba(237.995, 235.936, 232.537, 1)" offset="100%"></stop>                        </linearGradient>                    </defs>                <path fill="url(#sw-gradient)" d="M28,-32.5C35.8,-26.9,41.1,-17.5,42.9,-7.6C44.6,2.4,42.8,13.1,37.9,22.1C32.9,31.2,24.9,38.6,16.7,38.4C8.5,38.3,0.1,30.4,-9.8,26.8C-19.7,23.2,-31.1,23.9,-35.4,19.2C-39.6,14.4,-36.6,4.2,-32.4,-3.3C-28.2,-10.9,-22.8,-15.8,-17.2,-21.8C-11.6,-27.9,-5.8,-34.9,2.2,-37.5C10.1,-40.1,20.3,-38.2,28,-32.5Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style={{ transition: ' all 0.3s ease 0s;' }} stroke="url(#sw-gradient)"></path>              </svg>
              <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">                    <defs>                         <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">                            <stop id="stop1" stop-color="rgba(212.951, 212.951, 212.951, 1)" offset="0%"></stop>                            <stop id="stop2" stop-color="rgba(237.995, 235.936, 232.537, 1)" offset="100%"></stop>                        </linearGradient>                    </defs>                <path fill="url(#sw-gradient)" d="M23.5,-24.7C29.6,-22.9,33.1,-14.7,32.7,-7.2C32.3,0.3,28,7,22.9,10.6C17.7,14.2,11.6,14.6,4.9,19.7C-1.7,24.9,-9,34.7,-16.4,35.9C-23.8,37.2,-31.4,29.8,-34.2,21.5C-36.9,13.1,-34.9,3.7,-29.7,-1.7C-24.5,-7,-16.2,-8.2,-10.8,-10.1C-5.3,-12,-2.6,-14.6,3,-18.2C8.7,-21.8,17.4,-26.5,23.5,-24.7Z" width="100%" height="100%" transform="translate(50 50)" stroke-width="0" style={{ transition: 'all 0.3s ease 0s;' }} stroke="url(#sw-gradient)"></path>              </svg>

              <Image src={require('../../assets/img3.png')} ref={img3_ref} className="w-[80%] absolute top-[0%] lg:h-[70%] md:h-[80%] lg:right-[20%] md:right-0 sm:h-[80%]" />

              
            
             
            </section> */}






        </header>


        <section className=" w-[100%] relative lg:min-h-[120vh] md:h-[90vh] sm:h-[190vh]  flex lg:flex-row md:flex-row sm:flex-col  max-sm:flex-col  bg-[#0B1215]  p-[10%] gap-0 justify-center items-center text-white">
          <div className=" z-[105] rounded-md lg:min-h-[100%] md:h-[100%] sm:h-[100%] w-[100%] max-sm:w-[100%] sm:w-[70%]  max-sm:mb-[15%] flex justify-left items-center p-0 max-sm:text-center lg:text-left md:text-left sm:text-left " ref={feature_holder_img}>

            {/* <Image src={require('../../assets/img16.webp')} className="w-[100%] " /> */}

            <p className="lg:text-[45px] sm:text-[30px] max-sm:text-[30px] md:text-[35px] md:text-left sm:text-center max-sm:text-center"> Discover the art of forex trading with us</p>
          </div>


          <div ref={feature_holder} className="  w-[100%] relative lg:min-h-[100%] md:h-[100%] sm:h-[100%] grid  lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1   gap-2 justify-center items-center text-white"   >


            <div className="feature p-[5%] rounded-md lg:h-[100%] md:h-[100%] sm:h-[100%] w-[100%]   " >
              <FontAwesomeIcon icon={faGlobeAfrica} className='feature_icon text-[30px] max-sm:text-[20px]' />
              <div className="desc">
                <p className="text-[25px] max-sm:text-[20px] sm:text-[20px] lg:text-[20px] font-bold">Prompt Trading Signals.</p>
                <p className="text-[15px] max-sm:text-[12px] sm:text-[12px]  lg:text-[15px] font-light "> We specialize in delivering timely and accurate market insights to empower traders to make informed decisions and capitalize on opportunities.</p>
              </div>
            </div>



            <div className="feature p-[5%] rounded-md lg:h-[100%] md:h-[100%] sm:h-[100%] w-[100%]    " >
              <FontAwesomeIcon icon={faGlobeAfrica} className='feature_icon text-[30px] max-sm:text-[20px]' />
              <div className="desc">
                <p className="text-[25px] max-sm:text-[20px] sm:text-[20px] lg:text-[20px] font-bold">Education and Support.</p>
                <p className="text-[15px] max-sm:text-[12px] sm:text-[12px]  lg:text-[15px] font-light "> Access a wealth of educational materials, including tutorials, webinars, and articles to improve your trading skills and knowledge.</p>
              </div>
            </div>

            <div className="feature p-[5%] rounded-md lg:h-[100%] md:h-[100%] sm:h-[100%] w-[100%]    " >
              <FontAwesomeIcon icon={faGlobeAfrica} className='feature_icon text-[30px] max-sm:text-[20px]' />
              <div className="desc">
                <p className="text-[25px] max-sm:text-[20px] sm:text-[20px] lg:text-[20px] font-bold">User-Friendly Interface</p>
                <p className="text-[15px] max-sm:text-[12px] sm:text-[12px]  lg:text-[15px] font-light "> An intuitive and easy-to-navigate dashboard where you can view all your signals, historical data, and performance metrics.</p>
              </div>
            </div>


            <div className="feature p-[5%] rounded-md lg:h-[100%] md:h-[100%] sm:h-[100%] w-[100%]     " >
              <FontAwesomeIcon icon={faGlobeAfrica} className='feature_icon text-[30px] max-sm:text-[20px]' />
              <div className="desc">
                <p className="text-[25px] max-sm:text-[20px] sm:text-[20px] lg:text-[20px] font-bold">Flexible Subscription Plans</p>
                <p className="text-[15px] max-sm:text-[12px] sm:text-[12px]  lg:text-[15px] font-light ">Choose from a variety of subscription plans to suit your trading needs and budget. Monthly, quarterly, and annual plans are available.</p>
              </div>
            </div>




          </div>



        </section>



        <section className="section_1 relative w-[100%] lg:h-[100vh] md:h-[120vh] bg-[#101720] grid lg:grid-cols-2 md:grid-cols-2 max-sm:grid-cols-1 justify-center items-center text-white p-[6%]">

          <Image src={img25} className="lg:w-[80%] h-[100%] md:w-[90%] sm:w-[100%] " ref={img10_ref} />

          <div ref={section_3_ref} className="lg:mt-0 sm:mt-5 max-sm:mt-20 max-sm:row-start-1">
            <p className="lg:text-[40px] max-sm:text-[25px] md:text-[30px] sm:text-[30px]">Learn & Earn on the go</p><br />
            <p className=" lg:text-[18px] max-sm:text-[15px] font-extralight">Get ideas to follow trade on your device, stay connected and never miss an opportunity to make profit,
              with potential for substantial returns and accessibility to global markets,
              grasp key concepts such as currency pairs, pips, leverage, and margin to make informed trading decisions.</p>

            <br /><br />
            {/* <button className="btn bg-[#D8D8D8] border-none text-[#101720] w-[20%]">Explore</button> */}

          </div>





          <div class="wave1 z-50">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 0L0 0 598.97 114.72 1200 0z" class="shape-fill"></path>
            </svg>
          </div>

        </section>






        <section className="section_2 relative w-[100%] lg:min-h-[100vh] md:min-h-[120vh] gap-20 bg-[#101720] grid lg:grid-cols-2 md:grid-cols-2 justify-center items-center text-white p-[4%]">

          <div ref={section_4_ref} className="lg:mt-0 sm:mt-5 max-sm:mt-20">
            <p className="lg:text-[50px] max-sm:text-[25px] md:text-[30px] sm:text-[30px]">Your security is our priority
            </p><br />

            <p className=" lg:text-[18px] max-sm:text-[15px] font-extralight">At EZFRX, safeguarding your information isn't just a commitment; it's our foremost priority.
              We understand that in today's digital landscape, trust is paramount.
              That's why we've implemented rigorous measures to ensure the highest level of security across all facets of our operations.</p>



          </div>

          <div className="relative lg:bg-slate-100 max-sm:bg-transparent lg:w-[80%] h-[100vh] md:w-[100%] sm:w-[100%] " ref={img20_ref_holder}  >
            <Image src={img20} className="absolute top-[15%] lg:left-[-15%] md:left-[-15%] sm:left-[-15%] max-sm:left-0 lg:w-[100%] h-[100%] md:w-[100%] sm:w-[100%] " ref={img20_ref} />

          </div>





        </section>



        <section className="section w-[300%] h-[150vh]    bg-[#101720] justify-center items-center text-white p-[8%]" ref={anime_ref_holder}>


          <div className="flex flex-nowrap h-[100%] w-[90%]    ">



            <div className="anime_ref  flex flex-col justify-center items-center text-center w-[100%]  lg:p-28 md:p-28 sm:p-28 max-sm:p-4 " ref={anime_ref}   >

              <p className="lg:text-[120px] md:text-[100px] sm:text-[80px]  max-sm:text-[50px] max  text-center "><span>About Us</span></p>
              {/* <Image src={require('../../assets/image20.jpg')} className="w-[100%] h-[85%] mt-[0%] " /> */}
              {/* <p className=" absolute top-0 left-0 text-[15px] text-center font-extralight">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ipsa tempore facilis. Praesentium non corporis adipisci odit dicta quidem?</p> */}
            </div>


            <div className="anime_ref text-center lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%] max-sm:h-[80%] lg:p-28 md:p-28 sm:p-28 max-sm:p-4" ref={anime_ref} >
              <ReactPlayer id='video_1' url={'https://res.cloudinary.com/dtt4nxboi/video/upload/v1721056043/ezfrx1_p2dyx5.mp4'} width={'100%'} height={'100%'} className=' intro_video ' controls={true} />
              {/* <Image src={require('../../assets/image17.jpg')} className="w-[100%] h-[100%] mt-[0%] " />
                <p className="text-[50px] absolute top-[50%] text-center">What You Need To Know</p> */}
              {/* <p className=" text-[15px] font-extralight">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ipsa tempore facilis. Praesentium non corporis adipisci odit dicta quidem?</p> */}
            </div>


            <div className="anime_ref text-center lg:w-[100%] md:w-[100%] sm:w-[100%] max-sm:w-[100%] max-sm:h-[80%]  lg:p-28 md:p-28 sm:p-28 max-sm:p-4" ref={anime_ref} >
              <ReactPlayer id='video_2' url={'https://res.cloudinary.com/dtt4nxboi/video/upload/v1721056043/ezfrx1_p2dyx5.mp4'} width={'100%'} height={'100%'} className=' intro_video ' controls />

              {/* <Image src={require('../../assets/image17.jpg')} className="w-[100%] h-[100%] mt-[0%] intro_video" />
                <p className="text-[50px] absolute top-[50%] text-center">What You Need </p> */}
              {/* <p className=" text-[15px] font-extralight">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat ipsa tempore facilis. Praesentium non corporis adipisci odit dicta quidem?</p> */}
            </div>

          </div>


        </section>



        <section className="relative section w-[100%] lg:h-[150vh] md:h-[200vh] sm:h-[200vh] max-sm:h-[200vh]   bg-gray-200 grid lg:grid-cols-2 md:grid-cols-1 max-md:grid-cols-1 sm:grid-cols-1 justify-center items-center text-[#0B1215]  p-[5%]">
          <div class="wave2">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M1200 0L0 0 892.25 114.72 1200 0z" class="shape-fill"></path>
            </svg>
          </div>



          <div className=" text-[#101720] p-10 rounded-lg">
            <p className="lg:text-[50px] md:text-[40px] max-md:text-[40px] sm:text-[30px] max-sm:text-[30px]  text-[#101720] p-1 rounded-lg">Grow With Us.</p>
            <p className="lg:text-[20px] md:text-[20px] max-sm:text-[15px] font-extralight">
              Your financial goals are our primary focus. We invite you to embark on a journey of wealth creation and prosperity by investing with us. Whether you're an experienced investor or just starting out, our platform offers the tools, expertise, and opportunities you need to thrive in today's dynamic markets.
            </p>
          </div>


          <Image src={img27} className="lg:w-[100%] h-[60%] sm:w-[100%] max-sm:w-[100%] translate-y-0" ref={img12_ref} />


        </section>


        <Footer />

      </main>

    </>
  )
}
