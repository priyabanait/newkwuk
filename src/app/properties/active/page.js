'use client'
import React, { Suspense } from 'react';
import Header from '@/components/header';
import Box from '@/components/box';
import Footer from '@/components/footer';
import PropertyType from '@/components/propertype';

const Active = () => {
    return (
        <div>
            <Header />
      <Box h3={"Active Listings"} src="/active_listings_page.jpeg" image="/properties2.jpg" />
      
   <Suspense fallback={<div>Loading...</div>}>
     <PropertyType  type="Active"></PropertyType>
   </Suspense>
      <Footer></Footer>   
        </div>
    );
}

export default Active;
