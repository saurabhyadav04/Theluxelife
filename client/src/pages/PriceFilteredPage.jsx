import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

function PriceFilteredPage({ minPrice, maxPrice, title }) {
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const price = Number(product.price);
      if (isNaN(price)) return false;
      if (!product.inStock) return false;

      if (maxPrice === null) return price >= minPrice;
      return price >= minPrice && price <= maxPrice;
    });

    setFilteredProducts(filtered);
  }, [products, minPrice, maxPrice]);

  return (
    <div class="mx-auto max-w-7xl">
    <div className="pb-20 pt-30 ">
   <div className='flex flex-col items-center sm:items-end sm:w-max'>
          <p className='text-2xl font-medium uppercase text-[#3f1f0a]'>{title}</p>
        <div className='w-16 h-0.5 bg-[#3f1f0a] rounded-full'></div>
      </div>
      {filteredProducts.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-[50px] lg:grid-cols-4  w-full place-items-center sm:place-items-start">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
         <div className='flex items-center justify-center h-[60vh]'>
            <p className='text-2xl font-medium text-[#3f1f0a]'>No products found in this category.</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default PriceFilteredPage;
