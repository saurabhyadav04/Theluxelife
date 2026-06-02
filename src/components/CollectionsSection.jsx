import React from 'react';
import { useNavigate } from 'react-router-dom';
import one from '../Images/CL-1.jpg';
import two from '../Images/CL-2.jpg';
import three from '../Images/CL-3.jpg';

const CollectionsSection = () => {
  const navigate = useNavigate();

  const collections = [
    {
      title: "By Occasion",
      subtitle: "Thank you, housewarming, festive & more",
      image: one,
      link: "/products/festive"
    },
    {
      title: "By Budget",
      subtitle: "Find the perfect gift at every price point",
      image: two,
      link: "/products/under-4000"
    },
    {
      title: "For Teams",
      subtitle: "Impress clients & reward employees",
      image: three,
      link: "/products/corporate"
    }
  ];

  return (
    <section className="bg-[#FAF7F2] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="block text-[12px] uppercase tracking-[0.4em] text-[#c19a6b] font-bold mb-3">
          Discover
        </span>

        <h2
          className="text-4xl md:text-5xl text-[#0f172a] font-medium leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Browse Our Collections
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.link)}
            className="group relative h-[300px] overflow-hidden rounded-2xl cursor-pointer shadow-sm transition-all duration-500 hover:shadow-2xl"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full text-white z-10">
              <h3
                className="text-2xl md:text-3xl font-medium mb-2 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {item.title}
              </h3>

              <p className="text-sm md:text-base opacity-90 font-light tracking-wide">
                {item.subtitle}
              </p>

              <div className="mt-4 w-0 h-[1px] bg-[#c19a6b] transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSection;