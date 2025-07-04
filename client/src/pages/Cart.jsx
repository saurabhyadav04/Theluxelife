import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const location = useLocation();
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [guestAddress, setGuestAddress] = useState(null);

  useEffect(() => {
    const storedGuestAddress = JSON.parse(localStorage.getItem('guestAddress'));
    if (!user && storedGuestAddress) {
      setGuestAddress(storedGuestAddress);
      setSelectedAddress(storedGuestAddress); // Set guest address as selected
    }
  }, [user]);

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select a delivery address to proceed with your order!", {
          style: {
            border: '1px solid #FF5A5F',
            padding: '12px',
            color: '#D8000C',
            backgroundColor: '#FFF3F3',
          },
        });
      }

      const orderItems = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));
// guest user 
     if (!user) {
  const orderPayload = {
    items: orderItems,
    address: guestAddress,
  };

  const { data } = await axios.post("/api/order/guest/razorpay", orderPayload);

  if (data.success) {
    const orderId = data.orderId;

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "The Luxelife",
      description: "Guest Order Payment",
      order_id: data.order.id,
      handler: async function (response) {
        const verifyRes = await axios.post("/api/order/guest/razorpay/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        });

        if (verifyRes.data.success) {
          toast.success("Payment successful!");
          localStorage.removeItem("guestAddress");
          setCartItems({});
          navigate("/payment-success");
        } else {
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: guestAddress.firstName + " " + guestAddress.lastName,
        email: guestAddress.email,
        contact: guestAddress.phone,
      },
      theme: { color: "#3f1f0a" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } else {
    toast.error(data.message);
  }

  return;
}


      // Razorpay Payment for Logged-in User
      const { data } = await axios.post("/api/order/razorpay", {
        userId: user._id,
        items: orderItems,
        address: selectedAddress._id,
      });

      if (data.success) {
        const orderId = data.orderId;

        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "The Luxelife",
          description: "Order Payment",
          order_id: data.order.id,
          handler: async function (response) {
            const verifyRes = await axios.post("/api/order/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              orderId,
            });

            if (verifyRes.data.success) {
              toast.success('Payment successful!', {
                style: {
                  backgroundColor: '#3f1f0a',
                  color: 'white',
                },
                iconTheme: {
                  primary: '#3f1f0a',
                  secondary: '#FFFAEE',
                },
              });
              setCartItems({});
              navigate("/payment-success");
            } else {
              toast.error("Something went wrong in payment verification.");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong during placing the order");
    }
  };

      useEffect(() => {
        if (products.length > 0 && cartItems) {
          getCart();
        }
      }, [products, cartItems]);

      useEffect(() => {
        if (user) {
          getUserAddress();
        }
      }, [location, user]);
  return products.length > 0 && cartItems ? (
    <div className="mx-auto max-w-7xl">
      <div className="px-6 md:px-16 py-15">
        <div className="flex flex-col md:flex-row mt-16">
            {/* Left Section */}
          <div className="flex-1 max-w-4xl">
            <h1 className="text-3xl font-medium mb-6">
              Shopping Cart{" "}
              <span className="text-sm text-[#3f1f0a]">
                {getCartCount()} Items
              </span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartArray.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div
                    onClick={() => {
                      navigate(
                        `/products/${product.category.toLowerCase()}/${product._id}`
                      );
                      scrollTo(0, 0);
                    }}
                    className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                  >
                    <img
                      className="max-w-full h-full object-cover"
                      src={product.image[0]}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold">
                      {product.name}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <p>
                        Weight: <span>{product.weight || "N/A"}</span>
                      </p>
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select
                          onChange={(e) =>
                            updateCartItem(product._id, Number(e.target.value))
                          }
                          value={cartItems[product._id]}
                          className="outline-none"
                        >
                          {Array(
                            cartItems[product._id] > 9
                              ? cartItems[product._id]
                              : 9
                          )
                            .fill("")
                            .map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  {currency}
                  {product.offerPrice * product.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer mx-auto"
                >
                  <img
                    src={assets.remove_icon}
                    alt="remove"
                    className="inline-block w-6 h-6"
                  />
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-[#3f1f0a] font-medium"
            >
              <img
                className="group-hover:-translate-x-1 transition"
                src={assets.arrow_right_icon_colored}
                alt="arrow"
                style={{ width: "15px", height: "auto" }}
              />
              Continue Shopping
            </button>
          </div>

          {/* Right Section */}
          <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />
            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative flex justify-between items-start mt-2">
                <p className="text-gray-500">
                  {selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                    : "No address found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-[#3f1f0a] hover:underline cursor-pointer"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                    {user && addresses.map((address, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                        className="text-gray-500 p-2 hover:bg-gray-100"
                      >
                        {address.street}, {address.city}, {address.state}, {address.country}
                      </p>
                    ))}
                    <p
                      onClick={() => navigate("/add-address")}
                      className="cursor-pointer text-[#3f1f0a] text-center p-2 hover:bg-[#3f1f0a]/10"
                    >
                      Add address
                    </p>
                  </div>
                )}
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span>
                <span>{currency}{getCartAmount()}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-[#3f1f0a]">Free</span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span>
                <span>{currency}{getCartAmount()}</span>
              </p>
            </div>

            <button
              onClick={placeOrder}
              className="w-full py-3 mt-6 cursor-pointer bg-[#3f1f0a] text-white font-medium hover:bg-[#3f1f0a]-dull transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
