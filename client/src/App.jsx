import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
import Contact from './pages/Contact';
import AboutOurCompany from './pages/AboutOurCompany';
import ReturnsandRefund from './pages/ReturnsandRefund';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import Corporate from './pages/Corporate';
import Special from './pages/Special';
import Faqs from './pages/Faqs';
import ShippingPolicy from './pages/ShippingPolicy';
import PaymentSuccess from './pages/PaymentSuccess';
import PriceFilteredPage from './pages/PriceFilteredPage';
const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  // Define hasBannerBackground based on route
  const hasBannerBackground = ["/", "/special-occasion", "/corporate-gifting"].includes(location.pathname);

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {/* Navbar with conditional background */}
      {!isSellerPath && <Navbar hasBannerBackground={hasBannerBackground} />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath ? "" : ""}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/special-occasion' element={<Special />} />
          <Route path='/corporate-gifting' element={<Corporate />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/about-us' element={<AboutOurCompany />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/return-refund' element={<ReturnsandRefund />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />

            <Route path="/products/under-4000" element={
              <PriceFilteredPage minPrice={0} maxPrice={4000} title="Products Under ₹4000" />
            } />
            <Route path="/products/4000-7000" element={
              <PriceFilteredPage minPrice={4000} maxPrice={7000} title="Products ₹4000 - ₹7000" />
            } />
            <Route path="/products/above-7000" element={
              <PriceFilteredPage minPrice={7000} maxPrice={null} title="Products Above ₹7000" />
            } />

          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App
