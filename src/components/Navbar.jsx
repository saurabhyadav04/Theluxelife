import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import Theluxlife from '../Images/Theluxlife-logo2.png';
import headerImage01 from '../Images/header-image.jpg'
import headerImage02 from '../Images/header-image1.jpg'

const Navbar = ({ hasBannerBackground }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCorporateDropdownOpen, setIsCorporateDropdownOpen] = useState(false); // 👈 New state for corporate dropdown
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const corporateDropdownRef = useRef(null); // 👈 New ref for corporate dropdown

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
          toast.success(data.message, {
            style: {
              backgroundColor: '#ffffff',
              color: 'white',
            },
            iconTheme: {
              primary: '#ffffff',
              secondary: '#FFFAEE',
            },
        });
        setUser(null);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate('/products');
    }
  }, [searchQuery]);

  const handleProductClick = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
    setIsCorporateDropdownOpen(false); // 👈 Close corporate dropdown if open
  };

  const handleCorporateClick = (e) => {
    e.preventDefault(); // 👈 Prevents direct navigation to let dropdown open
    setIsCorporateDropdownOpen(!isCorporateDropdownOpen);
    setIsProductDropdownOpen(false); // 👈 Close shop gifts if open
  };

  const handleCorporateSubLinkClick = () => {
    setIsCorporateDropdownOpen(false); // 👈 Close dropdown on link click
    setMobileMenuOpen(false); // 👈 Close mobile menu on link click
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setIsProductDropdownOpen(false);
    setIsCorporateDropdownOpen(false);
  };

  // Auto-close SHOP GIFTS dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProductDropdownOpen(false);
      }
    };

    if (isProductDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProductDropdownOpen]);

  // ⬇️ Auto-close CORPORATE dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        corporateDropdownRef.current &&
        !corporateDropdownRef.current.contains(event.target)
      ) {
        setIsCorporateDropdownOpen(false);
      }
    };

    if (isCorporateDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCorporateDropdownOpen]);

  // Close dropdown and menu on scroll for both desktop and mobile
  useEffect(() => {
    const handleScroll = () => {
      setMobileMenuOpen(false);
      setIsProductDropdownOpen(false);
      setIsCorporateDropdownOpen(false); // 👈 Added here
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full flex items-center justify-between px-3 py-0 flex-wrap md:flex-nowrap z-50 pt-3 pb-2 transition-all duration-300 ${hasBannerBackground ? 'bg-transparent' : 'bg-[#0f172a]'}`} style={{ position: 'absolute' }}>

        {/* Logo - Mobile */}
        <div className="cursor-pointer md:hidden" onClick={() => navigate('/')}>
          <img src={Theluxlife} alt="Luxelife Logo" className="w-[80px] h-auto mx-auto lg:mx-0" />
        </div>

        {/* Hamburger and Cart Icons (Mobile) */}
        <div className="flex items-center gap-4 md:hidden">
          <div onClick={() => navigate('/cart')} className="relative cursor-pointer px-3">
            <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
            <button className="absolute -top-2 -right-3 text-xs text-[#ffffff] bg-white w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>
          <button
            className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} focus:outline-none`}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className='hidden sm:block' onClick={() => navigate('/')}>
            <img src={Theluxlife} alt="Luxelife Logo" className="w-[100px] h-auto mx-auto lg:mx-0 " style={{ cursor: 'pointer' }}/>
          </div>
        <nav
          role="navigation"
          className={`${ mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-[30px] w-full md:w-auto text-left md:text-center ${
            hasBannerBackground ? 'bg-[#0f172a] md:bg-transparent' : 'bg-[#0f172a]'
          } px-2 py-2 md:p-0 rounded-md absolute md:static top-full left-0 z-10`}
        >
          {/* Logo Desktop */}
          

          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide transform transition-transform duration-200 hover:scale-110`}>
            HOME
          </NavLink>

                  {/* Products Mega Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              tabIndex="0"
              onClick={handleProductClick}
              className={`flex items-center gap-1 ${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide transition hover:scale-110`}
              style={{ cursor: 'pointer' }}
            >
              SHOP GIFTS
              <svg className="w-4 h-4 mt-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`fixed left-0 right-0 mt-2 w-full bg-[#0f172a] text-[#ffffff] shadow-lg transition-opacity z-30 px-4 md:px-20 py-2 sm:py-6 ${
                isProductDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm max-w-[1300px] mx-auto">
                {/* By Recipient */}
                <div>
                  <h4 className="font-[500] mb-2 text-[16px]">BY RECIPIENT</h4>
                  <ul className="space-y-1">
                    <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/for-her"  onClick={() => {
                          setIsProductDropdownOpen(false);
                          setMobileMenuOpen(false); 
                      }}>For Her</NavLink></li>
                                          <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/for-him"  onClick={() => {
                          setIsProductDropdownOpen(false);
                          setMobileMenuOpen(false); 
                      }}>For Him</NavLink></li>
                                          <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/for-couples"  onClick={() => {
                          setIsProductDropdownOpen(false);
                          setMobileMenuOpen(false); 
                      }}>For Couples</NavLink></li>
                                          <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/bridesmaid"  onClick={() => {
                          setIsProductDropdownOpen(false);
                          setMobileMenuOpen(false); 
                      }}>Bridesmaid</NavLink></li>
                                          <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/stationery-lover"  onClick={() => {
                          setIsProductDropdownOpen(false);
                          setMobileMenuOpen(false); 
                      }}>Stationery Lover</NavLink></li>
                  </ul>
                </div>

                {/* By Occasion */}
                <div>
                  <h4 className="font-[500] mb-2 text-[16px]">BY OCCASION</h4>
                  <ul className="space-y-1">
                    <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/wedding"  onClick={() => {
                        setIsProductDropdownOpen(false);
                        setMobileMenuOpen(false); 
                      }}>Wedding</NavLink></li>
                                        <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/festive"  onClick={() => {
                        setIsProductDropdownOpen(false);
                        setMobileMenuOpen(false); 
                      }}>Festive</NavLink></li>
                                        <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/corporate"  onClick={() => {
                        setIsProductDropdownOpen(false);
                        setMobileMenuOpen(false); 
                      }}>Corporate</NavLink></li>
                                        <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/housewarming"  onClick={() => {
                        setIsProductDropdownOpen(false);
                        setMobileMenuOpen(false); 
                      }}>Housewarming</NavLink></li>
                                        <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/thank-you"  onClick={() => {
                        setIsProductDropdownOpen(false);
                        setMobileMenuOpen(false); 
                      }}>Thank You</NavLink></li>
                      <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/baby-announcements"  onClick={() => {
                        setIsProductDropdownOpen(false);
                        setMobileMenuOpen(false); 
                      }}>Baby Announcements</NavLink></li>
                  </ul>
                </div>

                {/* By Price */}
                <div>
                  <h4 className="font-[500] mb-2 text-[16px]">BY PRICE</h4>
                  <ul className="space-y-1">
                    <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/under-4000"  onClick={() => {
                            setIsProductDropdownOpen(false);
                            setMobileMenuOpen(false); 
                          }}>INR 0 - 4000</NavLink></li>
                                            <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/4000-7000"  onClick={() => {
                            setIsProductDropdownOpen(false);
                            setMobileMenuOpen(false); 
                          }}>INR 4000 - 7000</NavLink></li>
                                            <li className="text-[16px] hover:scale-110 transition"><NavLink to="/products/above-7000"  onClick={() => {
                            setIsProductDropdownOpen(false);
                            setMobileMenuOpen(false); 
                          }}>INR 7000 & above</NavLink></li>  
                  </ul>
                </div>
                  {/* Image */}
                <div className='hidden sm:block'>
                  <img src={headerImage01} alt="" />
                </div>
                  {/* IMAGE */}
                <div className='hidden sm:block'>
                  <img src={headerImage02} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* Corporate Dropdown (Modified for click behavior) */}
          <div className="relative" ref={corporateDropdownRef}>
            <button
              onClick={handleCorporateClick}
              className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide flex items-center gap-1 transform transition-transform duration-200 hover:scale-110 focus:outline-none`}
            >
              CORPORATE
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className={`absolute top-full left-0 mt-2 w-80 bg-[#0f172a] text-white shadow-lg rounded-md transition-all duration-300 z-50 ${isCorporateDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <NavLink to="/products/premium-tech-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Premium Tech Gifts
              </NavLink>
              <NavLink to="/products/office-desktop-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Office & Desktop Gifts
              </NavLink>
              <NavLink to="/products/luxury-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Luxury Gifts
              </NavLink>
              <NavLink to="/products/wellness-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Wellness Gifts
              </NavLink>

              <NavLink to="/products/personal-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Personal Gifts
              </NavLink>

              <NavLink to="/products/employee-onboarding-appreciation-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Employee Onboarding & Appreciation Gifts
              </NavLink>

              <NavLink to="/products/divine-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Divine Gifts
              </NavLink>

              <NavLink to="/products/home-decor-homeware-gifts" onClick={handleCorporateSubLinkClick} className="block px-4 py-2 hover:bg-white hover:text-black">
                Home Decor & Homeware Gifts
              </NavLink>
            </div>
          </div>

          <NavLink to="/products/special" onClick={() => setMobileMenuOpen(false)} className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide transform transition-transform duration-200 hover:scale-110`}>
          SPECIAL
          </NavLink>
          <NavLink to="/about-us" onClick={() => setMobileMenuOpen(false)} className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide transform transition-transform duration-200 hover:scale-110`}>
            OUR STORY
          </NavLink>
          <NavLink to="/blog" onClick={() => setMobileMenuOpen(false)} className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide transform transition-transform duration-200 hover:scale-110`}>
            BLOG
          </NavLink>
             <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={`${hasBannerBackground ? 'text-[#ffffff]' : 'text-[#ffffff]'} font-[500] text-[15px] tracking-wide transform transition-transform duration-200 hover:scale-110`}>
            CONTACT US
          </NavLink>
          
            <div className='block sm:hidden'>
              {user ? (
                <div className="relative cursor-pointer">
                  <img
                    src={assets.profile_icon}
                    className="w-10"
                    alt="profile"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  />
                  {showUserDropdown && (
                    <ul className="absolute top-10 left-0 w-30 bg-[#0f172a] text-[#ffffff] shadow py-2.5 px-0 text-[17px] z-40 rounded-none">
                      <li
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate('my-orders');
                        }}
                        className="p-1.5 pl-3 hover:scale-110 cursor-pointer"
                      >
                        My Orders
                      </li>
                      <li
                        onClick={() => {
                          setShowUserDropdown(false);
                          logout();
                        }}
                        className="p-1.5 pl-3 hover:scale-110 cursor-pointer"
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowUserLogin(true);
                  }}
                  className={`cursor-pointer px-6 py-2 ${hasBannerBackground ? 'bg-[#ffffff] text-[#3f1f0a]' : 'bg-[#ffffff] text-[#3f1f0a] hover:scale-110'} rounded-full text-sm transition duration-200`}
                >
                  Login
                </button>
              )}
            </div>

        </nav>

        {/* Desktop Cart and Login */}
        <div className="hidden lg:flex items-center gap-6">
          <div className={`flex items-center text-sm gap-2 border ${hasBannerBackground ? 'border-[#ffffff]' : 'border-[#ffffff]'} px-3 rounded-full ml-4`}>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`py-1.5 w-full bg-transparent outline-none placeholder-[#ffffff] ${hasBannerBackground ? 'text-[#3f1f0a]' : 'text-[#ffffff]'}`}
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </div>

          <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
            <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
            <button className="absolute -top-2 -right-3 text-xs text-[#3f1f0a] bg-white w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>

          {user ? (
            <div className="relative group cursor-pointer">
              <img src={assets.profile_icon} className="w-10" alt="profile" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-[#0f172a] text-[#ffffff] shadow py-2.5 w-30 rounded-md text-[17px] z-40">
                <li onClick={() => navigate('my-orders')} className="p-1.5 pl-3 hover:scale-110 cursor-pointer">My Orders</li>
                <li onClick={logout} className="p-1.5 pl-3 hover:scale-110 cursor-pointer">Logout</li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowUserLogin(true);
              }}
              className={`cursor-pointer px-6 py-2 ${hasBannerBackground ? 'bg-[#ffffff] text-[#3f1f0a]' : 'bg-[#ffffff] text-[#3f1f0a] hover:scale-110'} rounded-full text-sm transition duration-200`}
            >
              Login
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;