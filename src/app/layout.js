
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
// import { Provider } from "react-redux";
import { Providers } from "@/components/provider";
import { store, Persistor } from "@/store/store";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import { PersistGate } from "redux-persist/integration/react";
import Persist from "./persist";
// import { Head } from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
// import '../../public/static/charting_library/datafeeds/udf/dist/bundle' 


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EZRFX",
  description: "Trading Broker",

};
// const udf_lib=dynamic(()=> import('../../public/static/charting_library/datafeeds/udf/dist/bundle'),{
//   ssr:false
// })
// console.log(udf_lib)

export default function RootLayout({ children }) {


  return (




    <html lang="en">
      <head>
      <Script src="/static/charting_library/charting_library/" />


      </head>
      
      <body className={inter.className}>

        <Providers store={store}>
          <Persist>
            <SkeletonTheme baseColor='gray' highlightColor='black' >


              {children}
            </SkeletonTheme>


          </Persist>
        </Providers>

      </body>
    </html>






  );
}
