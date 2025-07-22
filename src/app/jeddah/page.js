// import React from 'react';
// import Header from '@/components/header';
// import Box from '@/components/box';
// import Footer from '@/components/footer';
// import RiyadhJedah from '@/components/riyadhJedah';
// const Jeddhah = () => {
//     return (
//         <div>
//            <Header />
//       <Box
//         h3={"Jeddah Contact Us"}
//         src="/bgriyadh.jpg"
//         image={
//           'https://static.wixstatic.com/media/36a881_3c5b1d5faca941ea915b39acfedf52ee~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2-removebg-preview.png'
//         }
//       /> 
         

//       <RiyadhJedah p={'JEDDAH'} map={'https://www.google.com/maps?q=Jeddah,+Saudi+Arabia&output=embed'} address={'Al Khalidiyyah, Jeddah 23421'}></RiyadhJedah>
//         </div>
//     );
// }

// export default Jeddhah;




'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Box from '@/components/box';
import Image from 'next/image';
const Jeddah = () => {

    const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      email: '',
      addressTo: '',
      message: ''
    });
    const [status, setStatus] = useState(null); // null | 'success' | 'error'
    // Add state for team members, loading, and error
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus(null);
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setStatus('success');
          setForm({ firstName: '', lastName: '', email: '', addressTo: '', message: '' });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    useEffect(() => {
      const fetchAgents = async () => {
        try {
          const response = await fetch('https://kw-backend-q6ej.vercel.app/api/agent/2414288');
          if (!response.ok) throw new Error('Failed to fetch agents');
          const data = await response.json();
          // Map backend fields to UI fields
          console.log(data);
          
          const mappedAgents = Array.isArray(data.data) ? data.data.map(agent => ({
            name: agent.fullName || agent.name,
            phone: agent.phoneNumber || agent.phone,
            email: agent.emailAddress || agent.email,
            city: agent.city,
            image: agent.photo || agent.image,
            title: agent.title || '',
            _id: agent._id || agent.id
          })) : [];
          setTeamMembers(mappedAgents);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAgents();
    }, []);
   
    return (
        <div>
        <Header></Header>
          <Box
       h3="Jeddah Contact Us"
      src="/bgriyadh.jpg"
         image={
           'https://static.wixstatic.com/media/36a881_3c5b1d5faca941ea915b39acfedf52ee~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2-removebg-preview.png'
         }
       /> 
        {/* Combined Section */}
      <div className="bg-gray-200 rounded-2xl border-gray-200 my-8 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side (Map + Address) */}
         <div className="flex-1 p-6 flex justify-center items-center">
  <div className="w-full md:max-w-full">
  <div className="text-center mb-4">
  <div className="font-bold uppercase tracking-widest text-sm flex justify-between max-w-xs mx-auto pb-4">
    <span>EMAIL</span>
    <span>TELEPHONE</span>
  </div>
  <hr className="border-t border-[rgba(202,3,32,255)] w-120 mx-auto mb-4" />
  <p className="text-[0.6rem] md:text-sm font-medium mt-2 tracking-wide">
  Al Khalidiyyah, Jeddah 23421
  </p>
</div>


    {/* Map */}
    <div className="w-full h-[300px] mt-15 md:px-15">
      <iframe
        src='https://www.google.com/maps?q=Jeddah,+Saudi+Arabia&output=embed'
        className="w-full h-full rounded"
        loading="lazy"
      />
    </div>
  </div>
</div>

          {/* Vertical Line */}
          <div className="hidden md:flex items-stretch">
            <div className="w-[2px] bg-gray-300 mx-1"></div>
          </div>

          {/* Right Side (Form) */}
<div className="flex-1 p-6 flex justify-center items-center">
  <form className="w-full md:max-w-full space-y-4 py-10 md:px-15" onSubmit={handleSubmit}>
    <div>
      <label className="block mb-1 md:text-base text-base font-sm">First Name</label>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First name"
        className="w-full text-base p-3 mt-2 border-white rounded bg-white focus:outline-none"
        required
      />
    </div>
    <div className='py-2'>
      <label className="block mb-1 md:text-base text-base font-sm">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last name"
        className="w-full p-3 text-base mt-2 border-white rounded bg-white focus:outline-none"
        required
      />
    </div>
    <div className='py-2'>
      <label className="block mb-1 md:text-base text-base font-sm">Email *</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 text-base mt-2 border-white rounded bg-white focus:outline-none"
        required
      />
    </div>
    <div className='py-2'>
      <label className="block mb-1 md:text-base text-base font-sm">Address To</label>
      <select
        name="addressTo"
        value={form.addressTo}
        onChange={handleChange}
        className="w-full p-3 text-base mt-2 border-white rounded bg-white focus:outline-none"
        required
      >
        <option value="">Select</option>
        <option value="sales">Sales</option>
        <option value="support">Support</option>
      </select>
    </div>
    <div className='py-2'>
      <label className="block mb-1  md:text-base text-base font-sm">Message *</label>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message"
        rows="2"
        className="w-full p-4 text-base border-white mt-2 rounded bg-white focus:outline-none"
        required
      />
    </div>
    <button
      type="submit"
      className="w-full md:w-32 bg-[rgba(202,3,32,255)] text-white py-2 rounded-full text-base font-semibold hover:bg-gray-600 transition"
    >
      Submit
    </button>
    {status === 'success' && (
      <p className="text-green-600 text-center mt-2">Thank you! Your message has been sent.</p>
    )}
    {status === 'error' && (
      <p className="text-red-600 text-center mt-2">Sorry, there was an error. Please try again.</p>
    )}
  </form>
</div>

        </div>
      </div>
        <div className="min-h-screen bg-white mt-4 md:mt-20">
        {/* Changed outer container to stack on mobile */}
        <div className="flex flex-col md:flex-row border-t border-b border-r border-black">
          
          {/* Left Section - Full width on mobile, sticky 50% on desktop */}
          <div className="w-full md:w-1/2 flex justify-center items-center 
                         md:sticky md:top-0 top-20 h-auto md:h-screen 
                         border-b md:border-b md:border-r border-black
                         py-4 md:py-0">
            <div className="text-center px-4">
              <h2 className="text-3xl font-semibold mb-2">OUR TEAM</h2>
              <div className="w-30 h-0.5 bg-[rgba(202,3,32,255)] mb-2 mx-auto border-0 mt-4 md:mt-10"></div>
              <p className="text-sm tracking-wider mt-4 md:mt-10 text-gray-600">JEDDAH</p>
            </div>
          </div>
      
          {/* Right Section - Full width on mobile, 50% on desktop */}
          <div className="w-full md:w-1/2">
      {loading && (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[rgba(202,3,32,255)] border-solid"></div>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && teamMembers.length === 0 && <div>No agents found.</div>}
      {!loading && !error && teamMembers.map((agent, idx) => (
        <React.Fragment key={agent._id || idx}>
          <article
            className="p-4 md:mx-3 flex flex-row items-start gap-4 relative"
          >
            {/* Agent Image */}
            <div className="w-32 h-32 md:w-50 md:h-50 flex-shrink-0 relative md:mx-3">
              <div 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent click (prevents navigating)
                  localStorage.setItem('selectedAgent', JSON.stringify(agent));
                  window.location.href = '/jeddahagentdetails';
                }}
                className="cursor-pointer"
              >
                {agent.image ? (
                  <Image 
                    src={agent.image}
                    alt={`Portrait of ${agent.name}`}
                    width={128}
                    height={128}
                    className="rounded-lg object-cover w-32 h-32 md:w-50 md:h-50"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg">
                    <span className="text-xs text-gray-500">No Image</span>
                  </div>
                )}
              </div>
            </div>
            {/* Vertical Divider */}
            <div className="hidden md:block w-px bg-gray-300 mx-2" />
            {/* Agent Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 ">
                <h3 className="text-xs font-normal md:font-semibold md:text-base md:tracking-[0.2em] uppercase md:mb-2">{agent.name}</h3>
                {/* <p className="text-sm text-gray-500 ml-auto">{agent.city}</p> */}
              </div>
              <p className="md:text-sm text-[0.7rem]  mb-2 md:mb-2 break-all">{agent.phone}</p>
              <p className="md:text-sm text-[0.7rem] mb-4 md:mb-12 break-all">
                {agent.email}
              </p>
              <div className="space-y-1">
                <a href="/instantvaluation" className="block md:text-sm text-[0.8rem]">Get Evaluation</a>
                <hr  className='hidden md:flex w-60 bg-[rgba(202,3,32,255)] h-[1px] my-2 border-0'/>
                <a 
                  href="/jeddahagentdetails" 
                  className="block md:text-sm text-[0.8rem] cursor-pointer hover:text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem('selectedAgent', JSON.stringify(agent));
                    window.location.href = '/jeddahagentdetails';
                  }}
                >
                  View Details and Properties
                </a>
              </div>
            </div>
          </article>

          
           {/* Divider - Same as before */}
          {idx !== teamMembers.length - 1 && (
  <hr className="border-t border-black w-full" />
)}

              
        </React.Fragment>
      ))}
        </div>
        </div>
        </div>
       
             <div className="flex justify-center py:4 md:py-16">
                    <Image
                      src="/howwillyouthink.png"
                      alt="How Will You Thrive"
                      width={800}
                      height={400}
                      className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
                    />
                  </div>
                   <hr className="w-8/12 md:w-6/12 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px] mt-10 mb-10" />
          <Footer></Footer>
        </div>
    );
}

export default Jeddah;