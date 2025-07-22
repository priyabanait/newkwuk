'use client'

import { FaSearch, FaBars, FaTimes, FaBuilding, FaChevronDown, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaQuoteRight,FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef,useState,useEffect,useMemo  } from 'react';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Home = () => {
 
  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  // Hero background images array and index state
  const heroImages = [
    "/Banner 1.png",
    "/Banner 2.png",
    "/Banner 3.png",
   
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const [isBlurring, setIsBlurring] = useState(true);
  const [prevHeroIndex, setPrevHeroIndex] = useState(null);
  const stats = [
    { value: '$532B', label1: 'Total Sales Volume', label2: 'Worldwide' },
    { value: '$1.4B', label1: 'Closed Transactions', label2: 'Worldwide' },
    { value: '1002', label1: 'Market Centers', label2: 'Worldwide' },
    { value: '191K', label1: 'Real Estate Agents', label2: 'Worldwide' },
  ];
  const testimonials = [
    {
      quote: "Everyone I have dealt with from your office has made selling my house so easy. It is the best experience I have had; I was also surprised at the length of time it took to sell my house less than a week. Graeme Nimmo came out to value the property. Any time I had to contact the office they were very helpful. I would recommend Keller Williams.",
      name: "Lynn Mackie",
      role: "Customer",
    },
    {
      quote: "Excellent service provided by Tom Kissock from start to finish. He maintained contact throughout the process, providing regular updates, and responded to any questions / queries that we had, promptly. Nothing was too much trouble, despite us being rather demanding customers! We would strongly recommend Tom and Keller Williams for all your moving needs.",
      name: "Jane G. Tain",
      role: "Customer",
    },
    {
      quote: "Parmjot at Keller Williams was exceedingly helpful and attentive throughout the process of purchasing our home, from our initial interest in viewing the property right through to completion and even beyond. Parmjot went out of her way to be available for viewings at times that fit in around our work, including evenings and weekends, and was never too busy to take our calls. Parmjot always conducted herself in a very professional manner and provided excellent communication.",
      name: "James and Laura, Brixton",
      role: "Customer",
    },
    {
      quote: " Amanda was professional throughout and kept us well informed throughout the time the flat was on the market. She was a pleasure to deal with. We would recommend Amanda to future sellers. Thanks again.",
      name: "Lorna.",
      role: "Customer",
    },
  ];const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 10000); // 20 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevHeroIndex(heroIndex);
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [heroIndex, heroImages.length]);

  useEffect(() => {
    setIsBlurring(true);
    const timeout = setTimeout(() => setIsBlurring(false), 800); // 0.8s blur duration
    return () => clearTimeout(timeout);
  }, [heroIndex]);

  useEffect(() => {
    if (prevHeroIndex !== null) {
      const timeout = setTimeout(() => setPrevHeroIndex(null), 800); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [prevHeroIndex]);
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  // Trending properties state
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  // Helper function to format numbers with commas
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toLocaleString('en-US');
    }
    if (typeof price === 'string' && !isNaN(Number(price))) {
      return Number(price).toLocaleString('en-US');
    }
    return price || '';
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setLoadingProperties(true);
      try {
        const response = await axios.post('https://kw-backend-q6ej.vercel.app/api/listings/list/properties', {});
        setProperties(response.data.data || []);
      } catch (error) {
        setProperties([]);
        // Optionally handle error
      } finally {
        setLoadingProperties(false);
      }
    };
    fetchProperties();
  }, []);
  const [clear, setClear] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setClear(true)
    }, 1000) // 1 second

    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    const el = scrollRef.current;

    const checkOverflow = () => {
      if (el && el.scrollWidth > el.clientWidth) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    checkOverflow(); // Initial check
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [properties]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowBackButton(el.scrollLeft > 0);
    };

    el.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [properties]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const [activeTab, setActiveTab] = useState('property');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse drag handlers for carousel
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll-fastness multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  // Add separate state for each search input
  const [propertySearchTerm, setPropertySearchTerm] = useState('');
  const [agentSearchTerm, setAgentSearchTerm] = useState('');
  const [mobilePropertySearchTerm, setMobilePropertySearchTerm] = useState('');
  const [mobileAgentSearchTerm, setMobileAgentSearchTerm] = useState('');
  return (
    <div className="relative p-6 md:p-8">
    
  {/* Sticky Header */}
 
    <Header />


    <div className="absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgba(202,3,32,255)] z-0"></div>

{/* Hero Section */}
<div className="relative ">

  <section className="relative w-full h-[74vh] md:h-[146vh] text-white">
    {/* Background Image with previous blurring out and next coming in */}
    <div className="absolute inset-0 z-0">
      {/* Previous image, if any */}
      {prevHeroIndex !== null && (
        <motion.div
          key={prevHeroIndex}
          initial={{ opacity: 1, filter: "blur(0.5rem)" }}
          animate={{ opacity: 0, filter: "blur(1.5rem)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          <Image
            src={heroImages[prevHeroIndex]}
            alt="Previous Hero Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
            className="z-0"
          />
        </motion.div>
      )}
      {/* Current image */}
      <motion.div
        key={heroIndex}
        initial={{ opacity: 0, filter: "blur(1.5rem)" }}
        animate={{ opacity: 1, filter: "blur(0rem)" }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
      >
        <Image
          src={heroImages[heroIndex]}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          className="z-0"
        />
      </motion.div>
    </div>
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="inset-0 bg-opacity-60 z-10" />

    {/* Content */}
    <div className="relative max-w-full mx-2 md:mx-10 px-2 mt-0 md:mt-0 md:px-20 flex flex-col  h-full">
      <h1 className="text-3xl sm:text-2xl mt-20 md:mt-40 md:pt-10 md:text-5xl font-bold mb-3 md:mb-6 leading-tight">
        Protect your move with a <br className="hidden md:block" /> Keller Williams Agent.
      </h1>

      <p className="text-sm sm:text-base md:text-lg font-semibold mb-3 md:mb-8 max-w-full md:max-w-2xl">
        Our real estate agents are business owners, not employees, so you get more choice, time, and a better experience.
        Get expert advice from the largest real estate franchise in the world.
      </p>

      {/* Tabs */}
      <div className="w-full flex flex-col items-left">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 md:gap-8 text-sm sm:text-base md:text-xl font-semibold w-fit mb-4 md:mb-6">
        <span
          onClick={() => setActiveTab('property')}
          className={`pb-1 sm:pb-2 cursor-pointer border-b-4 ${
            activeTab === 'property' ? 'border-[rgba(202,3,32,255)]' : 'border-transparent'
          }`}
        >
          Find a property
        </span>

        <span
          onClick={() => setActiveTab('agent')}
          className={`pb-1 sm:pb-2 cursor-pointer border-b-4 ${
            activeTab === 'agent' ? 'border-[rgba(202,3,32,255)]' : 'border-transparent'
          }`}
        >
          Find an agent
        </span>
      </div>

      {/* Desktop View */}
<div className="hidden md:flex md:max-w-2xl p-2 bg-white flex-col md:flex-row items-center gap-2 md:gap-3 rounded-full shadow-lg">

{activeTab === 'property' ? (
  <>
    <FaSearch className="text-gray-500 ml-3 md:text-xl text-sm" />
    <input
      type="text"
      value={propertySearchTerm}
      onChange={e => setPropertySearchTerm(e.target.value)}
      placeholder="City, Area or Buildings"
      className="flex-1 w-full px-2 py-2 md:py-3 text-black text-base md:text-xl rounded-full outline-none"
    />
    <div className="flex gap-2 md:gap-3">
      <button
        className=" bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-6 sm:px-10 md:px-15 py-2 md:py-3 text-base md:text-xl font-semibold rounded-full"
        onClick={() => router.push(`/properties/type/sale?q=${encodeURIComponent(propertySearchTerm)}`)}
      >
        Sale
      </button>
      <button
        className="bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-6 sm:px-10 md:px-15 py-2 md:py-3 text-base md:text-xl font-semibold rounded-full"
        onClick={() => router.push(`/properties/type/rent?q=${encodeURIComponent(propertySearchTerm)}`)}
      >
        Rent
      </button>
    </div>
  </>
) : (
  <>
    <FaSearch className="text-gray-500 ml-3 md:text-xl text-sm" />
    <input
      type="text"
      value={agentSearchTerm}
      onChange={e => setAgentSearchTerm(e.target.value)}
      placeholder="Name or Market Center"
      className="flex-1 px-3 py-2 text-black text-sm sm:text-base md:text-xl outline-none"
    />
    <button className="w-full md:w-auto bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-6 sm:px-10 md:px-15 py-2 md:py-3 text-sm sm:text-base md:text-xl font-semibold border rounded-full mt-2 md:mt-0">
      Search
    </button>
  </>
)}
</div>


      {/* Mobile View */}
      <div className="flex md:hidden w-full max-w-full p-2 bg-white items-center gap-2 rounded-full ">

        {activeTab === 'property' ? (
          <>
          <FaSearch className="text-gray-500  text-3xl" />
            <input
              type="text"
              value={mobilePropertySearchTerm}
              onChange={e => setMobilePropertySearchTerm(e.target.value)}
              placeholder="City, Area or Buildings"
              className="flex-shrink-0 w-[150px]  py-2 text-black text-xs rounded-full outline-none"
            />
            <button className="flex-shrink-0 bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-2 py-2 text-xs font-semibold rounded-full">
              Sale
            </button>
            <button className="flex-shrink-0 bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-2 py-2 text-xs font-semibold rounded-full">
              Rent
            </button>
          </>
        ) : (
          <>
          <FaSearch className="text-gray-500 ml-3 md:text-xl text-sm" />
            <input
              type="text"
              value={mobileAgentSearchTerm}
              onChange={e => setMobileAgentSearchTerm(e.target.value)}
               placeholder="Name or Market Center"
              className="flex-shrink-0 w-[150px] px-2 py-2 text-black text-xs rounded-full outline-none"
            />
             <button className="w-full md:w-auto bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm sm:text-base md:text-xl font-semibold border rounded-full mt-2 md:mt-0">
              Search 
            </button>
          </>
        )}
      </div>
    </div>

      {/* Logos */}
      {/* <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 md:gap-6 mt-6 md:mt-12 items-center">
  <Image 
    src="https://www.kwuk.com/wp-content/uploads/2022/12/portal-logos-home-update-new.svg" 
    alt="Rightmove" 
    width={100} 
    height={40} 
    className="w-[300px] sm:w-[50px] md:w-[700px] h-auto object-contain"
  />
</div> */}

    </div>
  </section>

</div>


      <hr className="w-44 mx-auto bg-[rgba(202,3,32,255)] h-[1.5px] border-0 my-12 md:hidden" />

        {/* Image Grid Section */}
        {/* <div className="md:mx-8 mx-2 md:py-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-0 md:gap-2">
    {[
      { label: "Properties", path: 'properties', imageUrl: "/properties.jpg" },
      { label: "Market Center", path: 'marketCenter', imageUrl: "/marketcenter.jpg" },
      { label: "Agent", path: 'agent', imageUrl: "/agent.jpg" },
      { label: "Seller", path: 'seller', imageUrl: "/seller.jpg" },
      { label: "Buyer", path: 'buyer', imageUrl: "/buyer.jpg" },
      { label: "Tenant", path: 'tenant', imageUrl: "/tenant.jpg" },
      { label: "Franchise", path: 'franchise', imageUrl: "/franchise.jpg" },
      { label: "Our Culture", path: 'ourCulture', imageUrl: "/ourculture.jpg" },
    ].map(({ label, imageUrl, path }, i) => (
      <Link href={path} key={i} className="group">
        <div className="rounded-xl md:py-6 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 cursor-pointer">
          <Image
            src={imageUrl}
            alt={label}
            width={120}
            height={100}
            className="h-20 w-20 md:h-52 md:w-52 object-contain"
          />
        </div>
      </Link>
    ))}
  </div> */}

        {/* <div className="flex justify-center items-center md:my-0 my-8 mt-10 md:mt-0 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8">
          <hr className="md:w-170 w-44 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px]" />
        </div>
        <div className="md:w-1/3 md:text-center text-center mb-6 md:mb-0">
       
    </div>
    <div className="flex justify-center text-center my-8 md:my-0 md:mt-30">
          <h1 className="text-center text-[1rem] md:text-[2.2rem] font-bold"><span className="text-[rgba(202,3,32,255)]">OUR </span> MARKET CENTERS</h1>
        </div>
        <div className="w-full mx-auto px-2 md:px-12 lg:px-18 md:py-14 py-4 md:mt-12">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-20">
       
            <div className="lg:w-1/2 overflow-hidden">
          <Link href="/riyadh">
            <Image
              src="/riyaddh.jpg"
              alt="Real Estate Property"
              width={800}
              height={500}
              className={`w-full h-auto max-h-[250px] md:max-h-[530px] object-contain transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                clear ? 'blur-0' : 'blur-xs'
              }`}
            />
          </Link>
        </div>

       
        <div className="lg:w-1/2 overflow-hidden">
          <Link href="/jeddah">
            <Image
              src="/jeddhah.jpg"
              alt="Real Estate Agent"
              width={800}
              height={500}
              className={`w-full h-auto max-h-[250px] md:max-h-[530px] object-contain transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                clear ? 'blur-0' : 'blur-xs'
              }`}
            />
          </Link>
        </div>
          </div>
        </div> */}

        {/* <div className="flex flex-col justify-center items-center md:my-16 my-8 md:gap-2">
     
      <div className="w-full text-center mb-8">
        <h1 className="text-[1rem] md:text-[2.2rem] font-bold">
          <span className="text-[rgba(202,3,32,255)]">TOOLS</span> FOR YOUR NEEDS
        </h1>
      </div>

      
      <div className="w-full md:px-100 px-2 md:px-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 justify-center">
          {[
            {
              label: "Seller",
              path: "seller/sellerguid",
              imageUrl: "/sellerguid.jpg",
            },
            {
              label: "Buyer",
              path: "buyer/buyerguid",
              imageUrl: "/buyerguid.jpg",
            },
            {
              label: "Tenant",
              path: "tenant",
              imageUrl: "/tenantguid.jpg",
            },
            {
              label: "KW Training",
              path: "training",
              imageUrl: "/kwtraining.jpg",
            },
          ].map(({ imageUrl, path }, i) => (
            <Link href={path} key={i} className="group">
              <div className="rounded-xl p-2 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <Image
                  src={imageUrl}
                  alt="image"
                  width={120}
                  height={100}
                  className="h-20 w-20 md:h-40 md:w-40 object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div> */}


       
      
    {/*  <main className="w-full md:mt-4 mt-0">
  <div className="flex flex-col lg:flex-row min-h-screen"> 

  
    <div className="w-full lg:w-1/2 h-[40vh] md:h-[50vh] lg:h-auto relative min-h-[400px]"> 
      <Image
        src="/formimage.jpg"
        alt="Property"
        fill
        className="object-cover"
      />
    </div>


   <div className="w-full lg:w-1/2 flex items-center justify-center bg-[rgba(202,3,32,255)] py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl">

        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-normal text-white mb-4 sm:mb-6 md:mb-8 text-center sm:text-left leading-snug">
          YOUR FUTURE MARKET CENTER STARTS WITH ONE BOLD STEP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-6">
          <div>
            <label className="block text-white text-sm sm:text-base md:text-lg font-normal ml-2 mb-1 sm:mb-2" htmlFor="first-name">
              First Name
            </label>
            <input
              className="w-full px-4 py-2 sm:py-3 border text-gray-200 text-sm sm:text-base md:text-lg border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
              id="first-name"
              type="text"
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="block text-white text-sm sm:text-base md:text-lg font-normal ml-2 mb-1 sm:mb-2" htmlFor="last-name">
              Last Name
            </label>
            <input
              className="w-full px-4 py-2 sm:py-3 border text-gray-200 text-sm sm:text-base md:text-lg border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
              id="last-name"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <label className="block text-white text-sm sm:text-base md:text-lg font-normal ml-2 mb-1 sm:mb-2" htmlFor="purpose">
            I Want To
          </label>
          <input
            className="w-full sm:w-3/4 md:w-1/2 px-4 py-2 sm:py-3 border text-gray-200 text-sm sm:text-base md:text-lg border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent"
            id="purpose"
            type="text"
            placeholder="Buy Property, Find agent"
          />
        </div>

        <div className="mb-4 md:mb-6">
          <label className="block text-white text-sm sm:text-base md:text-lg font-normal ml-2 mb-1 sm:mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            className="w-full px-4 py-2 sm:py-3 border text-gray-200 text-sm sm:text-base md:text-lg border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent resize-none"
            id="notes"
            rows="3"
            placeholder="Your message"
          ></textarea>
        </div>

        <button className="w-full sm:w-3/5 md:w-2/5 bg-white text-[rgba(202,3,32,255)] font-bold text-sm sm:text-base py-3 sm:py-4 border px-4 sm:px-6 rounded-3xl transition duration-200 hover:bg-gray-100  block">
          Submit
        </button>

      </div>
    </div>

  </div> 
</main>*/}


      {/* Stats Section */}
      <div className="relative h-[200px] md:h-400">
        {/* Background Image */}
        <div className="absolute inset-0 md:inset-[-10] z-0 h-[120px] md:h-200">
          <Image
            src="/mapbg.jpg"
            alt="Company showcase"
            fill
            className="w-full h-[120px] md:h-200 object-contain"
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 px-2 sm:px-8 md:pt-2 my-4 text-black text-center bg-white/50">
      {/* Heading */}
      <div className="mt-10 mb-6 md:mb-0 md:mt-20 text-center">
<h1 className="text-2xl md:text-4xl font-bold mb-2">
  Keller Williams
</h1>
<hr className="w-44 md:w-120 mt-8 mb-10 mx-auto border-[rgba(202,3,32,255)] border-t-2" />
<p className="text-lg font-bold ">We focus on the customer not the competition.</p>
<p className="my-2 text-lg">As the largest, fastest-growing real estate franchise in the world, Keller Williams is at the forefront of tech, training and culture.
</p>
</div>


      {/* Stats Grid */}
      <div className="grid grid-cols-2 items-center justify-center md:grid-cols-4 gap-2 md:gap-8  mt-10 md:mt-40 max-w-full mx-2 md:mx-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="text-center p-2"
          >
            <p className="text-lg md:text-5xl font-bold mb-2 md:mb-4">{stat.value}</p>
            <div className="flex items-center justify-center md:max-w-[200px] max-w-[100px] mx-auto my-2 md:my-4">
              <div className="flex-1 h-px bg-[rgba(202,3,32,255)]"></div>
              <div className="flex-1 h-px bg-gray-500"></div>
            </div>
            <p className="md:text-[1rem] text-[0.7rem] leading-tight">{stat.label1}</p>
            <p className="md:text-[1rem] text-[0.7rem] leading-tight">{stat.label2}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 md:mt-80 text-center">
<h1 className="text-2xl md:text-4xl font-bold mb-2">
About Keller Williams
</h1>


<p className="text-base md:text-lg font-semibold py-4 md:py-6">You come FIRST with Keller Williams. Your trust is our business.</p>
<hr className="w-44 md:w-120 my-8 mx-auto border-[rgba(202,3,32,255)] border-t-2" />
<p className="my-2 text-base md:text-lg mx-2 md:mx-40 leading-relaxed"> Maya Angelou said, &quot;People may not remember exactly what you did, or what you said, but they will always remember how you made them feel.&quot; By building understanding, trust, and respect, we can do what it takes to make things happen for you. We know how to deliver a dedicated and bespoke service. We want you to know, but more importantly, feel that we are there for every step of the property journey. Because we will be. Whether you need us today, or in the coming years, we are here to serve. As your local agent, 
we hope to become your go-to property adviser for life. As we are also part of the global Keller Williams&apos; family, our local hands have a global reach.</p>
<p className="text-base md:text-lg font-semibold py-4 md:py-6">One call could build you a better tomorrow.</p>
</div>
 <button className="w-full md:w-90 bg-[rgba(202,3,32,255)] text-white py-2 md:py-3 rounded-full text-xs md:text-sm mt-6 md:mt-10 relative overflow-hidden group transition-all duration-300 hover:pr-8 hover:pl-4" onClick={() => router.push('/ourCulture/whyKW')}>
    <span className="inline-block md:text-base text-sm font-semibold transition-all duration-300 group-hover:-translate-x-3">
     Why Choose Keller Williams
    </span>
    <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white group-hover:translate-x-0 translate-x-4">
    <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
    </span>
  </button>
       
      </div>
    </div>

    <div className="flex flex-col items-center justify-center my-8 md:my-0  text-center px-2 mt-300 md:px-4 md:mb-30 bg-gray-100 border border-gray-100 rounded-3xl">
  <h1 className="text-lg md:text-[2.5rem] mt-6 md:mt-10 font-bold mb-2 md:mb-4">
    <span className="text-[rgba(202,3,32,255)]">OUR </span>TRENDING PROPERTIES
  </h1>
  <h2 className="text-base md:text-xl font-semibold text-gray-600 mb-4 md:mb-6">
    Start Your Search <span className="text-[rgba(202,3,32,255)]">Here</span>
  </h2>

  <div className="hidden md:flex w-full max-w-full md:max-w-3xl p-2 bg-white  flex-col md:flex-row items-center gap-2 md:gap-3 rounded-full shadow-lg">
    
  <FaSearch className="text-gray-500 ml-3 md:text-xl text-sm" />
  <input
      type="text"
      value={propertySearchTerm}
      onChange={e => setPropertySearchTerm(e.target.value)}
      placeholder="City, Area or Buildings"
      className="flex-1 w-full px-2 py-2 md:py-3 text-black text-base md:text-xl rounded-full outline-none"
    />
    <div className="flex gap-2 md:gap-3 w-full md:w-auto">
      <button className="flex-1 md:flex-none bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 sm:px-10 md:px-15 py-2 md:py-3 text-base md:text-xl font-semibold rounded-full">
        Sale
      </button>
      <button className="flex-1 md:flex-none bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 sm:px-10 md:px-15 py-2 md:py-3 text-base md:text-xl font-semibold rounded-full">
        Rent
      </button>
    </div>
  </div>

  <div className="flex md:hidden w-full max-w-full p-2 bg-white items-center gap-2 rounded-full ">
 

  <FaSearch className="text-gray-500 ml-2 text-sm" />
            <input
              type="text"
              value={mobilePropertySearchTerm}
              onChange={e => setMobilePropertySearchTerm(e.target.value)}
              placeholder="City, Area or Buildings"
              className="flex-shrink-0 w-[150px]  py-2 text-black text-xs rounded-full outline-none"
            />
            <button className="flex-shrink-0 bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-2 py-2 text-xs font-semibold rounded-full">
              Sale
            </button>
            <button className="flex-shrink-0 bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-2 py-2 text-xs font-semibold rounded-full">
              Rent
            </button>
  
</div>
  

        {/* First Home Block */}
        <div className="relative w-full px-4 md:px-10  py-8 md:py-15 ">
    {/* Backward Button */}
    {showBackButton && (
      <button
        onClick={handleScrollLeft}
        className="absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 
                   bg-white border border-gray-300 rounded-full p-2 md:p-4 
                   shadow-md z-10 hover:shadow-lg transition"
      >
        <FaChevronLeft 
          className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
        />
      </button>
    )}
    <div
      ref={scrollRef}
      className="flex gap-2 md:gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {loadingProperties ? (
        <div className="w-full flex justify-center items-center h-40 text-lg">Loading properties...</div>
      ) : properties.length === 0 ? (
        <div className="w-full flex justify-center items-center h-40 text-lg">No properties found.</div>
      ) : (
        properties.map((property, index) => (
          <div
            key={index}
            className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[90%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[180px] rounded-xl overflow-hidden shadow-md bg-white relative cursor-pointer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                localStorage.setItem('selectedProperty', JSON.stringify(property));
                router.push(`/propertydetails/${property._kw_meta?.id || property.id || index}`);
              }
            }}
          >
            {/* 360 Logo in the top-left corner */}
            <div className="absolute top-4 left-4 z-20">
              <Image
                src="/360logo.png"
                alt="360 Logo"
                width={40}
                height={40}
                className="rounded-full bg-white/80 p-1 shadow"
              />
            </div>
            {(
              property.image ||
              (Array.isArray(property.images) && property.images[0]) ||
              (Array.isArray(property.photos) && property.photos[0]?.ph_url)
            ) ? (
              <Image
                src={
                  property.image ||
                  (Array.isArray(property.images) && property.images[0]) ||
                  (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
                  '/properties.jpg'
                }
                alt={property.title || property.property_title || 'Property'}
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-200 via-white to-red-100 text-[rgba(202,3,32,255)] font-bold text-lg md:text-2xl animate-pulse rounded-xl border-2 border-dashed border-[rgba(202,3,32,255)]">
                Coming Soon!
              </div>
            )}
            <div className="absolute bottom-4 left-4 text-white drop-shadow">
                <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
                <p className="text-sm">
                  {typeof property.location === 'string'
                    ? property.location
                    : property.list_address?.city ||'-'}
                </p>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
                {property.price ? `SAR ${formatPrice(property.price)}` : property.current_list_price ? `SAR ${formatPrice(property.current_list_price)}` : ''}
              </div>
            </div>
        ))
      )}
    </div>

    {showScrollButton && (
      <button
      onClick={scrollRight}
      className="absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 
                 bg-white border border-gray-300 rounded-full p-2 md:p-4 
                 shadow-md z-10 hover:shadow-lg transition"
    >
     <ChevronRight 
     className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
   />
   
    </button>
    )}
  </div>
</div>
    <div className="bg-gray-100 mt-10 md:mt-0  mx-2 md:mx-0 border-gray-100 md:border-l md:rounded-l-3xl flex flex-col md:flex-row">

{/* Mobile Version: Stacked */}
<div className="md:hidden flex flex-col">

  {/* Overlapping Text Box */}
  <div className="bg-gray-100 md:p-4 p-8 border-gray-100 border-l rounded-l-3xl">
    <p className="md:text-xl text-3xl font-bold text-gray-600">
      <span className="text-[rgba(202,3,32,255)]">Join us.</span> Our dynamic energy and innovative spirit bring the best and brightest together.
    </p>
  </div>

  {/* Image */}
  <div className="hidden md:block relative h-[200px] w-full">
  <Image
    src="/Homepage_want_to_agent.jpeg"
    alt="Full Height Image"
    fill
    className="object-cover rounded-none"
  />
  <div className="absolute inset-0 bg-black/50"></div>
</div>


  {/* Left Red Box */}
  <div className="bg-[rgba(202,3,32,255)] text-white flex items-center justify-center w-full h-32">
    <p className="md:text-lg text-3xl font-bold text-left">
      Want to be an <br /> AGENT?
    </p>
  </div>

  {/* Right Transparent Box */}
  <div className="bg-white/80 p-4 w-full">
    <p className=" text-3xl md:text-sm font-bold py-8 md:py-0 text-gray-800 md:leading-relaxed">
      We offer the greatest rewards for <br />
      <span className="text-[rgba(202,3,32,255)] font-bold">exceptional customer care.</span>
    </p>

    <button className="mt-4 bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2">
      <span className="whitespace-nowrap">Market Centre Search</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </div>
</div>

{/* Laptop Version: Original Layout */}
<div className="hidden md:flex w-full relative  ">
  {/* Box with half-overlap */}
  <div className="absolute top-0 z-10 bg-gray-100 p-6 w-140 border-gray-100 border-l rounded-l-3xl ">
    <p className="text-4xl font-bold text-gray-800">
      <span className="text-[rgba(202,3,32,255)]">Join us.</span> Our dynamic energy and innovative spirit bring the best and brightest together.
    </p>
  </div>

  <div className="ml-70 h-screen w-screen relative">
    <Image
      src="/Homepage_want_to_agent.jpeg"
      alt="Full Height Image"
      fill
      className="object-cover"
    />
    <div className="absolute inset-0 bg-black/50 border-r rounded-r-3xl"></div>
  </div>

  <div className="absolute top-90 z-10 bg-[rgba(202,3,32,255)] text-white flex items-center justify-center w-74 h-60">
    <p className="text-3xl font-bold text-center">
      Want to be an <br /> AGENT?
    </p>
  </div>

  <div className="absolute top-90 left-74 z-10 bg-white/80 p-6 w-[600px] h-60">
    <p className="text-3xl font-bold text-gray-800 leading-relaxed">
      We offer the greatest rewards for <br />
      <span className="text-[rgba(202,3,32,255)] font-bold">exceptional customer care.</span>
    </p>

    <button className="mt-4 bg-[rgba(202,3,32,255)] text-white px-6 py-3 ml-110 rounded-md text-base font-semibold flex items-center gap-2">
      <span className="whitespace-nowrap">Market Centre Search</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </div>
</div>

</div>

      <div className="flex flex-col md:flex-row items-center justify-center mx-2 md:mx-0 bg-white py-10 md:py-30 px-2 md:px-0">

<div className="grid grid-cols-1 md:grid-cols-2 max-w-full w-full gap-0">

  {/* Left Red Box */}
  <div className="bg-[rgba(202,3,32,255)] text-white p-6 md:p-14 py-15 md:py-0 flex md:border-l md:rounded-l-3xl flex-col justify-center">
    <p className="text-base md:text-xl font-semibold mb-2">| Download guide</p>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">How to sell your home</h2>
    <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
      The guide to selling a property will advise not only on the process
      but also how you can be super prepared and help to achieve the highest sale price.
    </p>
    <div className="hidden md:flex w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center md:items-stretch gap-2 rounded-3xl">
  
  <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />

  <button className="w-full md:w-auto bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 md:px-8 py-2 text-base font-semibold border rounded-3xl">
    Download
  </button>

</div>
 <div className=" flex md:hidden w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center md:items-stretch gap-2 rounded-3xl">
  
  <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />
  </div>
  <button className="flex md:hidden mt-4 w-fit  bg-black hover:bg-red-950 text-white px-8 py-2 text-base font-semibold border-black rounded-3xl">
    Download
  </button>


</div>

  {/* Right Image Box */}
  <div className="relative h-[460px] md:h-[420px] ">
    <Image
      src="/Homepage_buy_your_home.jpeg" // Replace with your actual image path
      alt="Home"
      fill
      className="object-cover grayscale md:border-r md:rounded-r-3xl"
    />
<div className="absolute inset-0 bg-black/50 md:border-r md:rounded-r-3xl py-15 md:py-0"></div>
    <div className="absolute inset-0 bg-opacity-40 p-4 md:p-10 flex flex-col justify-center text-white ">
    <p className="text-base md:text-xl font-semibold mb-2">| Download guide</p>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">How to buy a home</h2>
    <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
        The following guide to buying a property will explain how to position
        yourself to negotiate the best price, but importantly ensure you are
        the winning bidder when up against the competition.
      </p>
      <div className="hidden md:flex w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center gap-2 rounded-3xl">
      <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />

  <button className="w-full md:w-auto bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 md:px-8 py-2 text-base font-semibold border rounded-3xl">
    Download
  </button>

</div>
 <div className=" flex md:hidden w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center md:items-stretch gap-2 rounded-3xl">
  
  <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />
  </div>
  <button className="flex md:hidden mt-4 w-fit  bg-black hover:bg-red-950 text-white px-8 py-2 text-base font-semibold border-black rounded-3xl">
    Download
  </button>


    </div>
  </div>

</div>

</div>
 <div className="relative w-full h-[120vh] md:h-[90vh] flex items-center justify-center bg-gray-100 overflow-hidden border border-gray-100 rounded-3xl">

{/* Background Image */}
<Image
  src="/Homepage_testimonials.jpeg" // Replace with your image in public folder
  alt="Background Crowd"
  fill
  className="object-cover grayscale"
/>

{/* Optional dark overlay */}
<div className="absolute inset-0 bg-opacity-30"></div>

{/* Testimonial Box */}
<div className="relative bg-white p-6 md:p-20 max-w-full md:max-w-3xl md:mx-auto mx-4 text-left shadow-lg z-10 transition-all duration-500 ease-in-out">
  <FaQuoteRight className="absolute text-4xl md:text-7xl text-[rgba(202,3,32,255)] -top-4 md:-top-8 mb-4 leading-none" />

  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <p className=" py-4 mb-4 md:mb-8 leading-relaxed">
        {testimonials[currentIndex].quote}
      </p>
      <p className="text-[rgba(202,3,32,255)] font-bold  mb-2">
        {testimonials[currentIndex].name}
      </p>
      <p className="italic  text-gray-600">
        {testimonials[currentIndex].role}
      </p>
    </motion.div>
  </AnimatePresence>

  {/* Dots */}
  <div className="flex justify-center mt-8 md:mt-6 space-x-2">
    {testimonials.map((_, idx) => (
      <button
        key={idx}
        onClick={() => handleDotClick(idx)}
        className={`h-3 w-3 md:h-4 md:w-4 rounded-full ${
          idx === currentIndex ? 'bg-[rgba(202,3,32,255)]' : 'bg-gray-300'
        }`}
      />
    ))}
  </div>
</div>
</div>
<div className="flex justify-center items-center col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8 md:mb-0">
          <hr className="md:w-170 w-44 my-8 md:my-12 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[2px]" />
        </div>
    <Footer></Footer>
    </div>
  );
};
export default Home;