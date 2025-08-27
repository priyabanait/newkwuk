'use client'
import React, { useState, useEffect, useRef } from "react";
import { 
  FaSearch, FaBars, FaTimes, FaBuilding,
  FaNetworkWired, FaUserTie, FaKey, FaUser,
  FaUsers, FaGlobe, FaHome, FaEnvelope, FaPhone,
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
  FaTwitter, FaTiktok, FaSnapchatGhost, FaWhatsapp, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

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
      { label: 'Instant Valuation', href: '/instantvaluation' },
      { label: 'Seller Guide', href: '/seller/sellerguid' },
      { label: 'Book/Search KW Agent', href: '/agent' },
      { label: 'Five Steps To Sell', href: '/seller' },
    ]},
    { label: 'Buy', key: 'buy', submenu: [
      { label: 'Property Search', href: '/buyer' },
      { label: 'New Development', href: '/properties/newdevelopment' },
      { label: 'Buyer Guide', href: '/buyer/buyerguid' }
    ] },
    { label: 'Rent', key: 'search', submenu: [
      { label: 'Rental Search', href: '/properties/rent' },
      { label: 'Recently Rented', href: '/properties/recentlyrented' },
    ]},
    { label: 'About', key: 'about', submenu: [
      { label: 'About Us', href:"/aboutus" },
      { label: 'Why KW', href: "/ourCulture/whyKW" },
      { label: "KW Training", href: "/training" },
      { label: "KW Technology", href: "/ourCulture/technology" },
      { label: "KW University", href: "https://console.command.kw.com/connect/learning" },
    ] },
    { label: 'Search Agent/Market Center', key: 'searchagent',  submenu: [
      { label: 'KW Agent', href: '/agent' },
      { label: "Jasmine MC", href: "/jasmin" },
      { label: "Jeddah MC", href: "/jeddah" },
    ]},
    { label: 'Join Us', key: 'join',  submenu: [
      { label: 'Become an Agent', href: '/joinus' },
      { label: 'Franchise',href: '/franchise'   }
    ]},
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
          bg-black backdrop-blur-sm
          ${isMobile ? (isAtTop ? 'm-10' : 'mx-6 my-0') : (desktopAtTop ? 'm-14' : 'mx-8 my-0')}
        `}
      >
        {/* Desktop Logo */}
        <div className="hidden md:flex flex-shrink-0 items-center h-[63.5px]">
          <Link href="/" className="block h-full">
            <Image
              src="/headerlogo.png"
              alt="KW Saudi Arabia Logo"
              width={279}
              height={64}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Mobile Logo */}
        <div className="flex md:hidden flex-shrink-0 items-center h-[63.5px]">
          <Link href="/" className="block h-full">
            <Image
              src="/kwline.png"
              alt="KW Saudi Arabia Logo"
              width={279}
              height={64}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center ">
          {menuItems.map(item => (
            <div key={item.key} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    type="button"
                    className={`flex items-center gap-1 text-[0.9rem] text-white font-semibold transition-colors focus:outline-none
                      ${["JOIN US", "CONTACT US"].includes(item.label) ? 'text-[rgb(206,32,39,255)]' : ''}
                      group-hover:text-white group-hover:bg-red-700 group-hover:border-red-700
                      px-4 h-[63.5px] border border-transparent
                    `}
                  >
                    {item.label}
                    <FaChevronDown  className="ml-1" />
                  </button>
                  <div className="absolute left-0 top-full min-w-[180px] bg-gray-950/95 border-t-4 border-transparent group-hover:border-red-700
                    shadow-lg z-40 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-200 mt-0 py-2 px-2 space-y-1">
                    {item.submenu.map((sub, idx) => (
                      <React.Fragment key={sub.href}>
                        <Link
                          href={sub.href}
                          className="block px-3 py-1 font-semibold text-white text-[0.9rem] hover:text-[rgb(206,32,39,255)] whitespace-nowrap transition-colors"
                        >
                          {sub.label}
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
                  className={`flex items-center gap-1 text-[0.9rem] font-semibold transition-colors px-4 h-[63.5px] border border-transparent
                    ${["JOIN US", "CONTACT US"].includes(item.label) ? 'text-[rgb(206,32,39,255)] hover:text-white hover:bg-red-700 hover:border-red-700' : 'text-white hover:text-white hover:bg-red-700 hover:border-red-700'}
                  `}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Language Dropdown */}
          <div className="flex">
            <div className="relative group">
              <button
                type="button"
                className="flex items-center font-semibold px-4 h-[63.5px] text-white bg-gray-700 text-[0.9rem] border border-gray-700 hover:bg-gray-300"
              >
                عربي
                <FaChevronDown  className="ml-1" />
              </button>
              <div className="absolute left-0 top-full min-w-[120px] bg-gray-950/95 shadow-lg z-40
                opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none
                transition-all duration-200 py-2 px-2 space-y-1 border-t-4 border-transparent group-hover:border-red-700 font-semibold">
                <Link href="#" className="block px-3 py-1 text-white text-[0.9rem] hover:text-[rgb(206,32,39,255)]">English</Link>
                <div className="h-px bg-gray-700 my-1 w-full" />
                <Link href="#" className="block px-3 py-1 text-white text-[0.9rem] hover:text-[rgb(206,32,39,255)]">عربي</Link>
              </div>
            </div>

            {/* Contact Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center font-semibold px-4 h-[63.5px] text-white bg-red-700 text-[0.9rem] border border-red-700 border-l-0"
              >
                Contact
                <FaChevronDown  className="ml-1" />
              </button>
              <div className="absolute left-0 top-full min-w-[160px] bg-gray-950/95 shadow-lg z-40
                opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none
                transition-all duration-200 py-2 px-2 space-y-1 border-t-4 border-transparent group-hover:border-red-700 font-semibold">
                <Link href="/agent" className="block px-3 py-1 text-white text-[0.9rem] hover:text-[rgb(206,32,39,255)]">KW Agent</Link>
                <div className="h-px bg-gray-700 my-1 w-full" />
                <Link href="/contactUs" className="block px-3 py-1 text-white text-[0.9rem] hover:text-[rgb(206,32,39,255)]">Contact Us</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={20} className="text-white" /> : <FaBars size={20} className="text-white" />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute md:hidden top-full left-0 right-0 py-4 ml-24 mr-2 px-4 space-y-4 shadow-lg bg-black backdrop-blur-sm z-50 border-t-4 border-[rgb(206,32,39,255)]">
            {menuItems.map(item => (
              <div key={item.key}>
                {item.submenu ? (
                  <div
                    onClick={() => toggleSubmenu(item.key)}
                    className="flex justify-between items-center px-2 text-white hover:text-gray-300 transition-colors cursor-pointer border-b border-gray-700"
                  >
                    <span className={openSubmenu === item.key ? 'text-white font-semibold' : 'text-white'}>
                      {toTitleCase(item.label)}
                    </span>
                    {openSubmenu === item.key ? (
                      <FaChevronUp  className="text-white" />
                    ) : (
                      <FaChevronDown  className="text-white" />
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-1 font-semibold transition-colors border-b border-gray-700 text-white hover:text-[rgb(206,32,39,255)]"
                  >
                    {item.label}
                  </Link>
                )}

                {item.submenu && openSubmenu === item.key && (
                  <div className="mt-1 space-y-3 text-base text-white bg-gray-700 px-3 py-2">
                    {item.submenu.map((sub, idx) => (
                      <React.Fragment key={sub.href}>
                        <Link href={sub.href} className="block">{sub.label}</Link>
                        {idx !== item.submenu.length - 1 && <div className="h-px bg-gray-400 my-1 w-full" />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Language Dropdown */}
            <div
              onClick={() => toggleSubmenu('عربي')}
              className="flex justify-between items-center px-2 text-white hover:text-gray-300 transition-colors cursor-pointer py-1 border-b border-gray-700"
            >
              <span className={openSubmenu === 'عربي' ? ' font-semibold underline' : 'text-white'}>عربي</span>
              {openSubmenu === 'عربي' ? <FaChevronUp  className="text-white" /> : <FaChevronDown  className="text-white" />}
            </div>
            {openSubmenu === 'عربي' && (
              <div className=" text-base text-white bg-gray-700 px-3 py-2">
                <Link href="#" className="block">English</Link>
                <div className="h-px bg-gray-400 my-1 w-full" />
                <Link href="#" className="block">عربي</Link>
              </div>
            )}

            {/* Mobile Contact Dropdown */}
            <div
              onClick={() => toggleSubmenu('contact')}
              className="flex justify-between items-center  text-white bg-[rgb(206,32,39,255)] px-2 py-2 cursor-pointer border border-[rgb(206,32,39,255)]"
            >
              <span className={openSubmenu === 'contact' ? ' font-semibold' : 'text-white'}>Contact</span>
              {openSubmenu === 'contact' ? <FaChevronUp  className="text-white" /> : <FaChevronDown  className="text-white" />}
            </div>
            {openSubmenu === 'contact' && (
              <div className="mt-1 text-base text-white bg-gray-700 px-3 py-2">
                <Link href="/agent" className="block">KW Agent</Link>
                <div className="h-px bg-gray-400 my-1 w-full" />
                <Link href="/contactUs" className="block">Contact Us</Link>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
