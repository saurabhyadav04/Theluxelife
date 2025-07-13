import React from 'react';
import Theluxlife from '../Images/Theluxlife-logo.png';

function HomeThirdComp() {
  return (
    <div className="mt-20 bg-[#f5ebe3] py-12 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row justify-between gap-10 max-w-screen-xl mx-auto">

        {/* Left Side - Text Sections */}
        <div className="flex-1 space-y-8 text-[#1c1c1c] text-[16px] sm:text-[18px] leading-relaxed">

          {/* Corporate Gifts */}
          <div>
            <h3 className="font-semibold ">Corporate Gifts:</h3>
            <p className="space-x-1 space-y-2">
              <a href="#" className="hover:underline">Gifts for Employees</a> |{" "}
              <a href="#" className="hover:underline">Gifts for Clients</a> |{" "}
              <a href="#" className="hover:underline">Welcome Kit For New Employees</a> |<br />
              <a href="#" className="hover:underline">Branded Corporate Gifts</a> |{" "}
              <a href="#" className="hover:underline">Eco Friendly Corporate Gifts</a> |<br />
              <a href="#" className="hover:underline">Corporate Thank You Gifts</a> |{" "}
              <a href="#" className="hover:underline">Corporate Tech Gifts</a> |{" "}
              <a href="#" className="hover:underline">Corporate Stationery Gifts</a> |<br />
              <a href="#" className="hover:underline">Real Estate Gifts</a> |{" "}
              <a href="#" className="hover:underline">Architecture Gifts</a> |{" "}
              <a href="#" className="hover:underline">Corporate New Year Gifts</a>
            </p>
            <hr className="mt-4 border-[#c4b8aa]" />
          </div>

          {/* Shop by Celebration */}
          <div>
            <h3 className="font-semibold">Shop by Celebration:</h3>
            <p className="space-x-1 space-y-2">
              <a href="#" className="hover:underline">Corporate Birthday Gifts</a> |{" "}
              <a href="#" className="hover:underline">Corporate Anniversary Gifts</a> |{" "}
              <a href="#" className="hover:underline">Rewards and Recognition</a> |<br />
              <a href="#" className="hover:underline">Women's day Gifts for Employees</a> |{" "}
              <a href="#" className="hover:underline">Corporate New Year Gifts</a> |<br />
              <a href="#" className="hover:underline">Executive Corporate Gifts</a> |{" "}
              <a href="#" className="hover:underline">Corporate Christmas Gifts</a> |{" "}
              <a href="#" className="hover:underline">Corporate Gifts for Diwali</a>
            </p>
            <hr className="mt-4 border-[#c4b8aa]" />
          </div>

          {/* Shop by Prices */}
          <div>
            <h3 className="font-semibold ">Shop by Prices꞉</h3>
            <p className="space-x-1 space-y-2">
              <a href="/products/under-4000" className="hover:underline">Theluxelife Gifts Under ₹4000</a> |{" "}
              <a href="/products/4000-7000" className="hover:underline">Theluxelife Gifts Between ₹4000 - ₹7000</a> |<br />
              <a href="/products/above-7000" className="hover:underline">Theluxelife Gifts Under ₹7000 & above</a> |{" "}
            </p>
          </div>
        </div>

        {/* Right Side - Logo */}
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
