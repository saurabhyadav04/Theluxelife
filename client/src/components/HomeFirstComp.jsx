import React, { useEffect, useRef, useState } from "react";
import one from '../Images/first-01.jpg'
import two from '../Images/first-02.jpeg'
import three from '../Images/first-03.jpg'


function HomeFirstComp() {
  const slides = [
    {
      src: one,
      alt: "Stacked gift boxes with ribbons on red background",
      heading1: "A Gift of Love",
      heading2: "For your happily ever after.",
    },
    {
      src:two,
      alt: "Placeholder image for slide 2",
      heading1: "Your Corporate Family Deserves",
      heading2: "For your happily ever after.",
    },
    {
      src: three,
      alt: "Placeholder image for slide 3",
      heading1: "Your hamper, Your choices",
      heading2: "Make your own hamper now!",
    },
   
  ];

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div className="relative h-[700px] w-full overflow-hidden font-sans bg-black">
      <div
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full h-full"
            aria-hidden={index !== current}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              width="800"
              height="600"
              draggable="false"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
              <h1 className="text-5xl sm:text-7xl font-[300] leading-snug mb-2">
                {slide.heading1}
              </h1>
              <h2 className="text-5xl sm:text-7xl font-[300] leading-snug mb-8">
                {slide.heading2}
              </h2>
              <a href="/products">
              <button className="border border-white rounded-full px-10 py-2 text-white text-lg tracking-widest uppercase hover:bg-white hover:text-[#b35a4a] transition-colors duration-300 cursor-pointer">
                Book Now
              </button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full ${
              idx === current ? "bg-white opacity-100" : "bg-white opacity-60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === current ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeFirstComp;
