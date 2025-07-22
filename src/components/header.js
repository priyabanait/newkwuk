'use client'
import React, { useState, useEffect, useRef } from "react";
import { 
  FaSearch, FaBars, FaTimes, FaBuilding,
  FaNetworkWired, FaUserTie, FaKey, FaUser,
  FaUsers, FaGlobe, FaHome, FaEnvelope, FaPhone,
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
  FaTwitter, FaTiktok, FaSnapchatGhost, FaWhatsapp, FaChevronDown 
} from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronUp } from 'react-icons/fa';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);  
  const [isAtTop, setIsAtTop] = useState(true);  
  const prevScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [desktopAtTop, setDesktopAtTop] = useState(true);

  const toggleSubmenu = (key) => {
    setOpenSubmenu(prev => (prev === key ? null : key));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setDesktopAtTop(currentScrollY < 10);
      setIsAtTop(currentScrollY < 10);
      setIsVisible(true);
      prevScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Sell', key: 'sell',  submenu: [
      { label: 'INSTANT VALUATION', href: '/instantvaluation' },
      { label: 'SELLER GUIDE', href: '/seller/sellerguid' },
      { label: 'Book/Search KW Agent', href: '/agent' },
      { label: 'Five Steps To Sell', href: '/seller' },
    ]},
    { label: 'Buy', key: 'buy', submenu: [
      { label: 'Property Search', href: '/properties' },
      { label: 'NEW DEVELOPMENT', href: '/properties/newdevelopment' },
      { label: 'BUYER GUIDE', href: '/buyer/buyerguid' }
    ] },
    { label: 'Search', key: 'search', submenu: [
      { label: 'Active', href: '/properties/active' },
      { label: 'Sold', href: '/properties/sold' },
      { label: 'Rent', href: '/properties/rent' },
      { label: 'Auction', href: '/properties/auction' },
      { label: 'NEW DEVELOPMENT', href: '/properties/newdevelopment' },
      { label: 'INTERNATIONAL', href: 'https://www.kw.com/search/sale?viewport=56.41671222773751%2C120.63362495324327%2C-14.684966046563696%2C-6.807781296756721' }
    ]},
    { label: 'About', key: 'about', submenu: [
      { label: 'About Us', href:"/aboutus" },
      { label: 'Why KW', href: "/ourCulture/whyKW" },
      { label: "KW Training", href: "/training" },
      { label: "KW Technology", href: "/ourCulture/technology" },
      { label: "KW University", href: "https://console.command.kw.com/connect/learning" },
    ] },
    { label: 'Join Us', key: 'join',  submenu: [
      { label: 'Become an AGENT', href: '/joinus' },
      { label: 'FRANCHISE',href: '/franchise'   }
    ]},
    { label: 'Contact Us', key: 'contact', submenu: [
      { label: "Jasmine", href: "/riyadh" },
      { label: "Jeddah", href: "/jeddah" },
      { label: 'KW AGENT', href: '/agent' },
      { label: "Contact Us", href: "/contactUs" },
    ] },
  ];

  const toTitleCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <header
        className={`
          pointer-events-auto
          flex justify-between items-left h-[63.5px]
          transition-all duration-300 ease-in-out
          translate-y-0
          bg-gray-950/90 backdrop-blur-sm
          ${isMobile ? (isAtTop ? 'm-10' : 'mx-6 my-0') : (desktopAtTop ? 'm-14' : 'mx-8 my-0')}
        `}
      >
        <div className="flex-shrink-0 h-16 flex items-center -ml-1 md:-ml-1">
          <Link href="/">
            <Image 
              src="/kwlogohomee.png" 
              alt="KW Saudi Arabia Logo" 
              width={279}
              height={73}
              className="md:h-[65px] h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 tracking-wider">
          {menuItems.map(item => (
            <div key={item.key} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[0.9rem] text-white font-semibold transition-colors focus:outline-none
                      ${["JOIN US", "CONTACT US"].includes(item.label) ? 'text-[rgba(202,3,32,255)]' : ''}
                      group-hover:text-[rgba(202,3,32,255)] group-hover:underline
                    `}
                  >
                    {toTitleCase(item.label)}
                    <FaChevronDown size={12} className="ml-1" />
                  </button>
                  <div className="absolute left-0 top-full min-w-[180px] bg-gray-950/95 shadow-lg rounded-b z-40 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-200 mt-0 py-2 px-2 space-y-1">
                    {item.submenu.map((sub, idx) => (
                      <React.Fragment key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block px-3 py-1 text-white text-[0.9rem] hover:text-[rgba(202,3,32,255)] whitespace-nowrap rounded transition-colors"
                        >
                          {toTitleCase(sub.label)}
                        </Link>
                        {idx !== item.submenu.length - 1 && (
                          <div className="h-px bg-gray-700 my-1 w-full" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`text-[0.9rem] font-semibold transition-colors ${["JOIN US", "CONTACT US"].includes(item.label) ? 'text-[rgba(202,3,32,255)] hover:text-[rgba(202,3,32,255)]' : 'text-white hover:text-[rgba(202,3,32,255)]'}`}
                >
                  {toTitleCase(item.label)}
                </Link>
              )}
            </div>
          ))}
          <Link href="#" className="text-base font-semibold ml-4 mr-8 text-white hover:text-gray-300 transition-colors">
            عربي
          </Link>
          <Link 
            href="/instantvaluation"
            className="border-l border-red-700  font-semibold px-4 py-5.5 text-white bg-red-700 transition-colors text-[0.9rem]"
          >
            Instant Valuation
          </Link>
        </nav>

        <button 
          className="md:hidden text-white focus:outline-none p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FaTimes size={20} className="text-white" />
          ) : (
            <FaBars size={20} className="text-white" />
          )}
        </button>

        {isMenuOpen && (
          <div className="absolute md:hidden top-full ml-10 left-0 right-0 py-4 px-6 space-y-4 shadow-lg bg-gray-950/90 backdrop-blur-sm z-50">
            {menuItems.map(item => (
              <div key={item.key}>
                {item.submenu ? (
                  <div
                    onClick={() => toggleSubmenu(item.key)}
                    className="flex justify-between items-center text-white hover:text-gray-300 transition-colors cursor-pointer py-1"
                  >
                    <span
                      className={
                        openSubmenu === item.key
                          ? 'text-[rgba(202,3,32,255)] font-semibold underline'
                          : ["JOIN US", "CONTACT US"].includes(item.label)
                          ? 'text-[rgba(202,3,32,255)] font-semibold'
                          : 'text-white'
                      }
                    >
                      {toTitleCase(item.label)}
                    </span>
                    {item.submenu && (
                      openSubmenu === item.key ? (
                        <FaChevronUp size={14} className="text-white" />
                      ) : (
                        <FaChevronDown size={14} className="text-[rgba(202,3,32,255)]" />
                      )
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-1 font-semibold transition-colors ${["JOIN US", "CONTACT US"].includes(item.label) ? 'text-[rgba(202,3,32,255)] hover:text-[rgba(202,3,32,255)]' : 'text-white hover:text-[rgba(202,3,32,255)]'}`}
                  >
                    {toTitleCase(item.label)}
                  </Link>
                )}
                {item.submenu && openSubmenu === item.key && (
                  <div className="mt-1 space-y-3 text-base text-gray-300">
                    {item.submenu.map((sub, idx) => (
                      <React.Fragment key={sub.href}>
                        <Link href={sub.href} className="block hover:text-white">
                          {toTitleCase(sub.label)}
                        </Link>
                        {idx !== item.submenu.length - 1 && (
                          <div className="h-px bg-gray-700 my-1 w-full" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </header>
    </div>
  );
};

export default Header;
