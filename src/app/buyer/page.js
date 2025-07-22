'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Box from '@/components/box';
import Propertiess from '@/components/property';
// import handler from '../api/listing/route';
const Buyer = () => {
//  useEffect(() => {
//   const fetchListings = async () => {
//     try {
//       const res = await handler();

//       console.log(res)
      

//       const data = JSON.parse(res);
//       console.log('Listings:', data);
//     } catch (error) {
//       console.error('Failed to fetch listings:', error);
//     }
//   };

//   fetchListings();
// }, []);



  return (
    <div className="relative">
      <Header />
      <Box h3={"Search Listings"} src="/kwbg-image.jpg" image="/properties2.jpg" />

     <Propertiess></Propertiess>
     <Footer></Footer>
    </div>
  );
};

export default Buyer;