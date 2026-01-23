import React from 'react';

function HomesSecondComp() {
  return (
 <div className='md:pl-20 md:pr-20'>
     <div className="px-5 text-center bg-white text-black">
      <h2 className="text-center text-[22px] sm:text-[36px] leading-snug font-normal tracking-wide text-[#5B3A1A] mt-[80px] mb-[30px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Useful Gifts for Wedding 
          <br className="block sm:hidden" /> Gift Ideas for Wedding
        </h2>
      <p className="text-center text-[18px] sm:text-[20px] leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[20px]" style={{ fontFamily: "'Lato', sans-serif" }}>
         Corporate gifting is a meaningful way to recognize milestones—big or small.
        Whether it's a work anniversary, a project well done, or a festive occasion,
        a thoughtful gift can make someone feel valued and appreciated.
        With countless options to choose from, finding the right one might seem tricky,
        but the impact it creates is always worth it.
      </p>
      <a href="/about-us">
      <div className="text-[14px] sm:text-[20px] cursor-pointer select-none transform transition-transform duration-200 hover:scale-110">Read more…</div>
    </a>
    </div>
    </div>
  );
}

export default HomesSecondComp;
