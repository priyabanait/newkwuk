'use client'
import React from 'react';
import Header from '@/components/header';
import Box from '@/components/box';
import Footer from '@/components/footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Page = () => {
  let router=useRouter();
    return (
        <div className="relative">
<Header></Header>
     
         
<Box h3={"All Market Centers"}
 src="/bgmarketcenter.png"
  image={'https://static.wixstatic.com/media/36a881_3c5b1d5faca941ea915b39acfedf52ee~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2-removebg-preview.png'}>
    
  </Box>
  
<div className="w-full mx-auto px-4 md:px-8 md:mt-2 lg:px-20 py-16 mt-4">
  <div className="flex flex-col lg:flex-row gap-6 lg:gap-14">
    
{/* First Image Block */}
<div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg">
 
<div className="relative w-full md:h-[95vh] h-[50vh]">
  <Image 
    src="/reyadhsunny.jpg" 
    alt="Real Estate Property"
    fill
    className="object-cover rounded-lg"
  />
</div>

  {/* Centered Button with Link */}
  <Link href="/riyadh" className="absolute inset-0 flex items-center justify-center">
  <button className="
    px-24 py-5
    bg-white text-black text-normal
    rounded-full hover:bg-gray-100 transition-all duration-300
    relative overflow-hidden
    group
    pr-20
  ">
    <span className="inline-block transition-all text-base duration-300 text-[1rem] font-semibold group-hover:-translate-x-3">
      RIYADH
    </span>
    <span className="
      absolute right-6 top-1/2 -translate-y-1/2
      opacity-0 group-hover:opacity-100
      transition-all duration-300 text-[rgba(202,3,32,255)] text-lg
      group-hover:translate-x-0 translate-x-4
    ">
      ⟶
    </span>
  </button>
</Link>


</div>



    {/* Second Image Block */}
   <div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg">
   <div className="relative w-full md:h-[95vh] h-[50vh]">
  <Image 
    src="/formimage.jpg" 
    alt="Real Estate Property"
    fill
    className="object-cover rounded-lg"
  />
</div>


  {/* Centered Button with Link */}
  <Link href="/jeddah" className="absolute inset-0 flex items-center justify-center">
  <button className="
    px-24 py-5
    bg-white text-black text-base
    rounded-full hover:bg-gray-100 transition-all duration-300
    relative overflow-hidden
    group
    pl-20
  ">
    <span className="
      absolute left-6 top-1/2 -translate-y-1/2
      opacity-0 group-hover:opacity-100
      transition-all duration-300 text-[rgba(202,3,32,255)] text-lg
      group-hover:translate-x-0 -translate-x-4
    ">
      ⟵
    </span>
    <span className="inline-block transition-all duration-300 text-[1rem] font-semibold group-hover:translate-x-3">
      JEDDAH
    </span>
  </button>
</Link>


</div>
</div>
</div>

<div className="order-2 md:order-1 bg-[rgba(202,3,32,255)] flex items-center justify-center h-[25px] md:h-[80px]">
    <Image
      src="/kwline1.png"
      alt="KW Logo Center"
      width={80}
      height={80}
      className="object-contain mx-auto w-7 h-7 md:w-20 md:h-20"
    />
  </div>

      {/* Thrive Image Section */}
      <div className="order-1 md:order-2 flex flex-col items-center justify-center">
    <Image
      src="/howwillyouthink.png"
      alt="How Will You Thrive"
      width={800}
      height={400}
      className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
    />
    <button className="bg-[rgba(202,3,32,255)] w-40 text-white px-8 py-1.5 text-xs font-semibold rounded-full block mx-auto md:hidden mt-4 mb-4"   onClick={() => router.push('/contactUs')}>
      JOIN US
    
    </button>
  </div>
        <hr className=" hidden md:flex w-160 mx-auto bg-[rgba(202,3,32,255)] h-[1.5px] border-0 mt-2 md:mt-8 mb-10" />
        <Footer></Footer>
             </div>
    );
}

export default Page;
