import React from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

function Footer() {
  return (
   <>
    <footer className="bg-[#c9bbac] text-[#1c1c1c] py-8 px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-10" >
      
      {/* About Us */}
      <div>
        <h3 className="font-semibold text-[20px] mb-2"style={{ fontFamily: "'Lato', sans-serif" }} >About Us</h3>
        <p className="text-[15px] leading-relaxed"style={{ fontFamily: "'Lato', sans-serif" }}>
          <span className="font-semibold" >THE LUXELIFE</span> | We are a brand that celebrates people and moments through thoughtful gifts that have a unique story to tell. Shop curated personal or corporate gifts to your friends & family for your special occasion through one of the best gifting sites in India. Also build customized corporate or personal gift for your special event through our custom design service.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaPinterestP /></a>
        </div>
      </div>

      {/* Customer Service */}
      <div>
          <h3 className="font-semibold text-[20px] mb-2 px-0 sm:px-20" style={{ fontFamily: "'Lato', sans-serif" }}>Customer Service</h3>
          <ul className="space-y-2 text-[15px] px-0 sm:px-20">
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="/">Search</a></li>
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="/faqs">FAQs</a></li>
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="/terms-conditions">Terms & Conditions</a></li>
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="/privacy-policy">Privacy Policy</a></li>
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="/return-refund">Refund policy</a></li>
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="#">Blog</a></li>
            <li className="transition duration-200 transform hover:scale-105" style={{ fontFamily: "'Lato', sans-serif" }}><a href="/shipping-policy">Shipping Policy</a></li>
          </ul>
        </div>


      {/* Subscribe */}
      <div>
        <h3 className="font-semibold text-[20px] mb-2" style={{ fontFamily: "'Lato', sans-serif" }}>Join Our World</h3>
        <p className="text-[15px] mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>Unique Gifts Update And TM Happenings Straight to Your Inbox.</p>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full border border-white px-4 py-2 text-[15px] mb-3"
        />
        <button className="bg-[#c9a789] text-white px-6 py-2 text-[15px] tracking-wider" style={{ fontFamily: "'Lato', sans-serif" }} >
          SUBSCRIBE
        </button>
      </div>
      
 

    </footer>
        {/* Bottom Credit Line */}
          <div className="bg-[#c9bbac] text-[#1c1c1c] w-full pb-5 text-center text-[17px]" style={{ fontFamily: "'Lato', sans-serif" }}>
            Design and Developed by <a href="https://trikunmarketing.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Trikun Marketing</a>
          </div>
          </>
  );
}

export default Footer;
