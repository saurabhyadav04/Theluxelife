import React from 'react';

function Homeslider() {
  return (
    <div className="overflow-hidden bg-yellow-300 text-[#1f3a1f] text-[30px] font-semibold select-none m-0">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            display: flex;
            white-space: nowrap;
            animation: scroll 15s linear infinite;
          }
        `}
      </style>

      <div className="animate-scroll">
        <div className="px-4">Heal With Every Sip!</div>
        <div className="px-4">Heal With Every Sip!</div>
        <div className="px-4">Heal With Every Sip!</div>
        <div className="px-4">Heal With Every Sip!</div>
        {/* Duplicated for seamless loop */}
        <div className="px-4">Heal With Every Sip!</div>
        <div className="px-4">Heal With Every Sip!</div>
        <div className="px-4">Heal With Every Sip!</div>
        <div className="px-4">Heal With Every Sip!</div>
      </div>
    </div>
  );
}

export default Homeslider;
