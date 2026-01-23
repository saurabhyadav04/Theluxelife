import {useState} from 'react'
import GutWell from '../Images/GutWell.png'

function DataGutWell() {
     const [activeTab, setActiveTab] = useState('vision');
  return (
        <>
            <div className="bg-white text-[#3f5a0a] font-sans">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <h1 className="text-center font-extrabold text-[50px] leading-tight mb-6">
              Who Should use<br />Gut Well
            </h1>
            <ol className="list-decimal pl-5 mb-10 text-[22px] leading-snug">
              <li className="mb-2">Best solution for people living sedentary life-style as Office job, Shop owners, Car/vehicle drivers etc.</li>
              <li className="mb-2">People suffering from Digestion issues like bloating, gas, acidity issues, acid reflux etc.</li>
              <li className="mb-2">Those looking for Weight Loss naturally by having better metabolism and digestion.</li>
            </ol>
    
            <div className="border border-gray-300 rounded-t-md">
              <div className="flex border-b border-gray-300">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`font-bold text-[#3f5a0a] border border-gray-300 px-6 py-3 focus:outline-none cursor-pointer ${
                    activeTab === 'vision' ?  '' : 'border-b-white bg-white'
                  }`}
                >
                  Vision
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`font-bold text-[#3f5a0a] border border-gray-300 px-6 py-3 focus:outline-none cursor-pointer ${
                    activeTab === 'mission' ?  '' : 'border-b-white bg-white' 
                  }`}
                >
                  Mission
                </button>
              </div>
              <div className="p-5 border border-t-0 border-gray-300 text-[23px] leading-relaxed">
                {activeTab === 'vision' && (
                  <div>
                    Transform Your water to therapeutic water to remove toxins and make your gut better.
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
        <div className="bg-[#dbe2f1] font-['Roboto'] text-[#3f5a0a] py-10">
          <div className="max-w-5xl mx-auto border border-[#3f5a0a] rounded-md p-6 md:p-8 bg-[#dbe2f1]">
            <div className="text-center">
              <img
                src={GutWell}
                alt="Blue Harmony Infused Water Dip Bag with blue and orange colors and butterfly pea flower image"
                className="w-[220px] h-auto mx-auto"
              />
            </div>
    
            <h1 className="font-bold text-[40px] mt-4 mb-2 text-center">Gut Well</h1>
            <p className="text-[22px] font-normal leading-relaxed mb-6 text-center">
            This herbal drink, made with Ajwain, Jeera, Saunf, and Cinnamon, boosts digestion, cleanses the stomach and uterus, and supports metabolism and weight loss. Ajwain and Jeera, rich in antioxidants, aid digestion, detoxify, and balance cholesterol. Saunf provides essential minerals, prevents bloating, and regulates blood pressure. Cinnamon's anti-inflammatory properties relieve gastric issues.
            </p>
    
            <section
              aria-label="Ingredients and benefits"
              className="flex flex-col md:flex-row gap-5 text-[20px] font-bold"
            >
              <div className="flex-1">
                <strong className="block text-[20px] mb-2">Ingredients</strong>
                <ul className="list-disc list-inside">
                  <li className="mb-1">Saunf (Fennel Seeds)</li>
                  <li className="mb-1">Jeera (Cumin Seeds)</li>
                  <li className="mb-1">Ajwain (Carom Seeds)</li>
                  <li className="mb-1">Cinnamon</li>
                </ul>
              </div>
    
              <div className="flex-2 md:border-l md:pl-4 border-[#3f5a0a] leading-relaxed">
              These natural ingredients work together to provide a host of health benefits, particularly for the digestive system and metabolism.
              </div>
            </section>
             <div className='flex items-center justify-center'>
              <a href="/products/drinks/681721c9d477b654b3202128">
                <button
                type="button"
                aria-label="Shop Now"
                className="mt-6 bg-[#3f5a0a] text-white text-[20px] py-2 px-4 rounded cursor-pointer"
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

export default DataGutWell
