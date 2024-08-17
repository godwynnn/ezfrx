import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocation, faLocationPin, faLocationArrow, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <section className="footer_section w-[100%] min-h-[150vh]  bg-[#0B1215] flex flex-col    text-white p-[8%]" >
      <hr />
      
      {/* <p className='text-[30px] text-left'>Our Policy</p> */}

      <div tabIndex={0} className="collapse t_c collapse-plus border border-base-300 bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Terms & Conditions
        </div>

        <div className="collapse-content ">





          <p>
            Online Membership Agreement
            <br />


            Welcome to EZFRX! This Agreement is between you ("you" or "your") and EZFRX for the supply of products or services accessed on www.ezfrx.com and related sites. It includes free trials and/or Subscription-based services. This Agreement is effective upon confirmation of your Membership and receipt of your initial Subscription fees (“Effective Date”). We may require certified or notarized identity documents at any time and reserve the right to reject applications at our discretion. By accessing our site or applying for our services, you agree to these terms.
            <br />









            Membership Access
            <br />



            Upon payment of the Membership fees, you gain access to our products, services, and any associated software as described in these terms. We reserve all other rights.

            <br />











            Important Note on Arbitration
            <br />


            This Agreement includes a mandatory arbitration provision, waiving the right to sue in court or participate in class actions. Each party is required to resolve disputes through individual arbitration.

            <br />






            Updates to Terms and Conditions
            <br />



            We may update these terms from time to time. Changes will be communicated through the site or your member portal. Your continued use after updates indicates acceptance of the revised terms.
            <br />








            Products and Services
            <br />




            We offer educational products and services for learning and discussing trading strategies. These are solely for educational purposes and not personalized. Our services are intended for those above the age of majority and not suitable for minors. We may terminate Membership for minors.

            Our services do not facilitate online trading in securities, currency, or other financial products. We do not provide personalized investment advice or access to trading platforms.
            <br />





            Subscription Fees
            <br />





            You authorize us to charge the initial and recurring Subscription fees to your provided Payment Method. Ensure your Payment Method remains valid for uninterrupted access. Fees are based on the subscription plan you desire. We are not responsible for foreign exchange fees or rates.

            <br />






            Intellectual Property
            <br />



            All materials on the site are protected by copyrights, trademarks, and other intellectual property laws. You may access and use these materials for personal, non-commercial use only, maintaining all copyright and proprietary notices.
            <br />









            User Account, Comments, and Ideas
            <br />


            You are responsible for the accuracy of content you provide. Maintain the confidentiality of your account details. We are not liable for unauthorized account use. Sharing account details may result in Membership termination.
            <br />




            Limitation of Liability
            <br />




            To the fullest extent permitted by law, we are not liable for any direct, indirect, special, or incidental damages arising from your Membership or use of the site.

            <br />



            Indemnification
            <br />



            You agree to indemnify us against any liabilities, claims, damages, or expenses arising from your misuse of the site or breach of these terms.

            <br />





            Disputes & Arbitration; Applicable Law
            <br />



            All disputes will be resolved through arbitration on an individual basis, waiving rights to court or class actions.

            <br />







            Termination
            <br />




            This Agreement remains in effect until terminated by either party. You may cancel your Membership at any time. We may terminate immediately for non-compliance with these terms. Termination details are outlined in the full agreement.

            <br />







            General
            <br />




            This Agreement constitutes the entire agreement between you and us, superseding all prior agreements. These terms do not create any partnership, joint venture, or employment relationship. If any provision is unenforceable, it will be reformed to reflect the intent and the remaining terms will remain in effect.
            <br />








            Additional Terms and Programs
            <br />


            We may add additional terms for specific benefits or programs.

            By agreeing to these terms, you acknowledge that you have read, understood, and agree to comply with these terms and conditions.




          </p>

        </div>
      </div>






































      <br />

      <hr />

      <section className='flex lg:flex-row md:flex-row sm:flex-col max-sm:flex-col lg:gap-8 md:gap-6 sm:gap-4 max-sm:gap-4 h-[100vh] p-4 mt-[8%]'>
        <form className='text-white flex flex-col gap-10 lg:w-[50%] md:w-[50%] sm:w-[100%] max-sm:w-[100%] h-[100%]'>
          <label className="input input-bordered flex items-center gap-2 bg-transparent" style={{ borderBottom: '1px solid white' }} >
            Name
            <input type="text" className="grow bg-transparent border-none outline-none" placeholder="Daisy" />
          </label>




          <label className="input input-bordered flex items-center gap-2 bg-transparent" style={{ borderBottom: '1px solid white' }} >
            Email
            <input type="text" className="grow bg-transparent border-none outline-none" placeholder="daisy@site.com" />
          </label>

          <textarea placeholder="Bio" className="textarea resize-none textarea-bordered textarea-md w-[100%] max-w-xs bg-transparent" style={{ borderBottom: '1px solid white' }}  ></textarea>


          <button className="btn btn-wide btn-success text-white">Send</button>
        </form>






        <div className='lg:w-[50%] md:w-[50%] sm:w-[100%] max-sm:w-[100%] h-[100%]' >

          <div className='w-[100%] text-white flex flex-col gap-6'>
            {/* <a href=""><FontAwesomeIcon icon={faLocationPin} />  <span>15 Osapaul Street
              Thomas Estate Ajah
              Lagos
              Ajah
              Lagos , 106104
              NG</span></a> */}

            <a href=""><FontAwesomeIcon icon={faLocationPin} />  <span>Lagos</span></a>



            <a href=""><FontAwesomeIcon icon={faPhone} />   <span>+234 811 860 5145</span></a>
            <a href=""><FontAwesomeIcon icon={faEnvelope} />   <span>info@ezfrx.com</span></a>

            <div className='flex flex-row gap-2'>
              <a href="" className='social_icons'><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="" className='social_icons'><FontAwesomeIcon icon={faTwitter} /></a>

              <a href="https://www.instagram.com/ezfrx_live?utm_source=qr&igsh=MTg2cGEyYWVrdnNxYw==" target='_blank' className='social_icons'><FontAwesomeIcon icon={faInstagram} /></a>


            </div>


          </div>

        </div>

      </section>
      <hr />
      <p className='font-thin' id='contact_section'>© EZFRX All Right Reserved | <a href="https://www.tradingview.com/?utm_source=http%3A%2F%2Flocalhost%3A3000&utm_medium=library&utm_campaign=library" target='_blank'>TradingView</a></p>


    </section>

  )
}

export default Footer