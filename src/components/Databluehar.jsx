import React, { useState } from 'react';
import blueharmoney from '../Images/BlueHarmony.png'

function Databluehar() {
  const [activeTab, setActiveTab] = useState('vision');
  return (
    <>
    <div className="bg-white text-[#344ea1] font-sans">
      <div className="max-w-6xl mx-auto px-4 py-5">
        <h1 className="text-center font-extrabold text-[50px] leading-tight mb-6">
          Who Should use<br />Blue Harmonya
        </h1>
        <ol className="list-decimal pl-5 mb-10 text-[22px] leading-snug">
          <li className="mb-2">People looking for healthy and glowing skin as butterfly pea flower extract can stimulate collagen production in skin.</li>
          <li className="mb-2">People looking for hair growth and making their hair thick. Butterfly pea extracts have anthocyanins, which are a type of flavonoid that promote better blood flow in the scalp and strengthens hair follicles, helping hair get stronger and thicker</li>
          <li className="mb-2">For those looking to sharpen their cognitive functions for better memory and promote mental clarity, the butterfly pea flower has been used for centuries in Ayurvedic medicine.</li>
          <li>This product is best suited for youth between 15 years to 25 years and 35 years to 45 years who want to have good skin, good hair, and sharp mental cognitive functions at a negligible cost with normal water.</li>
        </ol>

        <div className="border border-gray-300 rounded-t-md">
          <div className="flex border-b border-gray-300">
            <button
              onClick={() => setActiveTab('vision')}
              className={`font-bold text-[#344ea1] border border-gray-300 px-6 py-3 focus:outline-none cursor-pointer ${
                activeTab === 'vision' ?  '' : 'border-b-white bg-white'
              }`}
            >
              Vision
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`font-bold text-[#344ea1] border border-gray-300 px-6 py-3 focus:outline-none cursor-pointer ${
                activeTab === 'mission' ?  '' : 'border-b-white bg-white' 
              }`}
            >
              Mission
            </button>
          </div>
          <div className="p-5 border border-t-0 border-gray-300 text-[23px] leading-relaxed">
            {activeTab === 'vision' && (
              <div>
                Transform Your water to therapeutic water for good skin, healthy hair, and sharp mental functions.
              </div>
            )}
            {activeTab === 'mission' && (
              <div>
                Our mission is to provide natural, effective, and affordable solutions that enhance your skin, hair, and cognitive health through the power of butterfly pea flower extract.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="bg-[#dbe2f1] font-['Roboto'] text-[#1f3c88] py-10">
      <div className="max-w-5xl mx-auto border border-[#1f3c88] rounded-md p-6 md:p-8 bg-[#dbe2f1]">
        <div className="text-center">
          <img
            src={blueharmoney}
            alt="Blue Harmony Infused Water Dip Bag with blue and orange colors and butterfly pea flower image"
            className="w-[220px] h-auto mx-auto"
          />
        </div>

        <h1 className="font-bold text-[40px] mt-4 mb-2 text-center">Blue Harmony</h1>

        <p className="text-[22px] font-normal leading-relaxed mb-6 text-center">
          The Blue Harmony Infused Water Dip Bag is made with dried butterfly pea flower (Aparajita) and a blend of herbs like fennel, cinnamon, clove, cumin, ginger, and chia. Aparajita gives the water its signature blue hue and is known in Ayurveda for boosting memory, brain health, and reducing anxiety. Rich in antioxidants, these herbs aid detoxification, control blood sugar, improve digestion, boost metabolism, and support overall wellness. Ajwain and cumin further enhance digestion, while cinnamon soothes gastrointestinal issues.
        </p>

        <section
          aria-label="Ingredients and benefits"
          className="flex flex-col md:flex-row gap-5 text-[20px] font-bold"
        >
          <div className="flex-1">
            <strong className="block text-[20px] mb-2">Ingredients</strong>
            <ul className="list-disc list-inside">
              <li className="mb-1">Saunf (Fennel Seeds)</li>
              <li className="mb-1">Mint (Pudina)</li>
              <li className="mb-1">Cinnamon</li>
              <li className="mb-1">Ginger</li>
            </ul>
          </div>

          <div className="flex-2 md:border-l md:pl-4 border-[#1f3c88] leading-relaxed">
            These natural ingredients improve cognitive function, immune system support, skin health, heart protection, digestive health, and reproductive health.
          </div>
        </section>
         <div className='flex items-center justify-center'>
          <a href="/products/drinks/681720cbd477b654b3202120">
            <button
            type="button"
            aria-label="Shop Now"
            className="mt-6 bg-[#3a4a9f] text-white text-[20px] py-2 px-4 rounded cursor-pointer"
            >
            Shop Now
            </button>
            </a>
        </div>   
      </div>
    </div>
</>
  );
}

export default Databluehar;
