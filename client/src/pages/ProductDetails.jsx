import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {

    const { products, navigate, currency, addToCart } = useAppContext()
    const { id } = useParams()
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState({ type: 'image', src: null });

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category)
            setRelatedProducts(productsCopy.slice(0, 5))
        }
    }, [products])

    useEffect(() => {
        if (product?.image?.length > 0) {
            setThumbnail({ type: 'image', src: product.image[0] });
        } else if (product?.video) {
            setThumbnail({ type: 'video', src: product.video });
        }
    }, [product])

    return product && (
        <div className="mx-auto max-w-7xl">
            <div className="px-6 md:px-16 lg:px-24 py-15">
                <div className="mt-12">
                    <p>
                        <Link to={"/"}>Home</Link> /
                        <Link to={"/products"}> Products</Link> /
                        <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                        <span className="text-[#3f1f0a]"> {product.name}</span>
                    </p>

                    <div className="flex flex-col md:flex-row gap-16 mt-4">
                        <div className="flex gap-3">
                            <div className="flex flex-col gap-3">
                                {product.image.map((image, index) => (
                                    <div key={index} onClick={() => setThumbnail({ type: 'image', src: image })} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                                {product.video && (
                                    <div onClick={() => setThumbnail({ type: 'video', src: product.video })} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
                                        <video src={product.video} className="w-full h-full object-cover" muted  style={{height:'90px', width:'95px'}}/>
                                    </div>
                                )}
                            </div>
                                    <div className={`relative w-[400px] sm:h-[400px] h-[300px] overflow-hidden border border-gray-500/30 rounded group ${
                                        thumbnail.type === "image" ? "hover:cursor-zoom-in" : ""
                                    }`}
                                    onMouseMove={(e) => {
                                        if (thumbnail.type !== "image") return;

                                        const container = e.currentTarget;
                                        const image = container.querySelector("img");
                                        const rect = container.getBoundingClientRect();

                                        const offsetX = e.clientX - rect.left;
                                        const offsetY = e.clientY - rect.top;

                                        const xPercent = (offsetX / rect.width) * 100;
                                        const yPercent = (offsetY / rect.height) * 100;

                                        image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                                        image.style.transform = "scale(2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        if (thumbnail.type !== "image") return;

                                        const image = e.currentTarget.querySelector("img");
                                        image.style.transform = "scale(1)";
                                        image.style.transformOrigin = "center center";
                                    }}
                                    >
                                    {thumbnail?.type === "image" ? (
                                        <img
                                        src={thumbnail.src}
                                        alt="Selected product"
                                        className="w-full h-full object-cover transition-transform duration-200 ease-in-out pointer-events-none"
                                        />
                                    ) : (
                                        <video
                                        src={thumbnail.src}
                                        muted
                                        autoPlay
                                        loop
                                        className="w-full object-cover transition-transform duration-200 ease-in-out pointer-events-none"
                                        />
                                    )}
                                    </div>
                        </div>
                        <div className="text-sm w-full md:w-1/2">
                            <h1 className="text-3xl font-medium">{product.name}</h1>

                            <div className="flex items-center gap-0.5 mt-1">
                                {Array(5).fill('').map((_, i) => (
                                    <img src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="md:w-4 w-3.5" />
                                ))}
                                <p className="text-base ml-2">(4)</p>
                            </div>

                            <div className="mt-6">
                                <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                                <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                                <span className="text-gray-500/70">(inclusive of all taxes)</span>
                            </div>

                            <p className="text-base font-medium mt-6">About Product</p>
                            <ul className="list-disc ml-4 text-gray-500/70">
                                {product.description.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))}
                            </ul>

                            <div className="flex items-center mt-10 gap-4 text-base">
                                <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                                    Add to Cart
                                </button>
                                <button onClick={() => { addToCart(product._id); navigate("/cart") }} className="w-full py-3.5 cursor-pointer font-medium bg-[#3f1f0a] text-white hover:bg-[#3f1f0a]-dull transition" >
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    {/* ---------- related products -------------- */}
                <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center w-max">
                            <p className="text-3xl font-medium">Related Products</p>
                            <div className="w-20 h-0.5 bg-[#3f1f0a] rounded-full mt-2"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-[00px] lg:grid-cols-4 w-full place-items-center sm:place-items-start ">
                            {relatedProducts.filter((product) => product.inStock).slice(0,4).map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                        <button onClick={() => { navigate('/products'); scrollTo(0, 0) }} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-[#3f1f0a] hover:bg-[#3f1f0a]/10 transition">See more</button>
                    </div>
                    
        </div>
    );
};

export default ProductDetails;
