'use client'
import React from 'react';
import Image from 'next/image';
import Box from '@/components/box';
import Header from '@/components/header';
import Footer from '@/components/footer';
const Contact = (props) => {
  return (
    <div className="">
      {/* Hero Section */}
      <Header></Header>
      <Box
       
        src="/training.jpg"
        h3='Contact Us'
        image={
          '/contactus.png'
        }
      ></Box>
  {/* Intro Text */}
      <main className="px-4 py-6 md:mt-10 mt-10">
        <div className="mx-auto text-center">
            <p className='text-xs md:text-[1rem] tracking-[0.1em] mb-4' >  Partner With A Winning Team </p>
          <h1 className="text-xl md:text-5xl font-normal text-gray-800">
           KW SAUDI ARABIA
          </h1>
          <hr className="w-60 md:w-60 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px] mt-6 md:mt-14" />
          <div className="mt-10">
            <p className="text-xs md:text-[1rem]">
            You Join A Winning Team Of Real Estate Professionals Who Are Leading The  Industry To Greater Heights
            </p>
            
          </div>
        </div>
      </main>
      <div className="bg-[#f8f8f8] py-20 px-4 md:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-start md:mx-20">
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold md:py-16 text-black">
              Shape Your <br /> 
              <span className="text-[rgba(202,3,32,255)]">Future </span>
              in Real Estate </h2>
            <p className="mt-4 text-gray-700">
          
  Whether your question is about real estate, technology, community programs or billing, we&apos;ve got the right
  team ready for you.

</p><div className="flex gap-4 items-center mt-4">
  {/* Red vertical line */}
  <div className="w-1 bg-[rgba(202,3,32,255)] rounded-full min-h-[200px]" />

            <ul className="mt-4 text-gray-700 list-disc list-inside space-y-1">
              <li>Prefer a specific department? Reach them via the emails listed above.</li>
              <li>
  Need personalized help? Complete our Contact Form and we&apos;ll respond promptly.

</li>
              <li>Want to work with someone local? Search our Agent &amp; Office Directory to connect directly.</li>
            </ul>
          </div>
          </div>
          {/* Why Attend */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Why Us?</h3>
            <ul className="text-gray-700 space-y-2">
  <li className="flex items-start gap-2">
    <span className="text-[rgba(202,3,32,255)] font-bold mt-1">✓</span>
    <span>One-of-a-kind culture</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-[rgba(202,3,32,255)] font-bold mt-1">✓</span>
    <span>Limitless earning potential</span>
  </li>
  <li className="flex items-start gap-2">
    <span className="text-[rgba(202,3,32,255)] font-bold mt-1">✓</span>
    <span>Industry-leading technology</span>
  </li>
</ul>

          </div>
        </div>

        {/* Right Column - Form */}
        <div className="bg-white shadow-md rounded-xl p-8">
          <h3 className="text-xl font-bold text-center mb-6">CONTACT US TODAY</h3>
          <form className="space-y-4">
            <label className='block mb-2'>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            />
              <label className='block mb-2'>Mobile Number</label>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
            />
               <label className='block mb-2'>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
            />
             <label className='block mb-2'>City</label>
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ">
              <option>Select your city</option>
              <option>Riyadh</option>
              <option>Jeddah</option>
              <option>Dammam</option>
              <option>Other</option>
            </select>
            <label className='block mb-2'>Upload Image</label>
            <input
              type="file"
              placeholder="Upload Image"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
            />
            {/* ✅ Message textarea added */}
            <label className="block mb-2">Message</label>

            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-md h-24 resize-none focus:outline-none focus:ring-2 "
            ></textarea>

            {/* ✅ Submit Button */}
            <button
              type="submit"
              className="w-full bg-[rgba(202,3,32,255)] text-white font-semibold py-2 rounded-md hover:bg-red-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
     
          
          <div className="flex justify-center py-2 md:py-0">
                   <Image
                     src="/howwillyouthink.png"
                     alt="How Will You Thrive"
                     width={800}
                     height={400}
                   
                   />
                 </div>
           
                 <hr className="w-8/12 md:w-5/12 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px] mt-2 md:mt-14 mb-10" />
      
      <Footer></Footer>
    </div>
  );
};

export default Contact;
