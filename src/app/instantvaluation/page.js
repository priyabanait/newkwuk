'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import NewFooter from "@/components/newfooter"
import Box from '@/components/box';
import axios from 'axios';
import { FaPlus } from "react-icons/fa";

const InstantValuation = () => {
  const [propertyType, setpropertyType] = useState([]);
  const [loading, setLoadingProperties] = useState(true);

 // derive unique list once from API response
useEffect(() => {
  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const response = await axios.post(
        'https://kw-backend-q6ej.vercel.app/api/listings/list/properties',
        {}
      );

      // normalize values and remove duplicates
      const uniqueTypes = [
        ...new Set(
          (response.data.data || []).map(
            (p) => p?.prop_type || p?.property_type || "Property"
          )
        ),
      ];

      setpropertyType(uniqueTypes);
    } catch (error) {
      setpropertyType([]);
    } finally {
      setLoadingProperties(false);
    }
  };
  fetchProperties();
}, []);


  // Debug log for property types
  useEffect(() => {
    console.log("Property Types:", propertyType);
  }, [propertyType]);

  return (
    <div className="relative p-6 md:p-8">
      {/* Sticky Header */}
      <Header />

      <div className="absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgb(206,32,39,255)] z-0"></div>
      
      <div className="relative bg-white">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-8">
            <Image src="/instant-val-img.jpg" alt="image" width={435} height={435} />
            <div className="text-gray-700 text-lg leading-relaxed mx-2 md:mx-6 mt-6">
              <p>
                Your valuation is based on millions of pieces of data, from sold house
                prices in your area to current market trends and the size of your home.
              </p>

              <p className="mt-6 font-semibold">Included with your valuation :</p>

              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <FaPlus className="text-[rgb(206,32,39,255)] mt-1" />
                  <span>Agent Will Contact You</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaPlus className="text-[rgb(206,32,39,255)] mt-1" />
                  <span>We help you sell Your Property</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 p-8 mt-0 md:mt-20 mr-10">
            <h3 className="text-xl font-bold text-start mb-6">
              Your Free, Online Valuation Starts Here..
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-1"
              />
              <button 
                type="button"
                className="flex justify-start font-semibold text-white bg-[rgb(206,32,39,255)] p-2"
              >
                Find Address
              </button>

              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2"
              />
              <input
                type="text"
                placeholder="Number"
                className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2"
              />

              {/* Bedrooms Dropdown */}
              <select className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 text-gray-500" defaultValue="">
                <option value="" >Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="6+">6+</option>
              </select>

              {/* Property Type Dropdown */}
              <select
  className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 text-gray-500"
  defaultValue=""
>
  <option value="" disabled>Property type</option>
  {!loading &&
    propertyType.map((type, idx) => (
      <option key={idx} value={type}>
        {type}
      </option>
    ))}
</select>

              {/* Type of Valuation */}
              <select className="w-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 text-gray-500" defaultValue="">
                <option value="" disabled>Type of valuation</option>
                <option>Sales</option>
                <option>Letting</option>
                <option>Both</option>
              </select>

              <button 
                type="submit"
                className="flex justify-start text-white px-6 font-semibold bg-[rgb(206,32,39,255)] p-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Footer Image */}
        
      </div>

     

      <NewFooter />
    </div>
  );
};

export default InstantValuation;
