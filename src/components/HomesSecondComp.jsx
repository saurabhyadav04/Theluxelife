import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, ShieldCheck , Users} from 'lucide-react';

function LuxeLife({ mainImage }) {
  const navigate = useNavigate();

  return (
    <div className="relative h-[450px] flex flex-col font-sans text-white overflow-hidden">
      
      {/* Background Layer - Deep Blue/Navy Base */}
      <div 
        className="absolute inset-0 z-0 bg-[#0f172a]"
        style={{
          // Ye gradient poore page ko ek deep navy aura deta hai
          background: `radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)`
        }}
      />

      {/* Hero Image Layer with Blending */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat opacity-100 mix-blend-overlay"
        style={{ 
          backgroundImage: `url(${mainImage})`,
        }}
      />

      {/* Gradient Overlay for Text Readability (Deep Blue Shades) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/80 via-transparent to-[#0f172a]" />

      {/* Main Content Content - Relative to stay above background layers */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl animate-fadeIn">
          {/* Tagline */}
        <div className=" p-4 rounded-full flex justify-center align-center">
            <Users size={36} className="text-[#c19a6b]" strokeWidth={1.5} />
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-[45px] mb-8 leading-[1.05] font-medium tracking-tight" 
              style={{ fontFamily: "'Playfair Display', serif" }}>
            Corporate Gifting Solutions
 
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-[19px] font-light mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed tracking-wide">
          Need 20+ premium gift hampers? We offer customised corporate gifting <br className="hidden md:block" /> 
            with bulk pricing, branded packaging, and dedicated account management.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary Gold Button */}
            <button 
              onClick={() => navigate('/contact')}
              className="bg-[#c19a6b] hover:bg-[#a6835a] text-white px-12 py-4 rounded-sm transition-all duration-300 flex items-center gap-3 text-sm font-bold tracking-[0.1em] min-w-[240px] justify-center shadow-lg"
            >
              Get a Quote <span className="text-xl">→</span>
            </button>
            
            
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default LuxeLife;