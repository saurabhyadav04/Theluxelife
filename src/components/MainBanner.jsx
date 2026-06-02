import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, ShieldCheck } from 'lucide-react';

function LuxeLife({ mainImage }) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white overflow-hidden">
      
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
          <span className="block text-[13px] md:text-[14px] uppercase tracking-[0.5em] mb-6 text-[#c19a6b] font-bold">
            Curated With Care
          </span>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-[75px] mb-8 leading-[1.05] font-medium tracking-tight" 
              style={{ fontFamily: "'Playfair Display', serif" }}>
            The Art of Thoughtful <br className="hidden md:block" /> Gifting
          </h1>
          
          {/* Description */}
          <p className="text-base md:text-[19px] font-light mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed tracking-wide">
            Premium curated gift hampers for every occasion — hand-checked, <br className="hidden md:block" /> 
            beautifully packaged, delivered to your doorstep across India.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary Gold Button */}
            <button 
              onClick={() => navigate('/products')}
              className="bg-[#c19a6b] hover:bg-[#a6835a] text-white px-12 py-4 rounded-sm transition-all duration-300 flex items-center gap-3 text-[16px] tracking-[0.1em] min-w-[240px] justify-center shadow-lg"
            >
              Shop Collection <span className="text-xl">→</span>
            </button>
            
            {/* Secondary Cream Button */}
            <button 
              onClick={() => navigate('/products/corporate')}
              className="bg-[#fdfbf7] hover:bg-white text-[#c19a6b] px-12 py-4 rounded-sm transition-all duration-300 text-[16px] tracking-[0.1em] min-w-[240px] shadow-md"
            >
              Corporate Gifting
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default LuxeLife;