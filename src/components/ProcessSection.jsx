import React from 'react';
import { Award, Heart, Box } from 'lucide-react'; // Icons matching the design
import curatedImage from '../Images/CL-4.jpg'
const ProcessSection = () => {
  const processes = [
    {
      icon: <Award className="w-5 h-5 text-[#c19a6b]" />,
      title: "Sourced with Standards",
      description: "Every product passes our 12-point quality checklist. We partner only with artisans and brands that share our commitment to excellence."
    },
    {
      icon: <Heart className="w-5 h-5 text-[#c19a6b]" />,
      title: "Curated with Care",
      description: "Our gift curators design each hamper around a story — matching contents to the occasion, the recipient, and the emotion you want to convey."
    },
    {
      icon: <Box className="w-5 h-5 text-[#c19a6b]" />,
      title: "Packaged with Precision",
      description: "Each gift is hand-assembled, wrapped in premium materials, and inspected before dispatch. Because first impressions matter."
    }
  ];

  return (
    <section className="bg-[#FAF7F2] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Content: Text and Process Steps */}
        <div className="flex-1 space-y-8">
          <div>
            <span className="block text-[12px] uppercase tracking-[0.4em] text-[#c19a6b] font-bold mb-3">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl text-[#0f172a] font-medium leading-tight" 
                style={{ fontFamily: "'Playfair Display', serif" }}>
              How We Curate
            </h2>
          </div>

          <div className="space-y-10">
            {processes.map((item, index) => (
              <div key={index} className="flex gap-6">
                {/* Icon Circle */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#c19a6b]/30 flex items-center justify-center bg-white shadow-sm">
                  {item.icon}
                </div>
                {/* Text */}
                <div className="space-y-2">
                  <h3 className="text-lg  text-[#0f172a] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-[#4b5563] text-sm md:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Image with Badge Overlay */}
        <div className="flex-1 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={curatedImage} 
              alt="Luxury Curation Process" 
              className="w-full h-auto object-cover min-h-[400px]"
            />
          </div>

          {/* Floating Badge (500+ Gifts Delivered) */}
          <div className="absolute -bottom-6 -left-6 bg-[#c19a6b] text-white p-6 rounded-xl shadow-xl animate-bounce-slow">
            <p className="text-2xl font-serif font-bold">500+</p>
            <p className="text-[10px] uppercase tracking-widest opacity-90">Gifts Delivered</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;