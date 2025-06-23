import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    const {products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(()=>{
        if(searchQuery.length > 0){
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))}else{
                setFilteredProducts(products)
            }
    },[products, searchQuery])

  return (
       <div class="mx-auto max-w-7xl">
    <div className="pb-20 pt-30 ">
      <div className='flex flex-col items-center sm:items-end sm:w-max'>
          <p className='text-2xl font-medium uppercase text-[#3f1f0a]'>All products</p>
        <div className='w-16 h-0.5 bg-[#3f1f0a] rounded-full'></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-[50px] lg:grid-cols-4  w-full place-items-center sm:place-items-start">
           {filteredProducts.filter((product)=> product.inStock).map((product, index)=>(
            <ProductCard key={index} product={product}/>
           ))}
        </div>
     </div>
     </div>
  )
}

export default AllProducts
