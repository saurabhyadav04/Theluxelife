import React from 'react'

function ReturnsandRefund() {
  return (
    <div className="mx-auto max-w-7xl py-20 mt-5">
      <div className="px-5 text-center bg-white text-[#5B3A1A]">
        <h2 class="font-heading mb-4 font-bold tracking-tight text-[#5B3A1A]  text-3xl sm:text-4xl"  style={{ fontFamily: "'Playfair Display', serif" }}>Refund policy</h2>
            <p className="text-center text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A] mb-[5px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                You understand and acknowledge that all sales are final and non-refundable.
            </p>
            <p className="text-center text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A] mb-[20px]" style={{ fontFamily: "'Lato', sans-serif" }}>
                If your order arrives and you’re not satisfied, please contact us within 24 hours and we will work with you to make sure you are completely satisfied.  
            </p>
        <div className="text-left text-[18px]  leading-snug font-normal tracking-wide space-y-2" style={{ fontFamily: "'Lato', sans-serif" }}>
          <h3 className="font-bold mt-6 text-xl">Damages</h3>
          <p className="text-[18px]  leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[10px]" style={{ fontFamily: "'Lato', sans-serif" }}>
            We must receive notification of damaged products within 24 hours of delivery. For products damaged during shipping, please keep all original packing material 
            for courier inspection in order to file a claim with our shipper. We require an image of the damage to be emailed to us at luxelife.gifting@gmail.com for our review.   
          </p>
        </div>
      </div>
    </div>
  )
}

export default ReturnsandRefund
