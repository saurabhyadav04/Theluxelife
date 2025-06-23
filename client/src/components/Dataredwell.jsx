import React, { useState } from 'react';
import Redwellness from '../Images/RedWellnesspack.png'

function Dataredwell() {
    const [activeTab, setActiveTab] = useState('vision');
  return (
        <>
            <div className="bg-white text-[#d61a1a] font-sans">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <h1 className="text-center font-extrabold text-[50px] leading-tight mb-6">
              Who Should use<br />Red Wellness
            </h1>
            <ol className="list-decimal pl-5 mb-10 text-[22px] leading-snug">
              <li className="mb-2">People looking for cooling their body in summers and immunity booster.</li>
              <li className="mb-2">People looking for to have good body immunity and prevent various diseases.</li>
              <li className="mb-2">People looking to purify blood and enable control of sugar or diabetes.</li>
              <li className="mb-2">Anyone looking for general wellness and immunity can use this water especially in summers.</li>
            </ol>
    
            <div className="border border-gray-300 rounded-t-md">
              <div className="flex border-b border-gray-300">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`font-bold text-[#d61a1a] border border-gray-300 px-6 py-3 focus:outline-none cursor-pointer ${
                    activeTab === 'vision' ?  '' : 'border-b-white bg-white'
                  }`}
                >
                  Vision
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`font-bold text-[#d61a1a] border border-gray-300 px-6 py-3 focus:outline-none cursor-pointer ${
                    activeTab === 'mission' ?  '' : 'border-b-white bg-white' 
                  }`}
                >
                  Mission
                </button>
              </div>
              <div className="p-5 border border-t-0 border-gray-300 text-[23px] leading-relaxed">
                {activeTab === 'vision' && (
                  <div>
                    Transform Your water to therapeutic water to therapeutic red water from Kerala.
                  </div>
                )}
                {activeTab === 'mission' && (
                  <div>
                    Put Daily Waters dip bag in cold water in a bottle or domestic filter and keep it for 6-8 hours and consume.
                    If you like it warm, then use the Daily Waters dip bag in hot/warm water and drink like hot morning Green tea or Spice tea.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#dbe2f1] font-['Roboto'] text-[#d61a1a] py-10">
          <div className="max-w-5xl mx-auto border border-[#d61a1a] rounded-md p-6 md:p-8 bg-[#dbe2f1]">
            <div className="text-center">
              <img
                src={Redwellness}
                alt="Blue Harmony Infused Water Dip Bag with blue and orange colors and butterfly pea flower image"
                className="w-[220px] h-auto mx-auto"
              />
            </div>
    
            <h1 className="font-bold text-[40px] mt-4 mb-2 text-center">Red Wellness</h1>
    
            <p className="text-[22px] font-normal leading-relaxed mb-6 text-center">This Ayurvedic red water purifies the blood, improves digestion, and helps cool the body while imparting a beautiful pink-reddish hue and an exotic aroma. The Red Wellness herbal mix provides medicinal benefits and boosts overall health.</p>
    
            <section
      aria-label="Ingredients and benefits"
      className="flex flex-col md:flex-row gap-5 text-[20px] font-bold"
    >
              <div className="flex-1">
                <strong className="block text-[20px] mb-2">Ingredients</strong>
                <ul className="list-disc list-inside">
                  <li className="mb-1">Fenugreek Seeds</li>
                  <li className="mb-1">Ajwain</li>
                  <li className="mb-1">Clove</li>
                  <li className="mb-1">Ginger</li>
                </ul>
              </div>
    
              <div className="flex-2 md:border-l md:pl-4 border-[#d61a1a] leading-relaxed">
                These natural ingredients improve cognitive function, immune system support, skin health, heart protection, digestive health, and reproductive health.
              </div>
            </section>
             <div className='flex items-center justify-center'>
              <a href="/products/drinks/6817225cd477b654b3202140">
                <button
                type="button"
                aria-label="Shop Now"
                className="mt-6 bg-[#d61a1a] text-white text-[20px] py-2 px-4 rounded cursor-pointer"
                >
                Shop Now
                </button>
                </a>
            </div>   
          </div>
        </div>
    </>
  )
} 
export default Dataredwell;