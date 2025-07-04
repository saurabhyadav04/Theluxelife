import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();
  return (
    <div className='md:pl-15 md:pr-15'>
      <div className="px-5 text-center bg-white text-black">
      <h2 className="text-center text-[22px] sm:text-[36px] leading-snug font-normal tracking-wide text-[#5B3A1A] mt-[60px] mb-[30px]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Why Choose Luxelife Luxury Gifting 
          {/* <br className="hidden sm:block" />for Corporate Sector? */}
        </h2>
      <p className="text-center text-[18px] sm:text-[20px] leading-snug font-normal tracking-wide text-[#5B3A1A]  mb-[30px]" style={{ fontFamily: "'Lato', sans-serif" }}>
        Looking for the perfect gift hamper for him? Luxelife brings you a premium selection of curated hampers ideal for birthdays,
         anniversaries, and special occasions. Whether you're gifting your husband,
         boyfriend, father, or colleague, our luxury hampers include stylish accessories,
          gourmet treats, and personalized touches that make a lasting impression.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-[50px] lg:grid-cols-4  w-full place-items-center sm:place-items-start ">
        {products.filter((product)=> product.inStock).slice(0,4).map((product, index)=>(
            <ProductCard key={index} product={product}/>
        ))}
      </div>
    </div>
  )
}

export default BestSeller

