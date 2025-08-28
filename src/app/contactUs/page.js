'use client'
import React from 'react';
import Box from '@/components/box';
import Header from '@/components/header';
import Footer from '@/components/newfooter';

const Contact = () => {
  return (
    <div>
      {/* Hero Section */}
      <Header />
      <Box
        src="/training.jpg"
        h3="Contact Keller Williams KSA"
        image="/contactus.png"
      />

      {/* Contact Form */}
      <div className="w-full md:px-70 px-10 py-10">
        <form className="space-y-8">
          {/* Full Name */}
          <div className="relative">
            <input
              type="text"
              id="fullName"
              required
              placeholder="E.g. John Doe"
              className="peer w-full border-b border-gray-400 bg-transparent 
                         focus:outline-none focus:border-[rgb(206,32,39,255)] py-2 
                         placeholder-transparent focus:placeholder-gray-400"
            />
            <label
              htmlFor="fullName"
              className="absolute left-0 top-2 text-gray-500 text-[1.1rem] transition-all 
                         peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                         peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
            >
              Full Name *
            </label>
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                type="tel"
                id="phone"
                placeholder="E.g. +966 512 345 678"
                className="peer w-full border-b border-gray-400 bg-transparent 
                           focus:outline-none focus:border-[rgb(206,32,39,255)] py-2 
                           placeholder-transparent focus:placeholder-gray-400"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-2 text-gray-500 text-[1.1rem] transition-all 
                           peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
              >
                Phone Number
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                required
                placeholder="E.g. john@example.com"
                className="peer w-full border-b border-gray-400 bg-transparent 
                           focus:outline-none focus:border-[rgb(206,32,39,255)] py-2 
                           placeholder-transparent focus:placeholder-gray-400"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-2 text-gray-500 text-[1.1rem] transition-all 
                           peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
                           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-black"
              >
                Email Address *
              </label>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative">
            <select
              id="enquiry"
              className="w-full border-b border-gray-400 bg-transparent 
                         focus:outline-none focus:border-[rgb(206,32,39,255)] py-2 text-gray-700"
              defaultValue="General Enquiry"
            >
              <option>General Enquiry</option>
              <option>Agent Related Enquiry</option>
              <option>Market Center Related Enquiry</option>
            </select>
            <label
              htmlFor="enquiry"
              className="absolute left-0 -top-3.5 text-gray-500 text-[1.1rem]"
            >
              Select
            </label>
          </div>

          {/* Message with FULL BORDER + floating label */}
          <div className="relative">
            <textarea
              id="message"
              rows="5"
              required
              placeholder="Write your message here..."
              className="peer w-full border border-gray-400 bg-transparent 
                         focus:outline-none focus:border-black p-3 
                         text-[1.1rem] placeholder-transparent focus:placeholder-gray-400"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute left-3 top-3 text-gray-500 text-[1.1rem] transition-all 
                         peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
                         peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-black 
                         bg-white px-1"
            >
              Message *
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-[rgb(206,32,39,255)] text-white font-semibold px-6 py-2"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
