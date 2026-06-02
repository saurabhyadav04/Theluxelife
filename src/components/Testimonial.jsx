import React from "react";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Testimonial() {
  const testimonials = [
    {
      name: "Priya Verma",
      company: "Elite Ventures",
      review:
        "Our clients absolutely loved the customized hampers. The attention to detail and luxury presentation truly reflected our brand values.",
    },
    {
      name: "Amit Kapoor",
      company: "Innovate India",
      review:
        "From consultation to delivery, the process was smooth and professional. Highly recommended for corporate gifting requirements.",
    },
    {
      name: "Neha Gupta",
      company: "Global Enterprises",
      review:
        "Exceptional service and premium presentation. Our employees and clients were delighted with the gift hampers.",
    },
     {
      name: "Rahul Sharma",
      company: "Tech Solutions Pvt Ltd",
      review:
        "The gifting hampers exceeded our expectations. Premium packaging, and timely delivery made our corporate gifting experience seamless.",
    },
  ];

  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="w-16 h-[2px] bg-[#c19a6b] mx-auto mb-5"></div>

          <h2
            className="text-4xl md:text-5xl text-[#0f172a] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our Clients Say
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Trusted by businesses across India for premium gifting experiences.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white border border-gray-200 rounded-xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#c19a6b] text-[#c19a6b]"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-600 leading-8 mb-8 text-[15px]">
                  "{item.review}"
                </p>

                {/* Client Info */}
                <div className="border-t pt-5">
                  <h4
                    className="text-xl text-[#0f172a]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.name}
                  </h4>

                  <p className="text-[#c19a6b] text-sm mt-1 tracking-wide">
                    {item.company}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonial;