'use client'
import React, { useEffect, useState } from 'react';
import Box from '@/components/box';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaGlobe } from 'react-icons/fa';

const Franchise = () => {
  // Add state to track screen size
  const [isMobile, setIsMobile] = useState(false);
  const [phone, setPhone] = useState('');
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    company: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
    console.log('Phone:', phone);
  };
  return (
    <div className="relative">
      <Header />

      <Box
        h3={"Investment Opportunities"}
        src="/become_a_franchise.jpeg"
        image={
          'https://static.wixstatic.com/media/36a881_d93a5085a707440e9b7a3346a80846a1~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/7-removebg-preview.png'
        }
      ></Box>

      {/* Responsive Section Order */}
      <div className="w-full">
        {/* Mobile: Black Box first, then Big Life Box */}
        {isMobile ? (
          <>
            {/* Black Strip Section */}
            <div className="relative min-h-[40vh] md:min-h-screen bg-black flex items-center justify-center md:mt-35">
              <main className="px-4 md:py-6 py-37 mx-5 md:mx-0">
                <div className="mx-auto text-center md:mt-6">
                  <p className="text-white md:text-[0.6rem] tracking-[0.2em] text-[0.6rem]">WHERE</p>
                  <h1 className="text-xl md:text-3xl tracking-[0.2em] md:tracking-[0.2em] font-normal text-white mt-4">
                    TRUE FINANCIAL FREEDOM BEGINS
                  </h1>
                  <hr className="w-34 md:w-96 mx-auto bg-[rgba(202,3,32,255)] 0 h-[4px] md:h-[2px] rounded-full mt-6 md:mt-14" />
                  <div className="mt-6"> 
                    <p className="text-sm md:text-[0.8rem] text-white">
                      As A Company Founded On Proven Systems And Models, Keller Williams Provides The Blueprint For Building A Big Business And An Even Bigger Life.
                    </p>
                    <div className=" hidden md:flex justify-center md:justify-center mt-6 md:mt-10">
                      <button className="
                        w-56 bg-[rgba(202,3,32,255)] text-white py-3 rounded-full text-sm
                        relative overflow-hidden
                        group transition-all duration-300
                        hover:pr-8 hover:pl-4
                      ">
                        <span className="inline-block transition-all duration-300 group-hover:-translate-x-3">
                          GET STARTED
                        </span>
                        <span className="
                          absolute right-4 top-1/2 -translate-y-1/2
                          opacity-0 group-hover:opacity-100
                          transition-all duration-300 text-black
                          group-hover:translate-x-0 translate-x-4
                        ">
                          ⟶
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            {/* Big Life Box */}
            <main className="px-4 md:py-32 md:mt-32 py-10">
              <div className="text-center mx-4">
                <h1 className="text-xl md:text-4xl tracking-[0.2em]  font-light text-gray-800">
                  WE WANT YOU TO <span className="
                  text-[rgba(202,3,32,255)]">LIVE A BIG LIFE</span>
                </h1>
                <hr className="w-60 md:w-96 mx-auto bg-[rgba(202,3,32,1)] h-[2px] border-0 mt-6 md:mt-14" />

                <div className="mt-10">
                  <p className="text-sm md:text-[0.8rem]">
                    Our mission is to help you to build careers worth having, businesses worth owning, lives worth living, experiences worth giving and legacies worth leaving. To that end we want
                  </p>
                  <p className="text-sm md:text-[0.8rem]">
                    this to be the most amazing place to be an estate agent in the UK and globally. And we want the best leadership for our market centres.
                  </p>
                </div>
              </div>
            </main>
          </>
        ) : (
          // Desktop: Big Life Box first, then Black Box (original order)
          <>
            {/* Big Life Box */}
            <main className="px-4 py-6 md:mt-32 mt-10">
              <div className="mx-auto text-center">
                <h1 className="text-xl md:text-4xl font-light md:font-normal tracking-[0.1em] text-gray-800">
                  WE WANT YOU TO <span className="text-[rgba(202,3,32,255)]">LIVE A BIG LIFE</span>
                </h1>
                <hr className="w-60 md:w-150 border-0 mx-auto bg-[rgba(202,3,32,255)]
                 h-[1.5px] mt-6 md:mt-14" />
                <div className="mt-10 mx-40">
                  <p className="text-xs md:text-[1rem]">
                  Our Mission Is To Help You To Build Careers Worth Having, Businesses Worth Owning, Lives Worth Living, Experiences Worth Giving And Legacies Worth Leaving. To That End We Want
                  This To Be The Most Amazing Place To Be An Estate Agent In The Uk And Globally. And We Want The Best Leadership For Our Market Centres.
                  </p>
                </div>
              </div>
            </main>
            {/* Black Strip Section */}
            <div className="relative min-h-[40vh] md:min-h-screen bg-black flex items-center justify-center md:mt-35">
              <main className="px-4 py-6">
                <div className="mx-auto text-center md:mt-6">
                  <p className="text-white md:text-[0.8rem]">WHERE</p>
                  <h1 className="text-xl md:text-4xl font-normal text-white mt-4">
                    TRUE FINANCIAL FREEDOM BEGINS
                  </h1>
                  <hr className="w-48 md:w-120 border-0 mx-auto bg-[rgba(202,3,32,255)] h-[2px] rounded-full mt-6 md:mt-14" />
                  <div className="mt-10">
                    <p className="text-xs md:text-[1rem] text-white">
                      As A Company Founded On Proven Systems And Models, Keller Williams Provides The Blueprint For Building A Big Business And An Even Bigger Life.
                    </p>
                    <div className="flex justify-center md:justify-center mt-6 md:mt-10">
                      <button className="
                        w-56 bg-[rgba(202,3,32,255)] text-white py-4 rounded-full font-semibold text-sm
                        relative overflow-hidden
                        group transition-all duration-300
                        hover:pr-8 hover:pl-4
                      ">
                        <span className="inline-block transition-all duration-300 group-hover:-translate-x-3">
                          GET STARTED
                        </span>
                        <span className="
                          absolute right-4 top-1/2 -translate-y-1/2
                          opacity-0 group-hover:opacity-100
                          transition-all duration-300 text-black
                          group-hover:translate-x-0 translate-x-4
                        ">
                          ⟶
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
        )}
      </div>

      {/* Form Section */}
      <div className="min-h-screen">
        {/* Title Banner */}
        <div className="bg-[rgba(202,3,32,255)] md:py-2 py-2 flex justify-center relative">

          <div className="relative">
            {/* KW Logo */}
            <Image 
              src="/kwlinelogo.png"
              alt="KW Logo"
              width={120}
              height={120}
              className="object-contain w-12 h-12 md:w-36 md:h-36"
            />
            <div className="absolute inset-0 flex items-center justify-center">
  <span className="text-white font-normal text-base md:text-3xl tracking-[0.2em] whitespace-nowrap">
  FRANCHISE APPLICATION
  </span>
</div>
          </div>
        </div>
       
        {/* Form + Sidebar Container */}
        <div className="flex flex-col lg:flex-row bg-gray-200 min-h-screen">
          {/* Left Black Sidebar */}
          <div className="hidden md:flex bg-black text-white flex-col items-center lg:w-95 border-r-2 rounded-r-2xl relative min-h-full">
            <div className="flex flex-col items-center top-0 left-20 absolute">
              {/* Logo in sidebar */}
              <Image
                src="/KellerWilliams_KSA.png"
                alt="logo"
                width={230}
                height={230}
                className="mb-2"
              />
            </div>

            <div className="pt-30 space-y-10 flex flex-col items-center">
  {/* Target Icon */}
  <div className="relative ml-10 h-[180px] w-[180px] transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
    <Image
      src="https://static.wixstatic.com/media/36a881_b93011b55c3c4cc5a3fec96a287e4564~mv2.png/v1/crop/x_0,y_37,w_289,h_255/fill/w_171,h_188,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-02-18%20135420.png"
      alt="Target Icon"
      fill
      style={{ objectFit: "contain" }}
    />
  </div>

  {/* Rocket Icons */}
  <div className="flex flex-wrap justify-center gap-8">
    {[279, 568, 0, 279, 568].map((x, i) => (
      <div key={i} className={`group ${i === 2 ? 'ml-5' : ''}`}>
        <div className="relative h-[180px] w-[180px] transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
          <Image
            src={`https://static.wixstatic.com/media/36a881_b93011b55c3c4cc5a3fec96a287e4564~mv2.png/v1/crop/x_${x},y_${i < 2 ? 23 : 324},w_289,h_255/fill/w_211,h_188,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Screenshot%202025-02-18%20135420.png`}
            alt="Rocket Icon"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    ))}
  </div>
</div>
</div>

          {/* Right Form Section */}
<div className="md:py-20 md:p-10 py-4 min-h-full w-full">
  <div className="px-4 sm:px-10 lg:px-20 text-gray-800">
  <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Name */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Your Name *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          required
          className="w-full py-2 md:py-3 px-3 rounded-2xl bg-white"
        />
      </div>

      {/* Surname */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Your Surname *
        </label>
        <input
          type="text"
          name="surname"
          value={form.surname}
          onChange={handleInputChange}
          required
          className="w-full py-2 md:py-3 px-3 rounded-2xl bg-white"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Your Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          required
          className="w-full py-2 md:py-3 px-3 rounded-2xl bg-white"
        />
      </div>

      {/* Company */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Your Company Name *
        </label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleInputChange}
          required
          className="w-full py-2 md:py-3 px-3 rounded-2xl bg-white"
        />
      </div>

      {/* Mobile Phone */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Your Mobile Phone *
        </label>
        <div className="flex items-center bg-white rounded-2xl px-2 py-1">
          <span className="mr-2 text-gray-500">
            <FaGlobe className="w-4 h-4" />
          </span>
          <PhoneInput
            inputProps={{
              name: 'mobile-phone',
              id: 'mobile-phone',
              required: true,
            }}
            country={'sa'}
            value={phone}
            onChange={setPhone}
            enableSearch={true}
            searchPlaceholder="Search Country"
            inputStyle={{
              width: '100%',
              border: 'none',
              background: 'white',
              fontSize: '14px',
              borderRadius: '12px',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '40px',
            }}
            buttonStyle={{
              border: 'none',
              background: 'white',
            }}
            containerStyle={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Date of Birth *
        </label>
        <div className="flex gap-3">
          <select className="w-full py-2 px-3 rounded-2xl bg-white text-[0.8rem] md:text-[1rem]">
            <option value="">Month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((month, i) => (
              <option key={i} value={String(i + 1).padStart(2, '0')}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Day"
            required
            className="w-full py-2 px-3 rounded-2xl bg-white text-[0.8rem] md:text-[1rem]"
          />
          <select required className="w-full py-2 px-3 rounded-2xl bg-white text-[0.8rem] md:text-[1rem]">
            <option value="">Year</option>
            {Array.from({ length: 100 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>{year}</option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Education, Province, Source */}
      {[
        "Your Education Status",
        "Province You Want to Apply",
        "How Did You Hear About the Keller Williams Brand ?"
      ].map((label, idx) => (
        <div key={idx}>
          <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
            {label} *
          </label>
          <input
            type="text"
            required
            className="w-full py-2 md:py-3 px-3 rounded-2xl bg-white"
          />
        </div>
      ))}

      {/* Promotional Permissions */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Promotional Permissions *
        </label>
        <div className="flex items-start gap-2">
          <input type="checkbox" required id="promoConsent" className="mt-1" />
          <label
            htmlFor="promoConsent"
            className="text-[0.8rem] md:text-[0.9rem] leading-5"
          >
            I consent to receiving promotional emails, text messages, and calls regarding Keller Williams services.
          </label>
        </div>
      </div>

      {/* Personal Data Protection */}
      <div>
        <label className="block mb-2 ml-2 text-[0.8rem] md:text-[1rem] font-normal">
          Personal Data Protection Declaration *
        </label>
        <div className="flex items-start gap-2">
          <input type="checkbox" required id="dataConsent" className="mt-2" />
          <label
            htmlFor="dataConsent"
            className="text-[0.8rem] md:text-[0.9rem] leading-5"
          >
            As Keller Williams Saudi Arabia, we care about your security. In order to fulfill our obligation to inform arising from Article 10 of the Personal Data Protection Law and to obtain your{' '}
            <strong>&quot;Personal Data Protection and Personal Data Sharing Permission&quot;</strong> from our valued visitors, we kindly request you to read and approve the text in the link below.
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex md:justify-end justify-center">
        <button
          type="submit"
          className="w-full md:w-32 bg-[rgba(202,3,32,255)] text-white py-2 rounded-full text-base font-semibold hover:bg-gray-600 transition"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
</div>
</div>

      <div  className="hidden md:flex order-2 bg-[rgba(204,0,31)] md:order-1 items-center justify-center h-[25px] md:h-[76px]">
    <Image
      src="/kwline1.png"
      alt="KW Logo Center"
      width={80}
      height={80}
      className="object-contain mx-auto w-7 h-7 md:w-20 md:h-20"
    />
  </div>
      <hr className="hidden md:block w-5/12 mx-auto bg-[rgba(202,3,32,255)] h-[2px] border-0 mt-4 md:mt-20 mb-10" />
      <Footer />
    </div>
  );
};

export default Franchise;
