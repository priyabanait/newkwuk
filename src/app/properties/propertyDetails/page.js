'use client';
import React from 'react';
import Image from 'next/image';
import { 
  FaSearch, FaBars, FaTimes, FaBuilding,
  FaNetworkWired, FaUserTie, FaKey, FaUser,
  FaUsers, FaGlobe, FaHome, FaEnvelope, FaPhone,
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
  FaTwitter, FaTiktok, FaSnapchatGhost, FaWhatsapp, FaChevronDown 
} from "react-icons/fa";
import Footer from '@/components/footer';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState,useRef,useEffect } from 'react';
import Link from 'next/link';
const PropertyDetails = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [isVisible, setIsVisible] = useState(true);  
     const [isAtTop, setIsAtTop] = useState(true);  
     const prevScrollY = useRef(0);
   
     const toggleMenu = () => {
       setIsMenuOpen(!isMenuOpen);
     };
   
     useEffect(() => {  
       const handleScroll = () => {  
         const currentScrollY = window.scrollY;  
   
         // At the very top  
         if (currentScrollY < 10) {  
           setIsAtTop(true);  
           setIsVisible(true);  
           return;  
         } else {  
           setIsAtTop(false);  
         }  
   
         // Scrolling down → Hide header  
         if (currentScrollY > prevScrollY.current) {  
           setIsVisible(false);  
         }  
         // Scrolling up → Show header  
         else {  
           setIsVisible(true);  
         }  
   
         prevScrollY.current = currentScrollY;  
       };  
   
       window.addEventListener('scroll', handleScroll, { passive: true });  
       return () => window.removeEventListener('scroll', handleScroll);  
     }, []);
   
  return (
    <div>
       <div className="relative">
             {/* Navbar */}
             <header className={`  
               fixed top-0 w-full z-50  
               flex justify-between items-center px-4 sm:px-6 py-2
               transition-all duration-300 ease-in-out  
               ${isVisible ? 'translate-y-0' : '-translate-y-full'}  
               ${isAtTop ? 'bg-gray-950/90 backdrop-blur-sm' : 'bg-gray-950/90 backdrop-blur-sm'}  
             `}>
               {/* Logo */}
               <div className="flex-shrink-0">
                 <Link href="/">
                   <Image 
                     src="https://static.wixstatic.com/media/36a881_0cd959d32d904bd7be76303fb23dec0a~mv2.png/v1/fill/w_279,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design.png" 
                     alt="KW Saudi Arabia Logo" 
                     width={279}
                     height={63}
                     className="h-12 w-auto object-contain"
                     priority
                   />
                 </Link>
               </div>
       
               {/* Desktop Navigation */}
               <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                 <Link href="/ourCulture" className="text-[0.6rem]  text-white hover:text-gray-300 transition-colors">
                   About Us
                 </Link>
                 <div className="w-px h-4 bg-gray-300/50"></div>
                 <Link href="/properties" className="text-[0.6rem] text-white hover:text-gray-300 transition-colors">
                   Search
                 </Link>
                 <div className="w-px h-4 bg-gray-300/50"></div>
                 <Link href="/franchise" className="text-[0.6rem] text-white hover:text-gray-300 transition-colors">
                   Join Us
                 </Link>
                 <div className="w-px h-4 bg-gray-300/50"></div>
                 <Link href="/contactUs" className="text-[0.6rem] text-white hover:text-gray-300 transition-colors">
                   Contact Us
                 </Link>
                 <div className="w-px h-4 bg-gray-300/50"></div>
                 <Link href="/contactUs" className="text-[0.6rem] text-white hover:text-gray-300 transition-colors">
                   Instant Valuation
                 </Link>
                 <div className="w-px h-4 bg-gray-300/50"></div>
                 <Link href="#" className="text-[0.6rem] text-white hover:text-gray-300 transition-colors">
                   عربي
                 </Link>
                 <Link 
                   href="#" 
                   className="border border-white px-4 py-1.5 rounded-full text-white hover:bg-white hover:text-black transition-colors text-[0.6rem]"
                 >
                   Sign In/Register
                 </Link>
               </nav>
       
               {/* Mobile Menu Button */}
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
       
               {/* Mobile Menu Dropdown */}
               {isMenuOpen && (
                 <div className={`absolute md:hidden top-full left-0 right-0 py-4 px-6 space-y-4 shadow-lg bg-gray-950/95 backdrop-blur-sm`}>
                   <Link href="/ourCulture" className="block py-2 text-white hover:text-gray-300 transition-colors">
                     About Us
                   </Link>
                   <Link href="/properties" className="block py-2 text-white hover:text-gray-300 transition-colors">
                     Search
                   </Link>
                   <Link href="/franchise" className="block py-2 text-white hover:text-gray-300 transition-colors">
                     Join Us
                   </Link>
                   <Link href="/contactUs" className="block py-2 text-white hover:text-gray-300 transition-colors">
                     Contact Us
                   </Link>
                   <Link href="/contactUs" className="block py-2 text-white hover:text-gray-300 transition-colors">
                     Instant Valuation
                   </Link>
                   <Link href="#" className="block py-2 text-white hover:text-gray-300 transition-colors">
                     عربي
                   </Link>
                   <Link 
                     href="#" 
                     className="w-full border border-white px-4 py-2 rounded-full text-white hover:bg-white hover:text-black transition-colors mt-2 inline-block text-center"
                   >
                     Sign In/Register
                   </Link>
                 </div>
               )}
             </header>
           </div>
       <div className="min-h-screen w-full bg-white md:mt-10 mt-20 text-gray-800 p-4 md:p-10">
      {/* Flex container for both arrows */}
      <div className="flex justify-between items-center">
        {/* Left Arrow */}
        <div className="flex items-center gap-2 md:mb-6 mb-6 cursor-pointer hover:text-gray-600">
  <a href='/properties' className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-black text-black hover:bg-gray-100">
    <FaArrowLeft className="w-2 h-2" />
  </a>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
  <a href='/properties' className="text-[0.6rem] text-">Back to Search</a>
</div>

        {/* Right Arrow */}
       <div className="flex items-center gap-2 md:mb-6 mb-6 cursor-pointer hover:text-gray-600">
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
  <span className="text-[0.6rem] text-">View Next Listing</span>
  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-black text-black hover:bg-gray-100">
    <FaArrowRight className="w-2 h-2" />
  </div>
</div>
            </div>
      {/* Main Image and Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden h-[400px]">
          <Image
            src="https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r6851g1lc70qjejgg.jpeg"
            alt="Main Property"
            width={1000}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            'https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r67t6po9s70mru7l0.jpeg', 
            'https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r67t6po9s70mru7kg.jpeg',
            'https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r6851g1lc70qjejg0.jpeg', 
            'https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r6863ipac70hrmku0.jpeg', 
            'https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r67t1g1lc70qjejf0.jpeg', 
            'https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r6851g1lc70qjejfg.jpeg'
          ].map((src, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px]">
              <Image
                src={src}
                alt={`gallery-${idx}`}
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
      </div>

   <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* LEFT SIDE: Property + 3 blocks */}
  <div className="col-span-2 space-y-4">
    {/* Heading */}
    <h2 className="text-xl font-medium text-gray-800 text-center">PROPERTY DETAILS</h2>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
  <hr className="w-50 md:w-60 mx-auto bg- h-[1.5px]" />
    {/* Main Info Box */}
    <div className="bg-gray-100 p-6 rounded-xl">
      {/* Grid Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
        <div className="space-y-4 border-r border-gray-300 pr-4">
          <p>Price (sar) : 750,000</p>
          <p>Total Bathrooms : 3</p>
          <p>Total Bedrooms : 5</p>
        </div>
        <div className="space-y-4 pl-4">
          <p>Total Area - sqm : 237</p>
          <p>City : الطائف</p>
          <p>Country : SAU</p>
        </div>
        <p>Address : 9C6G+643 الطائف مكة المكرمة SAU</p>
      </div>

      {/* Description */}
      <div className="text-sm leading-6 mt-4">
        <div>Description : شقة مميزة للبيع</div>
        <div className="ps-[5rem] whitespace-pre-line">
          حي الشرفية
          {"\n"}مساحة 237 متر
          {"\n"}عمر العقار 5 سنوات
          {"\n"}العقار مرهون لبنك الرياض بقيمة 470ألف فقط
          {"\n"}السعر شامل الرهن: 750 ألف
          {"\n\n"}مكونة من:
          {"\n"}مجلس - مقلط - صالة - مطبخ - 2غرفة نوم - دورة مياه
          {"\n"}غرفة نوم بدورة مياه (ماستر) - مستودع - غرفة خادمة
          {"\n\n"}مميزات العقار الداخلي:
          {"\n"}- يوجد موقف سيارة خاص للعقار في القبو
          {"\n"}- يوجد غرفة سائق
          {"\n"}- العقار في الدور الثالث
          {"\n"}- يوجد حارس
          {"\n"}- تأسيس ممتاز للكهرباء والسباكة
          {"\n"}- ضمانات متعددة
          {"\n"}- إشراف هندسي
          {"\n"}- يوجد مصعد وخزان ماء خاص
          {"\n\n"}موقع العقار:
          {"\n"}- جميع الخدمات متوفرة
          {"\n"}- قرب جامع، حديقة، مدارس، وهايبر
        </div>
      </div>
    </div>
{/* Listing Details Section */}
<h2 className="text-xl font-medium text-gray-800 text-center mb-6">LISTING DETAILS</h2>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
<hr className="w-50 md:w-60 mx-auto bg- h-[1.5px]" />
<div className="bg-gray-100 rounded-xl shadow-sm p-6">
  

 
    {/* Grid Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
      {/* Column 1 */}
      <div className="space-y-4 border-r border-gray-300 pr-4">
        <p>Listing Courtesy Of : Meshary Almalki</p>
        <p>List kw ID : 2000043179</p>
        <p>List Cato : For Sale</p>
        <p>List Type : Open Listing</p>
      </div>

      {/* Column 2 */}
      <div className="space-y-4 pl-4">
        <p>List Status : Active</p>
        <p>Prop Type : Residential</p>
        <p>Prop Sub Type : Apartment</p>
        <p>Market Center: Jasmin</p>
      </div>

   
  </div>
</div>
    
     
    {/* Additional Block 2 */}
   
    <h2 className="text-xl font-medium text-gray-800 text-center mb-6">MAP</h2>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
<hr className="w-50 md:w-60 mx-auto bg- h-[1.5px]" />
 <div className="bg-gray-100 rounded-xl shadow-sm p-6">
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.222373018991!2d-122.389936!3d37.768255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzA1LjciTiAxMjLCsDIzJzIzLjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-xl"
  ></iframe>
</div>
</div>
    
  </div>

  {/* RIGHT SIDE: Sticky Agent Box */}
   {/* Agent Details */}
         <div className="relative md:mt-15 mt-15">
    <div className="sticky top-30">
        <div className="absolute left-1/2 -top-14 -translate-x-1/2 z-10">
        <div className="mx-auto w-28 h-28 rounded-full overflow-hidden shadow-lg">
      <Image
        src="https://avatar"
        alt="Agent"
        width={80}
        height={80}
        className="object-cover w-full h-full"
      />
    </div>
 </div>


 <div className="bg-gray-100 pt-20 pb-6 px-6 rounded-xl text-center">
              <h3 className="mt-4 font-semibold text-[rgba(202,3,32,255)] text-sm">AGENT DETAILS</h3>
              <div className="mt-6 flex justify-center">
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
                <div className="w-[1px] bg-"></div>
                <div className="text-left pl-4">
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <p className="text-xs font-bold text- mb-2">NAME</p>
                  <p className="text-sm">Meshary</p>
                  <p className="text-sm mb-2">Almalki</p>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <p className="text-xs font-bold text- mb-2 mt-2 md:mt-6">CONTACT</p>
                  <p className="text-sm mb-2">+966 123456789</p>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
                   <p className="text-xs font-bold text- mb-2 mt-2 md:mt-6">Market Center</p>
                  <p className="text-sm">Jasmin</p>
                <div className=" ml-22 w-[1px] bg-[rgba(202,3,32,255)] h-auto md:h-28 my-4 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <p className="text-xs font-bold text- mb-2 mt-2 md:mt-6">CITY</p>
                  <p className="text-sm">ALRIADH</p>
                </div>
               </div>
                 </div>
          </div>
        </div>
      </div>
      
    </div>
    <hr className="w-6/12 mx-auto bg-[rgba(202,3,32,255)] h-[1.5px] border-0 mt-5 md:mt-20 mb-16" />
      <Footer></Footer>
    </div>
  );
};

export default PropertyDetails;