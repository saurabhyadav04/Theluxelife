import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import wedding from '../Images/wedding icon 001.png';
import corporate from '../Images/corporate icon 001.png';
import special from '../Images/occasion Icon.png';

function LuxeLife({ mainImage }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[300px] sm:h-[600px] text-[#3f1f0a] font-['Montserrat']"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      <div className="w-full h-full bg-white/10 ">
        <div className="max-w-[1000px] md:ml-[35px] px-4 sm:px-15 py-20 sm:py-25">
          <h1 className=" font-[400] text-[30px] sm:text-[65px] my-6 sm:my-10 tracking-wide text-left" style={{fontFamily:'"Playfair Display", serif'}}>
            THE LUXELIFE
          </h1>

          {/* Horizontal layout with wrapping */}
          <div className="flex flex-row flex-wrap gap-6 sm:gap-16 justify-start sm:justify-start">
            {[
              {
                label: <div className="leading-tight">WEDDING <br /> FAVOURS</div>,
                icon: (
                  <img
                    src={wedding}
                    alt="WEDDING"
                    className="w-[25px] sm:w-[50px] h-auto"
                  />
                ),
                path: '/',
                onClick: () => navigate('/'),
              },
              {
                label: (
                  <div className="leading-tight text-center">
                    CORPORATE<br />GIFTING
                  </div>
                ),
                icon: (
                  <img
                    src={corporate}
                    alt="CORPORATE GIFTING"
                    className="w-[25px] sm:w-[50px] h-auto"
                  />
                ),
                path: '/corporate-gifting',
                onClick: () => navigate('/corporate-gifting'),
              },
              {
                label: (
                  <div className="leading-tight text-center">
                    SPECIAL<br />OCCASION
                  </div>
                ),
                icon: (
                  <img
                    src={special}
                    alt="Special Occasion"
                    className="w-[25px] sm:w-[50px] h-auto"
                  />
                ),
                path: '/special-occasion',
                onClick: () => navigate('/special-occasion'),
              },
            ].map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={idx}
                  className="text-center text-[12px] tracking-wide"
                >
                  <button
                    onClick={item.onClick}
                    className={`${
                      isActive ? 'border-[3px]' : 'border-2'
                    } border-[#3f1f0a] rounded-full w-[50px] sm:w-[90px] h-[50px] sm:h-[90px] mx-auto mb-2 flex items-center justify-center focus:outline-none cursor-pointer transform transition-transform duration-200 hover:scale-110`}
                    aria-label="category-button"
                  >
                    {item.icon}
                  </button>
                  <div className="text-[10px] sm:text-[20px] font-[400]">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LuxeLife;
