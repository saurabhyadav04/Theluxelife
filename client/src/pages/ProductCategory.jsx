import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {

    const { products } =  useAppContext()
    const { category } = useParams()

    const searchCategory = categories.find((item)=> item.path.toLowerCase() === category)

    const filteredProducts = products.filter((product)=>product.category.toLowerCase() === category)

  return (
     <div class="mx-auto max-w-7xl">
     <div className="pb-20 pt-30 ">
      {searchCategory && (
         <div className='flex flex-col items-center sm:items-end sm:w-max'>
           <p className='text-2xl font-medium uppercase text-[#3f1f0a]'>{searchCategory.text.toUpperCase()}</p>
            <div className="w-16 h-0.5 bg-[#3f1f0a] rounded-full"></div>
        </div>
      )}
      {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-[50px] lg:grid-cols-4  w-full place-items-center sm:place-items-start">
            {filteredProducts.map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
      ): (
        <div className='flex items-center justify-center h-[60vh]'>
            <p className='text-2xl font-medium text-[#3f1f0a]'>No products found in this category.</p>
        </div>
      )}
    </div>
    </div>
  )
}

export default ProductCategory
