import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, ShieldCheck } from 'lucide-react';

function HomeFirstComp() {
  return (
    <div>
       {/* Bottom Trust Bar */}
      <div className="relative z-10 bg-[#070b14] py-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 text-[11px] uppercase tracking-[0.2em] text-white ">
          <div className="flex items-center gap-3">
            <CheckCircle size={16} className="text-white" />
            Hand-Checked Quality
          </div>
          <div className="flex items-center gap-3">
            <Package size={16} className="text-white" />
            Premium Packaging
          </div>
          <div className="flex items-center gap-3">
            <Truck size={16} className="text-white" />
            Pan-India Delivery
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-white" />
            Secure Payments
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeFirstComp
