import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext()
    return product && (
                        <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0);}} className="mt-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer w-[300px] max-w-100">
                <div className="flex items-center justify-center rounded-t-xl overflow-hidden h-60">
                    <img 
                            className="transition-transform duration-300 ease-in-out group-hover:scale-105 object-cover w-full" 
                            src={product.image[0]} 
                            alt={product.name} 
                    />
                </div>

                <div className="p-3 text-gray-700">
                    <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
                    <p className="text-[20px] line-clamp-1 text-[#5B3A1A]" style={{fontWeight:'500'}}>{product.name}</p>

                    <div className="flex items-center gap-0.5 mt-1 mb-2">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className="w-4 h-4" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="rating star" />
                    ))}
                    <p className="text-xs text-gray-500 ml-1">(4)</p>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                    <p className="text-[#073b61] text-base font-semibold">
                        {currency}{product.offerPrice}
                        <span className="text-xs text-gray-400 line-through ml-1">
                        {currency}{product.price}
                        </span>
                    </p>

                    <div onClick={(e) => e.stopPropagation()} className="text-[#3f1f0a]">
                        {!cartItems[product._id] ? (
                        <button 
                            className="flex items-center gap-1 px-2 py-1 text-sm bg-[#3f1f0a]/10 border border-[#3f1f0a]/40 rounded-md"
                            onClick={() => addToCart(product._id)}
                        >
                            <img src={assets.nav_cart_icon} alt="cart_icon" className="w-4 h-4" />
                            Add
                        </button>
                        ) : (
                        <div className="flex items-center justify-between w-20 h-[34px] bg-[#3f1f0a]/25 rounded-md text-sm px-2">
                            <button onClick={() => removeFromCart(product._id)} className="px-1">-</button>
                            <span>{cartItems[product._id]}</span>
                            <button onClick={() => addToCart(product._id)} className="px-1">+</button>
                        </div>
                        )}
                    </div>
                    </div>
                </div>
                </div>

    );
};

export default ProductCard;