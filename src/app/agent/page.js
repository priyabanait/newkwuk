'use client'
import React from 'react';
import Header from '@/components/header';
import Box from '@/components/box';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BsInstagram, BsTwitterX, BsLinkedin } from "react-icons/bs";
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
const Footer = dynamic(() => import('@/components/footer'), { ssr: false });

const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 4;
  const [totalAgents, setTotalAgents] = useState(0);
  const [backendCount, setBackendCount] = useState(0);

  // Filter states
  const [filterName, setFilterName] = useState("");
  const [filterMarket, setFilterMarket] = useState("");
  const [filterCity, setFilterCity] = useState("");

  // Debounce state
  const [debouncedName, setDebouncedName] = useState("");
  const debounceTimeout = useRef(null);

  // Debounce effect for name
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedName(filterName);
    }, 350); // 350ms debounce
    return () => clearTimeout(debounceTimeout.current);
  }, [filterName]);

  // Fetch agents from backend with pagination and filters
  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build query params for filters
        let query = `?page=${currentPage}&limit=${agentsPerPage}`;
        if (debouncedName.trim()) query += `&name=${encodeURIComponent(debouncedName.trim())}`;
        if (filterMarket && filterMarket !== "MARKET CENTER") query += `&marketCenter=${encodeURIComponent(filterMarket)}`;
        if (filterCity && filterCity !== "CITY" && filterCity !== "RESET_ALL") query += `&city=${encodeURIComponent(filterCity)}`;
        const response = await fetch(`https://kw-backend-q6ej.vercel.app/api/agents/merge${query}`);
        if (!response.ok) throw new Error('Failed to fetch agents');
        const data = await response.json();
        console.log(data);
        
        // Map backend fields to UI fields
        const mappedAgents = Array.isArray(data.data) ? data.data.map(agent => ({
          name: agent.fullName || agent.name,
          phone: agent.phoneNumber || agent.phone,
          email: agent.emailAddress || agent.email,
          city: agent.city,
          image: agent.photo || agent.image,
          _id: agent._id || agent.id,
          marketCenter: agent.marketCenter || agent.market || ""
        })) : [];
        setAgents(mappedAgents);
        setTotalAgents(data.total || 0);
        setBackendCount(data.count || mappedAgents.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, [currentPage, agentsPerPage, debouncedName, filterMarket, filterCity]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedName, filterMarket, filterCity]);

  // Remove client-side filtering
  // const filteredAgents = agents.filter(...)
  // const currentAgents = filteredAgents;
  const currentAgents = agents; // Already filtered and paginated from backend
  const totalPages = Math.ceil(totalAgents / agentsPerPage) || 1;

  const router = useRouter();

  const handleAgentClick = (agent) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAgent', JSON.stringify(agent));
      router.push(`/agent/newdetails`);
    }
  };

  return (
    <div className="relative">
      <Header />

      <Box
        h3="Find an Agent"
        src="/find_an_agent.jpeg"
        image="https://static.wixstatic.com/media/36a881_81438044a1d045b894b318b12b06aa24~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3-removebg-preview.png"
      />
<main className="px-2 md:py-6 mt-4 md:mt-10 md:mx-10 ">
  <div className="bg-gray-100 shadow-sm p-4 rounded-xl flex items-center justify-center border border-gray-100">
    {/* Search Filters */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-5xl">
      
      {/* Agent Name Input */}
      <div className="flex-1 w-full min-w-[150px]">
        <input 
          type="text" 
          id="name"
          placeholder="Type Name.." 
          className="w-full px-4 py-2 border border-gray-300 rounded md:text-sm text-black text-[0.7rem]"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
        />
      </div>

      {/* Market Center Dropdown */}
      <div className="flex-1 w-full min-w-[150px]">
        <select 
          id="market" 
          className="w-full px-4 py-2 border border-gray-300 text-gray-500 rounded md:text-[0.8rem] md:font-normal text-[0.8rem] hover:border-gray-500 focus:border-gray-500 focus:outline-none"
          value={filterMarket}
          onChange={e => setFilterMarket(e.target.value)}
        >
          <option>Market Center</option>
          <option>Jasmin</option>
          <option>Jeddah</option>
        </select>
      </div>

      {/* City Dropdown */}
      <div className="flex-1 w-full min-w-[150px]">
        <select
          id="city"
          className="w-full px-4 py-2 text-gray-500 md:text-[0.8rem] md:font-normal border border-gray-300 rounded text-[0.8rem] hover:border-gray-500 focus:border-gray-500 focus:outline-none"
          value={filterCity}
          onChange={e => setFilterCity(e.target.value)}
        >
          <option value="CITY">City</option>
          <option value="RESET_ALL">All</option>
          <option value="ALRIYADH">ALRIYADH</option>
          <option value="Al Khobar">Al Khobar</option>
          <option value="Al_khobar">Al khobar</option>
          <option value="Al-badaya, Qassim">Al-badaya, Qassim</option>
          <option value="AlRiyadh">AlRiyadh</option>
          <option value="ArRiyadh">ArRiyadh</option>
          <option value="Riyadh">Riyadh</option>
          <option value="Buraydah">Buraydah</option>
          <option value="JED">JED</option>
          <option value="JEDDAH">JEDDAH</option>
          <option value="Jeddah">Jeddah</option>
          <option value="jeddah">jeddah</option>
          <option value="Jeddah city">Jeddah city</option>
          <option value="KSA">KSA</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="West of Riyadh">West of Riyadh</option>
          <option value="alriyadh">alriyadh</option>
          <option value="jed">jed</option>
          <option value="jeddah">jeddah</option>
          <option value="jeedah">jeedah</option>
          <option value="ksa">ksa</option>
          <option value="qaseem">qaseem</option>
          <option value="riyad">riyad</option>
          <option value="riyadh">riyadh</option>
          <option value="riyadh/Najm Al-Din Al-Ayoubi Road">riyadh/Najm Al-Din Al-Ayoubi Road</option>
          <option value="ryadh">ryadh</option>
          <option value="25,000">25,000</option>
          <option value="الرياض">الرياض</option>
          <option value="جدة">جدة</option>
          <option value="جازان">جازان</option>
          <option value="دمام">دمام</option>
        </select>
      </div>
    </div>
  </div>
</main>



<div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] bg-gray-100 md:mx-0 p-4 md:p-4 gap-0 rounded-4xl">
  {/* Left: Agents List */}
  <div className="space-y-6 md:pr-6 md:my-15">
    <h2 className="font-semibold text-center text-sm ">OUR AGENTS</h2>
    <hr className="bg-gray-500 h-[1px] border-0 md:w-160 w-30mx-auto" />


    <div className="grid grid-cols-1 gap-6">
      {loading && (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[rgba(202,3,32,255)] border-solid"></div>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && currentAgents.length === 0 && <div>No agents found.</div>}
      {!loading && !error && currentAgents.map((agent, idx) => (
        <article
          key={agent._id || idx}
          className="bg-gray-200 p-4 rounded-xl md:mx-3 shadow-md flex flex-row items-start gap-4 relative hover:shadow-lg transition-shadow"
        >
          {/* Agent Image */}
          <div className="w-32 h-32 md:w-50 md:h-50 flex-shrink-0 relative md:mx-3">
            <div 
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click (prevents navigating)
                localStorage.setItem('selectedAgent', JSON.stringify(agent));
                window.location.href = '/agent/newdetails';
              }}
              className="cursor-pointer"
            >
              <Image 
              src={agent.image||'/images.jpg'}

                alt={`Portrait of ${agent.name}`}
                width={128}
                height={128}
                className="rounded-lg object-cover w-32 h-32 md:w-50 md:h-50"
                
              />
            </div>
          </div>

          {/* Agent Info */}
          <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 ">
  <h3 className="text-xs font-normal md:font-semibold md:text-base md:tracking-[0.2em] uppercase md:mb-2">{agent.name}</h3>
  <p className="text-sm text-gray-500 ml-auto">{agent.city}</p>
</div>

            <p className="md:text-sm text-[0.7rem]  mb-2 md:mb-2 break-all">{agent.phone}</p>
          
            <p className="md:text-sm text-[0.7rem] mb-4 md:mb-12 break-all">
  {agent.email}
</p>


            <div className="space-y-1">
              <a href="/instantvaluation" className="block md:text-sm text-[0.8rem]">Get Evaluation</a>
              <hr  className='hidden md:flex w-60 bg-[rgba(202,3,32,255)] h-[1px] my-2 border-0'/>
              <button onClick={() => handleAgentClick(agent)}>
                View Details
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className=" hidden md:flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3 absolute right-4 top-4 sm:top-14">
            
            <a href="#" aria-label="Instagram" className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
              <BsInstagram size={12} />
            </a>
            <a href="#" aria-label="Twitter" className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
              <BsTwitterX size={12} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
              <BsLinkedin size={12} />
            </a>
          </div>
        </article>
      ))}
    </div>
        {/* Pagination Controls */}
        {!loading && !error && totalAgents > agentsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="mx-2 text-sm">Page {currentPage} of {totalPages}</span>
            <button
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
        {/* Hide old Load More button */}
  </div>

  {/* Vertical Divider */}
  <div className="hidden md:block w-px bg-gray-300 mx-2" />

  {/* Right: Map */}
  <div className=" hidden md:block pl-0 md:pl-6 my-6 md:my-10">
    <div className="relative w-full h-full overflow-hidden border border-gray-200 min-h-[1200px]" style={{ height: '1200px' }}>
      <iframe
        title="Saudi Arabia Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4444535.330365576!2d41.51259970861697!3d23.8006960408425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e8e4f105f8aaaf%3A0x70a8a6a2cb7f9405!2sSaudi%20Arabia!5e0!3m2!1sen!2sin!4v1717315040974!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0, height: '1200px', minHeight: '1200px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>

      {/* Hide old Load More button on desktop */}
      <div className="hidden md:flex justify-start ml-42 mt-6">
        {/* Pagination controls already above, so remove this button */}
      </div>

     <div className="order-1 md:order-2 flex flex-col items-center justify-center py-4 md:py-16">
            <Image
              src="/howwillyouthink.png"
              alt="How Will You Thrive"
              width={800}
              height={400}
             className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
            />
          </div>


      <hr className="w-5/12 mx-auto bg-[rgba(202,3,32,255)] h-[1.5px] border-0 mt-2 md:mt-20 mb-10" />
      <Footer />
    </div>
  );
};

export default Agent;
