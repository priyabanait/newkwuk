'use client'
import React, { Suspense } from 'react';
import Header from '@/components/header';
import Box from '@/components/box';
import Footer from '@/components/footer';
import PropertyType from '@/components/propertype';

const Newdevelopment = () => {
    return (
        <div>
            <Header />
      <Box h3={"New Development"} src="/bgauction.jpg" image="/properties2.jpg" />
     
   <Suspense fallback={<div>Loading...</div>}>
     <PropertyType type='New Development'></PropertyType>
   </Suspense>
      <Footer></Footer>   
        </div>
    );
}

export default Newdevelopment;
