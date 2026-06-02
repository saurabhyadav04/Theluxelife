import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const { currency, navigate } = useAppContext();

    

    return product && (
        <div 
            onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0, 0); }} 
            className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                {/* Featured Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#C5A373] text-white px-3 py-1 rounded-full text-[10px] font-medium">
                    <span>✨</span> Featured
                </div>
                
                <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={product.image[0]} 
                    alt={product.name} 
                />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <p className="bg-[#F8F3ED] text-[#5B3A1A] text-[10px] px-2 py-0.5 rounded-md border border-[#E9DCC9]">{product.category}</p>
                </div>

                {/* Name */}
                <h3 className="text-[#1A2B48] text-lg font-medium leading-tight mb-1 group-hover:text-[#C5A373] transition-colors">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-[#C5A373] font-bold text-lg">
                        {currency}{product.offerPrice || product.price}
                    </span>
                    {product.offerPrice && (
                        <span className="text-gray-400 line-through text-xs">
                            {currency}{product.price}
                        </span>
                    )}
                </div>

                {/* Short Description */}
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description || "Celebrate life's beautiful moments with curated gourmet treats and pampering essentials."}
                </p>

                {/* Action Button */}
                <button className="w-full bg-[#1A2B48] text-white py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#253d63] transition-colors mt-auto">
                    View Details
                    <span className="text-xs">❯</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;