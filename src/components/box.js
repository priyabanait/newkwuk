'use client'
import React from 'react';
import Image from 'next/image';

const Box = ({ src, image, h3 }) => {
  return (
    <div className=" p-6 md:p-8">
    <div className="absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgba(202,3,32,255)] z-0"></div>
      {/* Hero Section */}
      <div className="relative  md:min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={src}
            alt="Background"
            fill
            className=" w-50 h-50 "
            priority
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 flex items-center justify-center h-[76vh] md:h-screen px-4 md:px-10">
          
          {/* Mobile View */}
          <div className="w-full md:hidden flex items-center justify-center">
            <div className="bg-gray-500/50 backdrop-blur-sm max-w-sm mx-auto px-10 py-10 rounded-3xl flex flex-col items-center justify-center text-center">
          
              <h3 className="text-xl font-normal text-white tracking-[0.2em] leading-relaxed">
                {h3}
              </h3>
              
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-center w-full">
            <div className="bg-gray-500/50 backdrop-blur-sm w-full max-w-xl mx-auto px-12 py-8 rounded-3xl flex flex-col items-center justify-center text-center h-[25vh]">
              <h3 className="text-4xl font-normal text-white tracking-[0.2em] leading-relaxed mb-4">
                {h3}
              </h3>
            
            </div>
          </div>
         

{/* Hero Section */}
{/* <div className="relative min-h-[76vh]">
      
        <div className="absolute inset-0">
          <Image
            src={src}
            alt="Background"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="inset-0 bg-opacity-60 z-10" />

   
     

    
  

</div> */}

        </div>
      </div>
    </div>
  );
};

export default Box;
