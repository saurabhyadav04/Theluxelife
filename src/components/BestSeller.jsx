import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const { products } = useAppContext();
    
    return (
        <div className='md:pl-15 md:pr-15 bg-[#FAF7F2] py-16'>
            {/* Header Section */}
            <div className="px-5 text-center max-w-4xl mx-auto mb-16">
                <span className="block text-[12px] uppercase tracking-[0.4em] text-[#c19a6b] font-bold mb-3">
                    Handpicked
                </span>
                
                <h2 className="text-center text-[32px] sm:text-[48px] leading-tight font-medium tracking-tight text-[#0f172a] mb-6" 
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    Featured Collections 
                </h2>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
                    {products
                        .filter((product) => product.inStock)
                        .slice(-4) // take last 4
                        .reverse() // make most recent first
                        .map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default BestSeller