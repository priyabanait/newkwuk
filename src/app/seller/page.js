'use client'
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/newfooter';
import Box from '@/components/box';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Seller = () => {
  const timelineRef = useRef(null);
  const [markerTop, setMarkerTop] = useState(0);
  
const router=useRouter();
  const steps = [
    {
      title: 'Reason For Selling',
      content: `Deciding To Sell Your Home Can Be A Very Emotional Process, No Matter The Reason. The First Step In Selling Is To Understand Your Motivation And Goal. If You Are Selling Because Of Outside Circumstances, You Probably Have A Timeline To Work Within\n\nWhy Do You Want To Sell Your Home ? +\n\nTalk With Your Keller Williams Agent About Their Strategy To Sell Your Home.`,
      align: 'right',
    },
    {
      title: 'Hire The Right Agent',
      content: `In This Fast-paced Real Estate Environment, Having The Right Real Estate Agent Sell Your Home Is Extremely Important. In Most Urban Areas, Inventory Is Low, So You Don't Want To Underprice Nor Over-price Your Home For Today's Market. Selling Is A Combination Of Pricing Right, Strategic Marketing, Staging, And Bringing In The Right Buyer At The Right Time.\n\nThen Choosing A Real Estate Professional +`,
      align: 'left',
    },
    {
      title: 'Price Your Home',
      content: `Your KW Agent will provide you with a CMA (Comparative Market Analysis). This report can be the most important tool in determining the listing price. Review the CMA carefully with your Agent so you understand the current. Studying the past sales will not only help you understand the pricing strategy but give you a realistic expectation as to how much your home might appraise for when you go under contract. Remember, the listing price of a similar home is your competition, not a comparable for value.

The CMA reports usually contain  +`,
      align: 'right',
    },
    {
      title: 'Preparing Your Home for Sell',
      content: `Once you decide to sell your house, it is no longer your home. Your house was a big investment and now you should get what it is worth. First impressions are everything when selling your home. You want buyers to be excited to get out of the car and come into the home..

Your KW Agent will guide you with a few suggestions such as  +`,
      align: 'left',
    },
    {
      title: 'Be Ready',
      content: `To sell your home, you must be flexible and ready. Living in a home for sale isn't always the easiest, especially with children.

      Have a schedule  +.

      The CMA reports usually contain  +`,
      align: 'right',
    },
  ];

   useEffect(() => {
  const handleScroll = () => {
    if (!timelineRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineStart = window.scrollY + timelineRect.top;
    const timelineHeight = timelineRect.height;
    const currentScroll = window.scrollY+200;

    let progress = (currentScroll - timelineStart) / timelineHeight;

    // Clamp the progress between 0 and 1
    progress = Math.max(0, Math.min(progress, 1));

    setMarkerTop(progress * 100);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  return (
    <div className="relative">
      <Header />
    <Box
        src='/steps_to_sell_your_home.jpg'
          h3="KW Five Steps to Sell"
          image="https://static.wixstatic.com/media/36a881_0ed2d4fa08bb4022acbbb9e48b783092~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4-removebg-preview.png"
        />
    

      {/* Main Content Section */}
      <main className="px-4 md:px-40 py-2  md:mt-2">
      <div className=" max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="w-full md:w-auto text-center">
            <h1 className="text-2xl md:text-3xl md:py-8 py-4">Five Steps To Sell</h1>
            {/* <hr className="w-8/12 md:w-5/12 mx-auto border-0 bg-[rgb(206,32,39,255)] h-[1.5px] mt-2 md:mt-10 mb-10" /> */}
<p className='text-md md:text-lg'>
  You&rsquo;re Ready To Sell Your Property. And, While You&rsquo;re Looking Forward To Seeing The Word &quot;SOLD&quot; 
  Posted From The Curb, You Know There&rsquo;s A Lot To Consider Along The Way. One Of Your First Decisions Is To Select A Real Estate Company And Real Estate Agent Who&rsquo;ll Join You In The Process.
</p>


            </div>
          </div>
        </div>
      </main>

      {/* Timeline Section */}
      <div ref={timelineRef} className="relative bg-white pt-2 pb-10">
        {/* Center Vertical Line - hidden on mobile */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-black z-0" />

       
        {/* Red Marker over vertical line */}
  <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 z-10 h-full">
    <div
      className="absolute left-1/2 transform -translate-x-1/2"
      style={{
        top: `${markerTop}%`,
        transition: 'top 0.1s ease-out',
      }}
    >
     <div className="w-6 h-6 relative flex items-start justify-center">
  <span className="w-8 h-[2.5px] bg-[rgb(206,32,39,255)]" />
</div>

    </div>
      </div>
      {/* Content Sections */}
        <div className="max-w-full mx-auto space-y-12 md:space-y-48">
        {steps.map((step, index) => (
  <div
    key={index}
    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start px-4 md:px-8 lg:px-24"
  >
    {/* ✅ MOBILE ONLY */}
    <div className={`md:hidden mx-4 mb-4 ${step.align === 'right' ? 'text-left' : 'text-right'}`}>
    
      <h2 className="text-[rgb(206,32,39,255)] md:text-3xl text-2xl font-normal  inline-block">
      {step.title}
    </h2>
      <p className="whitespace-pre-line mt-2 text-md">{step.content}</p>
    </div>

    {/* ✅ DESKTOP ONLY */}
    {step.align === 'right' ? (
      <>
        <div className="hidden md:block" />
        <div className="hidden md:block text-left px-0 md:px-12">
          <h2 className="text-[rgb(206,32,39,255)] text-xl md:text-3xl font-normal ">{step.title}</h2>
          <p className="whitespace-pre-line mt-2 md:mt-4 md:text-lg text-md">{step.content}</p>
        </div>
      </>
    ) : (
      <>
        <div className="hidden md:block text-right px-0 md:px-12">
          <h2 className="text-[rgb(206,32,39,255)] text-xl md:text-3xl font-normal ">{step.title}</h2>
          <p className="whitespace-pre-line mt-2 md:mt-4 md:text-lg text-md">{step.content}</p>
        </div>
        <div className="hidden md:block" />
      </>
    )}
  </div>
))}
</div>
</div>

<div className="order-1 md:order-2 flex flex-col items-center justify-center">
    <Image
      src="/howwillyouthink.png"
      alt="How Will You Thrive"
      width={800}
      height={400}
      className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
      
    />
   
  </div>
 
      
      <Footer />
    </div>
  );
}

export default Seller;