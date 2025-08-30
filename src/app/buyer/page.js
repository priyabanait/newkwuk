
'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes, FaBuilding, FaChevronDown, FaChevronRight, FaChevronLeft,FaCheck  } from "react-icons/fa";
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import PropertyType from '@/components/propertype'
import NewFooter from '@/components/newfooter';
import Header from '@/components/header';
const Properties = () => {
  const [price, setPrice] = useState(750000);
  const [visibleCount, setVisibleCount] = useState(6);
  const [prevHeroIndex, setPrevHeroIndex] = useState(null);
  const [propertyType, setPropertyType] = useState('PROPERTY TYPE');
  const [marketCenter, setMarketCenter] = useState('MARKET CENTER');
  const [propertySubType, setPropertySubType] = useState('PROPERTY SUBTYPE');
  const [city, setCity] = useState('CITY');

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toLocaleString('en-US');
    }
    if (typeof price === 'string' && !isNaN(Number(price))) {
      return Number(price).toLocaleString('en-US');
    }
    return price || '';
  };
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const bedIconUrl = "/bed.png";
  const bathIconUrl = "/bath.png";

  const [selected, setSelected] = useState({
    sale: true,
    rent: false,
    commercial: false,
  });
  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://kw-backend-q6ej.vercel.app/api/listings/list/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            limit: 2000,
           
            page: 1,
          
          })
        });
        


        const data = await res.json();
        let fetched = [];
        if (Array.isArray(data?.data)) {
          fetched = data.data;
        }
        console.log('Fetched properties:', fetched.slice(0, 2)); // Debug: log first 2 properties
        setProperties(fetched);
      } catch (err) {
        setError('Failed to load properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);
  const [includeNewHomes, setIncludeNewHomes] = useState(true);
  const [showSSTC, setShowSSTC] = useState(true);

  // Filtering logic inside the component
  const filterBy = (property, key, value) => {
    if (!value || value === key || value === 'All') return true;
    const v = value.toLowerCase().trim();
    
    if (key === 'PROPERTY TYPE') {
      const propType = String(property.type || property.prop_type || '').toLowerCase().trim();
      return propType.includes(v) || v.includes(propType);
    }
    
    if (key === 'MARKET CENTER') {
      const marketCenter = String(property.market_center || property.center || '').toLowerCase().trim();
      return marketCenter.includes(v) || v.includes(marketCenter);
    }
    
    if (key === 'PROPERTY SUBTYPE') {
      const subType = String(property.subtype || property.property_subtype || '').toLowerCase().trim();
      return subType.includes(v) || v.includes(subType);
    }
    
    if (key === 'CITY') {
      const cityValues = [
        property.city,
        property.region,
        property.municipality,
        property.list_address?.city,
        property.property_address?.city
      ].filter(val => val != null && val !== undefined).map(val => String(val).toLowerCase().trim());
      
      return cityValues.some(city => city.includes(v) || v.includes(city));
    }
    
    return true;
  };

  const filteredProperties = properties.filter(property => {
    // Filter by price
    const propPrice = property.price || property.current_list_price || 0;
    if (propPrice > price) return false;
    
    // Filter by property type
    if (!filterBy(property, 'PROPERTY TYPE', propertyType)) return false;
    
    // Filter by market center
    if (!filterBy(property, 'MARKET CENTER', marketCenter)) return false;
    
    // Filter by property subtype
    if (!filterBy(property, 'PROPERTY SUBTYPE', propertySubType)) return false;
    
    // Filter by city
    if (!filterBy(property, 'CITY', city)) return false;
    
    return true;
  });

  // Debug: Log filter counts
  useEffect(() => {
    if (properties.length > 0) {
      console.log('Filter states:', {
        propertyType,
        marketCenter,
        propertySubType,
        city,
        price,
        totalProperties: properties.length,
        filteredCount: filteredProperties.length
      });
    }
  }, [propertyType, marketCenter, propertySubType, city, price, properties, filteredProperties]);

 
  return (
    <div className="relative p-6 md:p-8 ">
    
    {/* Sticky Header */}
   
      <Header />
  
  
      <div className="absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgb(206,32,39,255)]  z-0"></div>
  
  {/* Hero Section */}
  <div className="relative bg-gray-100">
  
    <section className={`relative w-full ${showFilters ? 'h-[120vh] md:h-[125vh]' : 'h-screen md:h-screen'} text-white overflow-hidden transition-all duration-500 ease-in-out`}>
      {/* Background Image with previous blurring out and next coming in */}
      <Image
              src='/1.jpg'
              alt="Previous Hero Background"
              layout="fill"
              
              objectPosition="center"
              priority
              className={`z-0 transition-all  duration-500 object-cover ${showFilters ? 'scale-110' : 'scale-100'}` }
            />
             {/* Content */}
             <div className={`absolute ${showFilters ? 'bottom-0' : 'bottom-20'}  md:bottom-0 left-0 w-full z-10 flex flex-col items-center text-center text-white py-2 md:py-14 px-4`}>
  {/* Title */}
  <h2 className="text-3xl font-semibold md:pb-8 pb-4"> {loading ? 'Loading...' : `${properties.length} `} Properties</h2>

  {/* Line 1 - For Sale + To Rent */}
  <div className="flex md:gap-4 gap-2 md:pb-4 pb-2">
    {/* For Sale */}
    <button
  onClick={() => setSelected((prev) => ({ ...prev, sale: !prev.sale }))}
  className={`flex items-center md:gap-8 gap-2 px-4 py-2 font-semibold border ${
    selected.sale
      ? "bg-[rgb(206,32,39,255)] border-[rgb(206,32,39,255)] text-white"
      : "bg-white border-gray-300 text-black"
  }`}
>
  For Sale
  <span
    className={`w-4 h-4 border flex items-center justify-center ${
      selected.sale
        ? "bg-white border-[rgb(206,32,39,255)]"
        : "border-gray-400 bg-white"
    }`}
  >
    {selected.sale && <FaCheck className="text-[rgb(206,32,39,255)] text-xs" />}
  </span>
</button>

    {/* To Rent */}
    <button
      onClick={() => setSelected((prev) => ({ ...prev, rent: !prev.rent }))}
      className={`flex items-center md:gap-8 gap-2 px-4 py-2 font-semibold border ${
        selected.rent
          ? "bg-[rgb(206,32,39,255)] border-[rgb(206,32,39,255)] text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      To Rent
      <span
        className={`w-4 h-4 border flex items-center justify-center ${
          selected.rent
            ? "bg-white text-[rgb(206,32,39,255)]"
            : "border-gray-400 bg-white"
        }`}
      >
        {selected.rent && <FaCheck className="text-[rgb(206,32,39,255)] text-xs" />}
      </span>
    </button>
  </div>

  {/* Line 2 - Commercial */}
  <div className="mb-4">
    <button
      onClick={() =>
        setSelected((prev) => ({ ...prev, commercial: !prev.commercial }))
      }
      className={`flex items-center md:gap-8 gap-2 px-4 py-2 font-semibold border ${
        selected.commercial
          ? "bg-[rgb(206,32,39,255)] border-[rgb(206,32,39,255)] text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      Commercial
      <span
        className={`w-4 h-4 border flex items-center justify-center ${
          selected.commercial
            ? "bg-white text-[rgb(206,32,39,255)]"
            : "border-gray-400 bg-white"
        }`}
      >
        {selected.commercial && <FaCheck className="text-[rgb(206,32,39,255)] text-xs" />}
      </span>
    </button>
  </div>

  {/* Line 3 - Residential Dropdown */}
  <div className="mb-6 w-full max-w-sm">
  <select className="w-full px-4 py-2 text-black border bg-white border-gray-300 outline-none">
  <option value="">Select Type</option>
  {[...new Set(properties.map((p) => p.prop_subtype))].map((type, idx) => (
    <option key={idx} value={type}>
      {type}
    </option>
  ))}
</select>
  </div>

  {/* Location Input */}
  <div className="mb-6 w-full max-w-4xl">
  <label className="flex justify-start text-base">Location</label>
  <select
    className="w-full bg-white px-4 py-2 text-black outline-none border border-gray-300"
  >
  <option value="">Select Location</option>
{[...new Set(properties.map((loc) => loc.list_address.city))].map((city, idx) => (
  <option key={idx} value={city}>
    {city}
  </option>
))}
  </select>
</div>


  {/* More Filters Toggle */}
  <div className="my-4 ">
    <button
      onClick={toggleFilters}
      className="text-white font-medium flex items-center transition-colors"
    >
      {showFilters ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          HIDE FILTERS -
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          MORE FILTERS +
        </>
      )}
    </button>
  </div>

  {/* Additional Filters */}
  <div
    className={`overflow-hidden transition-all md:mt-6 mt-2 duration-500 ease-in-out ${
      showFilters ? "max-h-[2000px] md:max-h-96 opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    <div>
      {/* First row of dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full md:w-4xl">
       
        {/* Type Dropdown */}
<div>
  <label className="flex justify-start text-sm font-medium mb-1">
    Type
  </label>
  <select className="border border-gray-300 p-2 w-full bg-white text-black">
    <option>No Preference</option>
    {Array.from(
      new Set(
        properties.map(
          (p) => p.type || p.prop_type || p.property_type || "Other"
        )
      )
    )
      .filter(Boolean)
      .map((type, idx) => (
        <option key={idx} value={type}>
          {type}
        </option>
      ))}
  </select>
</div>

{/* Min Price Dropdown */}
<div>
  <label className="flex justify-start text-sm font-medium mb-1">
    Min Price
  </label>
  <select className="border border-gray-300 p-2 w-full bg-white text-black">
    <option>No Preference</option>
    {Array.from(
      new Set(
        properties.map(
          (p) => p.price || p.current_list_price || p.rental_price || 0
        )
      )
    )
      .filter((price) => price > 0)
      .sort((a, b) => a - b)
      .map((price, idx) => (
        <option key={idx} value={price}>
          ﷼ {formatPrice(price)}
        </option>
      ))}
  </select>
</div>

{/* Max Price Dropdown */}
<div>
  <label className="flex justify-start text-sm font-medium mb-1">
    Max Price
  </label>
  <select className="border border-gray-300 p-2 w-full bg-white text-black">
    <option>No Preference</option>
    {Array.from(
      new Set(
        properties.map(
          (p) => p.price || p.current_list_price || p.rental_price || 0
        )
      )
    )
      .filter((price) => price > 0)
      .sort((a, b) => a - b)
      .map((price, idx) => (
        <option key={idx} value={price}>
          ﷼ {formatPrice(price)}
        </option>
      ))}
  </select>
</div>

      </div>


      {/* Checkboxes */}
      <div className="flex flex-col md:flex-row md:gap-6 gap-2 mb-6 justify-center items-center">
  {/* Include new homes */}
  <div className="flex flex-col gap-2">
    <span className="font-medium">Include new homes?</span>
    <div className="flex gap-4">
      {/* YES Option */}
      <label
        className={`flex justify-between items-center font-semibold w-30 px-4 py-2 border cursor-pointer ${
          includeNewHomes
            ? "bg-[rgb(206,32,39,255)] text-white border-[rgb(206,32,39,255)]"
            : "bg-white text-black"
        }`}
      >
        <span>Yes</span>
        <span
          className={`w-4 h-4 border bg-white flex items-center justify-center ${
            includeNewHomes ? "border-[rgb(206,32,39,255)]" : "border-gray-400"
          }`}
        >
          {includeNewHomes && (
            <FaCheck className="text-[rgb(206,32,39,255)] text-[10px]" />
          )}
        </span>
        <input
          type="checkbox"
          className="hidden"
          checked={includeNewHomes}
          onChange={() => setIncludeNewHomes(true)}
        />
      </label>

      {/* NO Option */}
      <label
        className={`flex justify-between items-center w-30 font-semibold px-4 py-2  cursor-pointer ${
          !includeNewHomes
            ? "bg-[rgb(206,32,39,255)] text-white border-[rgb(206,32,39,255)]"
            : "bg-white text-black"
        }`}
      >
        <span>No</span>
        <span
          className={`w-4 h-4 border bg-white flex items-center justify-center ${
            !includeNewHomes ? "border-[rgb(206,32,39,255)]" : "border-gray-400"
          }`}
        >
          {!includeNewHomes && (
            <FaCheck className="text-[rgb(206,32,39,255)] text-[10px]" />
          )}
        </span>
        <input
          type="checkbox"
          className="hidden"
          checked={!includeNewHomes}
          onChange={() => setIncludeNewHomes(false)}
        />
      </label>
    </div>
  </div>

   
       
      </div>
</div>
    </div>
      {/* Search button */}
      <div className="text-center">
        <button className="bg-[rgb(206,32,39,255)] text-white px-8 py-2 text-xl font-semibold hover:bg-red-700">
          Search
        </button>
      
  </div>
</div>

  
    </section>
    

    <div className="min-h-screen">
  {/* Filters always inside margin */}
  <div className={`${showMap ? "md:mx-2" : "mx-6 md:mx-38"}`}>
    <div className="py-6 mt-10 gap-2 flex flex-col md:flex-row justify-start">
      <select className="border border-gray-400 p-2 bg-white text-black">
        <option>Sort by price: high to low</option>
        <option>Sort by date added</option>
        <option>Sort by price: low to high</option>
      </select>

      <button
        className="hidden md:inline-block border border-gray-400 p-2 bg-white text-black"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? "Hide Map" : "Map View"}
      </button>
    </div>
  </div>



  {/* Conditional rendering */}
  {showMap ? (
    // ✅ Map is outside mx-38 → takes full width
    <PropertyType />
  ) : (
    <>
      <div className="mx-6 md:mx-38">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.slice(0, visibleCount).map((property, idx) => (
              <div
                key={property._kw_meta?.id || property.id || idx}
                className="bg-white shadow-2xl overflow-hidden w-full cursor-pointer"
                onClick={() => {
                  const propertyId =
                    property._kw_meta?.id || property.id || idx;
                  window.location.href = `/propertydetails/${propertyId}`;
                }}
              >
                {/* Image Section */}
                <div className="relative w-full h-50 md:h-60">
                  <Image
                    src={
                      property.image ||
                      (Array.isArray(property.images) && property.images[0]) ||
                      (Array.isArray(property.photos) &&
                        property.photos[0]?.ph_url) ||
                      "/property.jpg"
                    }
                    alt={property.title || property.prop_type || "property"}
                    fill
                    className="object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />

                  {/* Beds & Baths Overlay */}
                  <div className="absolute bottom-0 right-0 bg-black/80 text-white px-2 py-1 flex flex-row items-center gap-3">
                    <div className="flex flex-col items-center">
                      <span className="relative w-5 h-5">
                        <Image
                          src={bedIconUrl}
                          alt="bed"
                          fill
                          className="object-contain invert"
                        />
                      </span>
                      <span className="text-xs mt-1">
                        {property.total_bed ||
                          property.beds ||
                          property.bedrooms ||
                          0}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="relative w-5 h-5">
                        <Image
                          src={bathIconUrl}
                          alt="bath"
                          fill
                          className="object-contain invert"
                        />
                      </span>
                      <span className="text-xs mt-1">
                        {property.total_bath ||
                          property.baths ||
                          property.bathrooms ||
                          0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 py-6">
                  <h3 className="text-gray-700 text-lg flex justify-start items-center">
                    {property.title || property.prop_type || "Property"}
                  </h3>
                  <span className="flex justify-start text-[rgb(206,32,39,255)] text-lg font-semibold">
                    {property?.prop_subtype || "To Let"}
                  </span>

                  <p
                    className="text-xl font-bold text-gray-600 mb-2 truncate"
                    title={property.list_address?.address}
                  >
                    {property.list_address.address?.split(" ").length > 5
                      ? property.list_address.address
                          .split(" ")
                          .slice(0, 5)
                          .join(" ") + "..."
                      : property.list_address.address}
                  </p>

                  <div className="flex justify-start items-center">
                  <span className="relative w-4 h-4 mr-2">
    <Image 
      src="/currency.png"   // 👈 replace with your currency image path
      alt="currency"
      fill
      className="object-contain"
    />
  </span>

  <span>
    {property.price
      ? formatPrice(property.price)
      : property.current_list_price
      ? formatPrice(property.current_list_price)
      : ""}
  </span>
                  </div>

                  {property.price_qualifier && (
                    <p className="text-xs text-gray-500 mt-1">
                      {property.price_qualifier}
                    </p>
                  )}
                </div>

                {/* Button */}
                <button
                  className="w-full bg-[rgb(206,32,39,255)] text-white font-bold text-base py-3 px-4 flex items-center justify-end gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    const propertyId =
                      property._kw_meta?.id || property.id || idx;
                    window.location.href = `/propertydetails/${propertyId}`;
                  }}
                >
                  <span>MORE DETAILS</span>
                  <FaChevronRight className="text-white w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View More Button */}
      {visibleCount < filteredProperties.length && !loading && !error && (
        <div className="flex justify-center items-center ">
          <button
            className="md:w-80 w-50 md:py-2 py-2 my-10 md:my-10 px-4 bg-gray-500 text-white text-base md:text-lg font-semibold transition whitespace-nowrap"
            onClick={() => setVisibleCount((c) => c + 6)}
          >
            View More Properties..
          </button>
        </div>
      )}
    </>
  )}
</div>


      {/* <div className="hidden md:flex justify-center py-4 md:py-16">
        <Image
          src="/howwillyouthink.png"
          alt="How Will You Thrive"
          width={800}
          height={400}
          className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
        />
      </div>

      <hr className="hidden md:block w-6/12 mx-auto bg-[rgb(206,32,39,255)] border-0 h-[1.5px] mt-5 md:mt-20 mb-16" /> */}
    
   
    </div>
    <NewFooter></NewFooter>
    </div>
  );
}

export default Properties;
