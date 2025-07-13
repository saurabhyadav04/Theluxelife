import React, { useEffect, useRef, useState } from "react";
import one from '../Videos/Gifting-07.mov';
import two from '../Videos/Gifting-08.mov';
import three from '../Videos/Gifting-09.mov';

function HomeFirstComp() {
  const slides = [
    {
      src: one,
      alt: "Stacked gift boxes with ribbons on red background",
      heading1: (
        <strong style={{ fontWeight: 600, fontFamily: "Avenir, sans-serif" }}>
          A Gift of Love
        </strong>
      ),
      heading2: (
        <span style={{ fontFamily: "Avenir, sans-serif" }}>
          For your happily ever after.
        </span>
      ),
    },
    {
      src: two,
      alt: "Placeholder image for slide 2",
      heading1: (
        <span style={{ fontFamily: "Avenir, sans-serif" }}>
          Your{" "}
          <strong style={{ fontWeight: 600, fontFamily: "Avenir, sans-serif" }}>
            Corporate Family
          </strong>{" "}
          Deserves
        </span>
      ),
      heading2: (
        <span style={{ fontFamily: "Avenir, sans-serif" }}>
          For your happily ever after.
        </span>
      ),
    },
    {
      src: three,
      alt: "Placeholder image for slide 3",
      heading1: (
        <span style={{ fontFamily: "Avenir, sans-serif" }}>
          Your hamper, Your choices
        </span>
      ),
      heading2: (
        <strong style={{ fontWeight: 600, fontFamily: "Avenir, sans-serif" }}>
          Make your own hamper now!
        </strong>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 30000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

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
            {/* Video background */}
            <video
              src={slide.src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Subtle black overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Text content on top */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6 z-10">
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

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
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

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 z-20 transition duration-300 cursor-pointer"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-3 z-20 transition duration-300 cursor-pointer"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default HomeFirstComp;
