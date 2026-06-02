import React from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Mail, Phone, Clock, MapPin, ShieldCheck, Truck } from 'lucide-react';
import logo from '../Images/Theluxlife-logo2.png';
function Footer() {
  return (
    <footer className="bg-[#1b2a4a] text-white overflow-hidden">
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto py-10 px-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Column 1: LuxeLife Brand */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
           
             <img src={logo} alt="" className='w-30 h-auto'/>
          </div>
          <p className="text-[16px] leading-relaxed text-gray-300 opacity-90 font-light" style={{ fontFamily: "'Lato', sans-serif" }}>
            Premium curated gift hampers for every occasion. Hand-checked quality, luxury packaging, delivered with care.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/luxelife_gifting/" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-[#c19a6b] transition-all duration-300">
              <FaInstagram size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-[#c19a6b] transition-all duration-300">
              <FaFacebookF size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-[#c19a6b] text-[13px] font-bold tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
            Quick Links
          </h3>
          <ul className="space-y-3 text-[16px] text-gray-300 font-normal">
            {["Products", "About Us", "Contact", "Blog"].map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer" style={{ fontFamily: "'Lato', sans-serif" }}>
                <a href={`/${item.toLowerCase().replace(" ", "-")}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Policies */}
        <div>
          <h3 className="text-[#c19a6b] text-[13px] font-bold tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
            Policies
          </h3>
          <ul className="space-y-3 text-[16px] text-gray-300 font-normal">
            {["Shipping Policy", "Return Refund", "Privacy Policy", "Terms Conditions"].map((item) => (
              <li key={item} className="hover:text-white transition-colors cursor-pointer" style={{ fontFamily: "'Lato', sans-serif" }}>
                <a href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Customer Support */}
        <div>
          <h3 className="text-[#c19a6b] text-[13px] font-bold tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Lato', sans-serif" }}>
            Customer Support
          </h3>
          <ul className="space-y-3 text-[16px] text-gray-300 font-normal">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#c19a6b]" strokeWidth={1.5} />
              <span style={{ fontFamily: "'Lato', sans-serif" }}>luxelife.gifting@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#c19a6b]" strokeWidth={1.5} />
              <span style={{ fontFamily: "'Lato', sans-serif" }}>+91 98159 23265</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="text-[#c19a6b]" strokeWidth={1.5} />
              <span style={{ fontFamily: "'Lato', sans-serif" }}>Mon-Sat, 10AM - 6PM IST</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-[#c19a6b]" strokeWidth={1.5} />
              <span style={{ fontFamily: "'Lato', sans-serif" }}>B35 A, Phase 5, Focal Point, Ludhiana 141010</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 py-6  px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[14px] text-gray-500 tracking-wider" style={{ fontFamily: "'Lato', sans-serif" }}>
          © 2025 LuxeLife Gifting. All rights reserved.
        </p>
        
        <div className="flex items-center gap-8 text-[14px] text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-gray-500" />
            <span style={{ fontFamily: "'Lato', sans-serif" }}>Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-gray-500" />
            <span style={{ fontFamily: "'Lato', sans-serif" }}>Pan-India Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;