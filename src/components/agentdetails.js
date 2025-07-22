'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MapPin, Building2, Phone, Mail } from 'lucide-react';
import Footer from '@/components/footer';
import { FaArrowLeft } from 'react-icons/fa';
import Header from '@/components/header';

const AgentProfile = (props) => {
  
  const [agent, setAgent] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    // Load agent from localStorage
    try {
      const agentData = localStorage.getItem('selectedAgent');
      if (agentData) {
        const parsed = JSON.parse(agentData);
        setAgent(parsed);
        if (parsed.image) setImgSrc(parsed.image);
      } else {
        setError('No agent selected.');
      }
    } catch (e) {
      setError('Failed to load agent data.');
    }
  }, []);

  useEffect(() => {
    // Fetch all properties and filter for this agent
    const fetchProperties = async () => {
      if (!agent) return;
      setLoading(true);
      try {
        const res = await fetch('https://kw-backend-q6ej.vercel.app/api/listings/list/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        let all = Array.isArray(data.data) ? data.data : [];
        // Filter by agent email if available, else by name
        let filtered = all.filter((prop) => {
          if (agent.email && (prop.agent_email || prop.agent?.email)) {
            return (
              prop.agent_email === agent.email ||
              (prop.agent && prop.agent.email === agent.email)
            );
          } else if (agent.name || agent.fullName) {
            const agentName = agent.name || agent.fullName;
            return (
              prop.agent_name === agentName ||
              (prop.agent && prop.agent.name === agentName)
            );
          }
          return false;
        });
        setProperties(filtered);
      } catch (e) {
        setError('Failed to load properties.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [agent]);

  if (error) {
    return (
      <div className='relative p-6 md:p-8'>
        <Header />
        <div className='text-center bg-[rgba(202,3,32,255)] py-20'>{error}</div>
        <Footer />
      </div>
    );
  }
  if (!agent) {
    return null;
  }

  return (
    <div className='relative p-6 md:p-8 '>
      <Header />
      <div className="absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgba(202,3,32,255)] z-0"></div>

<div className="relative bg-gray-100 px-4 md:px-20 py-4 md:py-10">
  {/* Top Header */}
  <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
    {/* Back Button */}
    <div className="flex items-center gap-2 md:mt-30 mt-20 px-4 border rounded-full border-[rgba(202,3,32,255)] py-1 bg-[rgba(202,3,32,255)] h-10">
      <a href="/properties" className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full bg-white border border-white text-[rgba(202,3,32,255)] hover:bg-gray-100">
        <FaArrowLeft className="w-2 h-2 md:w-3 md:h-3" />
      </a>
      <a href={props.nav} className="text-[0.6rem] md:text-xs text-white font-medium">Back to Search</a>
    </div>
    {/* Title */}
    <div className="hidden md:flex items-center mt-30 md:mt-30">
      <span className="text-gray-700 text-sm md:text-xl text-center md:text-left">
        Properties In The Kingdom Of Saudi Arabia
      </span>
    </div>
  </div>

  {/* Agent Card Section */}
  <div className="hidden md:flex flex-col md:flex-row md:mt-6 mt-20 shadow-xl rounded-3xl overflow-hidden  w-full">
    {/* Left Section */}
    <div className="w-full  text-white p-6 bg-[rgba(202,3,32,255)] min-h-[60vh] lg:min-h-[60vh] flex flex-col justify-center">
      <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold uppercase  break-words">
        {agent.name || agent.fullName || '-'}
      </h1>
      <div className=" text-base lg:text-lg font-medium">
        <div className="flex gap-2 lg:gap-3 mt-8 lg:mt-10 items-center">
          <MapPin className="w-5 h-5" />
          <span className="truncate">{agent.city || '-'}</span>
        </div>
        <div className="flex gap-2 lg:gap-3 mt-8 lg:mt-10 items-center">
          <Building2 className="w-5 h-5" />
          <span className="truncate">{agent.marketCenter || '-'}</span>
        </div>
        <div className="flex gap-2 lg:gap-3 mt-20 lg:mt-10 items-center">
          <Phone className="w-5 h-5" />
          <span className="truncate">{agent.phone || '-'}</span>
        </div>
        <div className="flex flex-wrap gap-2 lg:gap-3 mt-8 lg:mt-10 items-center">
          <Mail className="w-5 h-5 flex-shrink-0" />
          <span className="break-all">{agent.email || '-'}</span>
        </div>
      </div>
    </div>
    {/* Right Section */}
    <div className="w-full  relative flex items-center justify-center bg-[rgba(202,3,32,255)]">
      {/* Optional Background Split for Desktop */}
      <div className="hidden md:flex absolute inset-0">
        <div className="w-1/2 bg-[rgba(202,3,32,255)]"></div>
        <div className="w-1/2 bg-gray-400"></div>
      </div>
      {/* Agent Image */}
      <div className="relative z-10 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 w-80 h-80 lg:w-80 lg:h-80 aspect-square">
        <Image
          src={agent.image || '/images.jpg'}
          alt={agent.name || agent.fullName || 'Agent'}
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>

  {/* Bottom Action Section */}
  <div className="hidden md:flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
    <button
      className="w-full md:w-[50%] bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-10 rounded-full text-lg md:text-xl text-center"
      onClick={() => setShowModal(true)}
    >
      Book Appointment
    </button>
    <span className="text-gray-500 text-xs md:text-base text-center md:text-left">
      KWUID No : {agent.kwId || '-'}
    </span>
  </div>


{/* Mobile-Only Agent Card Box */}
<div className="flex flex-col bg-white shadow-lg rounded-2xl gap-4 md:hidden">
  {/* Agent Image */}
  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
  
      <Image
       src={agent.image||'/images.jpg'}
        alt={agent.name || agent.fullName || 'Agent'}
        width={160}
        height={160}
        className="object-cover w-full h-full"
       
      />
   
  </div>

  {/* Agent Info */}
  <div className="text-center space-y-2">
    <h2 className="text-xl font-bold uppercase text-gray-800">{agent.name || agent.fullName || '-'}</h2>
    <hr className="w-1/2 mx-auto h-[2px] bg-[rgba(202,3,32,255)] border-0" />
  </div>

  {/* Info Items */}
  <div className="space-y-3 text-gray-700 text-sm font-medium">
    <div className="flex items-start gap-2">
      <MapPin className="w-4 h-4 mt-1" />
      <span>{agent.city || '-'}</span>
    </div>
    <div className="flex items-start gap-2">
      <Building2 className="w-4 h-4 mt-1" />
      <span>{agent.marketCenter || '-'}</span>
    </div>
    <div className="flex items-start gap-2">
      <Phone className="w-4 h-4 mt-1" />
      <span>{agent.phone || '-'}</span>
    </div>
    <div className="flex items-start gap-2 flex-wrap">
      <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
      <span className="break-all">{agent.email || '-'}</span>
    </div>
  </div>
  
</div>
 <div className=" md:hidden flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
    <button
      className="w-full md:w-[50%] bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-10 rounded-full text-lg md:text-xl text-center"
      onClick={() => setShowModal(true)}
    >
      Book Appointment
    </button>
    <span className="text-gray-500 text-xs md:text-base text-center md:text-left">
      KWUID No : {agent.kwId || '-'}
    </span>
  </div>
  </div>
      <div className="flex flex-col md:flex-row items-center justify-center  mx-2 md:mx-0 bg-white py-10 md:py-10  ">

<div className="grid grid-cols-1 md:grid-cols-2 max-w-full w-full gap-0">

  {/* Left Red Box */}
  <div className="bg-[rgba(202,3,32,255)] text-white p-6 md:p-14 py-15 md:py-0 flex md:border-l md:rounded-l-3xl flex-col justify-center">
    <p className="text-base md:text-xl font-semibold mb-2">| Download guide</p>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">How to sell your home</h2>
    <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
      The guide to selling a property will advise not only on the process
      but also how you can be super prepared and help to achieve the highest sale price.
    </p>
    <div className="hidden md:flex w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center md:items-stretch gap-2 rounded-3xl">
  
  <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />

  <button className="w-full md:w-auto bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 md:px-8 py-2 text-base font-semibold border rounded-3xl">
    Download
  </button>

</div>
 <div className=" flex md:hidden w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center md:items-stretch gap-2 rounded-3xl">
  
  <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />
  </div>
  <button className="flex md:hidden mt-4 w-fit  bg-black hover:bg-red-950 text-white px-8 py-2 text-base font-semibold border-black rounded-3xl">
    Download
  </button>


</div>

  {/* Right Image Box */}
  <div className="relative h-[460px] md:h-[420px] ">
    <Image
       src="/Homepage_buy_your_home.jpeg" // Replace with your actual image path
      alt="Home"
      fill
      className="object-cover grayscale md:border-r md:rounded-r-3xl"
    />
<div className="absolute inset-0 bg-black/50 md:border-r md:rounded-r-3xl py-15 md:py-0"></div>
    <div className="absolute inset-0 bg-opacity-40 p-4 md:p-10 flex flex-col justify-center text-white ">
    <p className="text-base md:text-xl font-semibold mb-2">| Download guide</p>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">How to buy a home</h2>
    <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
        The following guide to buying a property will explain how to position
        yourself to negotiate the best price, but importantly ensure you are
        the winning bidder when up against the competition.
      </p>
      <div className="hidden md:flex w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center gap-2 rounded-3xl">
      <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />

  <button className="w-full md:w-auto bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white px-4 md:px-8 py-2 text-base font-semibold border rounded-3xl">
    Download
  </button>

</div>
 <div className=" flex md:hidden w-full max-w-full md:max-w-md p-1 bg-white  flex-col md:flex-row items-center md:items-stretch gap-2 rounded-3xl">
  
  <input
    type="text"
    placeholder="email"
    className="w-full px-4 py-2 text-black text-base outline-none rounded-3xl"
  />
  </div>
  <button className="flex md:hidden mt-4 w-fit  bg-black hover:bg-red-950 text-white px-8 py-2 text-base font-semibold border-black rounded-3xl">
    Download
  </button>


    </div>
  </div>

</div>

</div>
  {/* Properties by Agent Section */}
  <div className="w-full flex justify-center my-4">
        <div className="w-full bg-gray-100 rounded-3xl p-6 md:p-12 shadow flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <span className="text-3xl text-[rgba(202,3,32,255)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v7a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7z" /></svg>
              </span>
              <h2 className="text-lg md:text-2xl font-semibold text-gray-700">
                Properties by <span className="text-[rgba(202,3,32,255)]">{agent.name || agent.fullName || '-'}</span>
              </h2>
            </div>
            <span className="text-gray-500 text-sm md:text-lg font-semibold">Property Count : {loading ? '...' : properties.length}</span>
          </div>
          {/* Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center text-gray-500 py-10">Loading properties...</div>
            ) : properties.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-10">No properties found for this agent.</div>
            ) : (
              properties.map((prop, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow p-4 flex flex-col">
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={
                        prop.image ||
                        (Array.isArray(prop.images) && prop.images[0]) ||
                        (Array.isArray(prop.photos) && prop.photos[0]?.ph_url) ||
                        '/home2.jpg'
                      }
                      alt="Property"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="text-left text-lg font-bold text-gray-700 mb-2">
                    {prop.price ? `ر.س ${prop.price.toLocaleString()}` : prop.current_list_price || '-'}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>{prop.bedrooms || prop.total_bed || '-'} bd</span>
                    <span>{prop.bathrooms || prop.total_bath || '-'} ba</span>
                    <span>{prop.areaSize || prop.lot_size_area || '-'} sq m</span>
                    <span>{prop.areaSize ? (prop.areaSize * 1.07639).toFixed(2) : (prop.lot_size_area ? (prop.lot_size_area * 1.07639).toFixed(2) : '-')} sq m</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {prop.address || prop.location || (prop.property_address && prop.property_address.address) || '-'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Modal for Book Appointment */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 relative shadow-2xl border border-gray-200">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>

            {/* Agent Info */}
            <div className="flex items-center space-x-4 mb-6">
              <Image
                src={imgSrc || '/images.jpg'}
                alt={agent.name || agent.fullName || 'Agent'}
                width={50}
                height={50}
                className="w-18 h-16 rounded-xl"
              />
              <h2 className="text-lg font-bold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-full">
                {agent.name || agent.fullName || '-'}
              </h2>
            </div>

            {/* Form */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <textarea
                rows="3"
                className="w-full text-sm md:text-base px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                defaultValue={`Hi ${agent.name || agent.fullName || ''}, I saw your profile on Keller Williams and wanted to see if I can get some help`}
              ></textarea>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
                <option>Select</option>
                <option>Buy</option>
                <option>Rent</option>
                <option>Sell</option>
              </select>

              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                <span>
                  By submitting this form I agree to{' '}
                  <a href="#" className="text-blue-600 underline">
                    Terms of Use
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-3 bg-[rgba(202,3,32,255)] hover:bg-red-800 text-white font-bold rounded-full"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AgentProfile;