import React from 'react';
import Theluxlife from '../Images/Theluxlife-logo.png'
function HomeThirdComp() {
  return (
    <div className="mt-20 bg-[#f5ebe3] py-12 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-screen-xl mx-auto">
        
        {/* Left Side - Text Sections */}
        <div className="flex-1 space-y-8 text-[#1c1c1c] text-[16px] sm:text-[18px] leading-relaxed">
          
          {/* Corporate Gifts */}
          <div>
            <h3 className="font-semibold mb-2">Corporate Gifts:</h3>
            <p>
              Gifts for Employees | Gifts for Clients | Welcome Kit For New Employees |<br />
              Branded Corporate Gifts | Eco Friendly Corporate Gifts |<br />
              Corporate Thank You Gifts | Corporate Tech Gifts | Corporate Stationery Gifts |<br />
              Real Estate Gifts | Architecture Gifts | Corporate New Year Gifts
            </p>
            <hr className="mt-4 border-[#c4b8aa]" />
          </div>

          {/* Shop by Celebration */}
          <div>
            <h3 className="font-semibold mb-2">Shop by Celebration:</h3>
            <p>
              Corporate Birthday Gifts | Corporate Anniversary Gifts | Rewards and Recognition |<br />
              Women's day Gifts for Employees | Corporate New Year Gifts |<br />
              Executive Corporate Gifts | Corporate Christmas Gifts | Corporate Gifts for Diwali
            </p>
            <hr className="mt-4 border-[#c4b8aa]" />
          </div>

          {/* Shop by Cities */}
          <div>
            <h3 className="font-semibold mb-2">Shop by Cities:</h3>
            <p>
              Corporate Gifts in Bangalore | Corporate Gifts in Chennai |<br />
              Corporate Gifts in Hyderabad | Corporate Gifts in Pune | Corporate Gifts in Delhi |<br />
              Corporate Gifts in Mumbai | Corporate Gifts In Ahmedabad
            </p>
          </div>
          {/*  */}
          <div>
            <h3 className="font-semibold mb-2">Shop by Prices꞉</h3>
            <p>
               Corporate Gifts Under 1000 | Corporate Gifts Under 2500 |<br />
                Corporate Gifts Under 3000 | Corporate Gifts Above 3000 |
            </p>
          </div>
        </div>

        {/* Right Side - Logo Text */}
       <div className="flex items-center justify-center lg:justify-end w-full lg:w-1/3">
          <div className="text-[#4d2600] text-[32px] sm:text-[40px] font-semibold text-center lg:text-right leading-tight">
            <img 
              src={Theluxlife}
              alt="Luxelife Logo" 
              className="w-[500px] h-auto mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeThirdComp;
