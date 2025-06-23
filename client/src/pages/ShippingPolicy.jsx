import React from 'react'

function ShippingPolicy() {
  return (
    <div className="mx-auto max-w-7xl py-20 mt-5">
      <div className="px-5 text-center bg-white text-[#5B3A1A]">
        <h2 class="font-heading mb-4 font-bold tracking-tight text-[#5B3A1A]  text-3xl sm:text-4xl"  style={{ fontFamily: "'Playfair Display', serif" }}>Shipping policy</h2>
            <p className="text-center text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A] mb-[5px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                We offer free Standard shipping across India, please allow 4-6 days for shipping, this does not include our processing time of 1-2 business days.
                  For expedited shipping additional shipping charges are applicable
            </p>
            <p className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A] mb-[20px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                Shipping rates apply for all Custom orders.
            </p>
        <div className="text-left text-[18px]  leading-snug font-normal tracking-wide space-y-2" style={{ fontFamily: "'Lato', sans-serif" }}>
           <h3 className="font-bold mt-6 text-xl">Shipping within India</h3>
          <ul className="list-disc ml-6">
            <li  className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>The LuxeLife ships within India via
                 the online shop. It is your responsibility to provide correct shipping/delivery information.  Accurate and complete information is required to avoid additional fees as well 
                 as delays in your order.  Be sure to include accurate shipping information including full name,
                 street address, apartment #, house #, zip code, etc. If possible include recipients telephone number as well as your day-time telephone number.  </li>
            <li  className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>We may share with government 
                agencies or fraud prevention teams when:
              You acknowledge that shipping and delivery schedules are estimates only and cannot be guaranteed. The LuxeLife is not liable for any delays in shipments. Title and risk of loss 
              and damages pass on to You upon product(s) delivery or service rendered to You.
            </li>
            <li  className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>We may share with government 
               If an item is returned to us due to incorrect shipping address or recipient refusal, we will charge a re-delivery fee. If an item is forwarded by a carrier due to incorrect
                shipping information, an address correction fee is charged to us and in turn will be charged to you.
            </li>
             <li  className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                We cannot provide a refund on delivery or shipping charges. We are not responsible for packages unclaimed from carriers. If packages are returned to us because they were 
                unclaimed, we can arrange to have the gift sent to 
                an alternate address for an additional shipping fee. We do not offer refunds because a package was not claimed by your recipient.
             </li>
          </ul>
           <h3 className="font-bold mt-6 text-xl">International Shipping</h3>
          <ul className="list-disc ml-6">
            <li  className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>The LuxeLife does not offer shipping to
                 any international locations at this time via the online shop. International shipping on bulk custom orders is done on a case by case basis. To inquire mail us at
                 luxelife.gifting@gmail.com.</li>
            
          </ul>
           <h3 className="font-bold mt-6 text-xl">Warm Weather Shipping</h3>
          <ul className="list-disc ml-6">
            <li  className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>Please note that ordering items subject 
                to melting is at your own risk. Quality upon
                 delivery of these items cannot be guaranteed by The LuxeLife. The LuxeLife will not issue refunds as a result of melting regardless of the time of year.  
                 </li>
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ShippingPolicy
