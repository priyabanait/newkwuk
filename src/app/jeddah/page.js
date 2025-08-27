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
import Footer from '@/components/newfooter';
import Box from '@/components/box';
import Image from 'next/image';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
            _id: agent._id || agent.id,
            kw_id: agent.kwId || agent.kw_id || ""
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
        <section className="mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side */}
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold leading-snug">
          Shape Your <br></br><span className="text-[rgb(206,32,39,255)]">Future</span> in Real Estate
        </h1>
        <p className="text-lg leading-relaxed">
  Are you ready to unlock your potential in the real estate industry? Join us at Keller
  Williams Saudi Arabia Career Night to learn more about how you can become a successful
  real estate agent with the world&apos;s largest real estate franchise.
</p>


        {/* Contact Info */}
        <div className="flex flex-cols-row gap-8 justify-center space-y-2 my-8 text-base text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">📞</span>
            <a href='tel:+966 500000000'>+966 500000000</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">✉️</span>
            <a href='mailto:info@kwsaudiarabia.com'>info@kwsaudiarabia.com</a>
          </div>
        </div>

        {/* Google Map */}
        <div className="w-full h-90">
          <iframe
            src='https://www.google.com/maps?q=Jeddah,+Saudi+Arabia&output=embed'
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="bg-white shadow-md p-6">
        <h2 className="text-2xl font-medium mb-6  flex justify-center">Contact Us Today</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-2 font-medium">Full Name</label>
            <input type="text" placeholder="First Name" className="w-full border border-gray-300 p-2" required />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">Mobile Number</label>
            <input type="text" placeholder="Mobile" className="w-full border border-gray-300 p-2" required />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">Email Address</label>
            <input type="email" placeholder="Email" className="w-full border border-gray-300 p-2" required />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">City</label>
            <input type="text" placeholder="City" className="w-full border border-gray-300 p-2" required />
          </div>

          <div>
            <label className="block text-sm mb-2 font-medium">Message</label>
            <textarea placeholder="Message" rows={4} className="w-full border border-gray-300 p-2"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[rgb(206,32,39,255)] text-white font-semibold py-2 hover:bg-red-800 transition"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
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
              <div className="w-30 h-0.5 bg-[rgb(206,32,39,255)] mb-2 mx-auto border-0 mt-4 md:mt-10"></div>
              <p className="text-sm tracking-wider mt-4 md:mt-10 text-gray-600">JEDDAH</p>
            </div>
          </div>
      
          {/* Right Section - Full width on mobile, 50% on desktop */}
          <div className="w-full md:w-1/2">
      {loading && (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[rgb(206,32,39,255)] border-solid"></div>
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
              <p className="md:text-sm text-[0.7rem] text-[rgb(206,32,39,255)]  mb-2 md:mb-2 break-all">Head of operations</p>
              <div className="mt-6 space-y-2">
  <p className="flex items-center gap-2 md:text-sm text-sm mb-2 md:mb-2 break-all">
    <FaPhoneAlt className="text-gray-600" />
    {agent.phone}
  </p>
  <p className="flex items-center gap-2 md:text-sm text-[0.7rem] mb-4 md:mb-12 break-all">
    <MdEmail className="text-gray-600" />
    {agent.email}
  </p>
</div>
<div className="flex justify-end">
  <Image
    src="/headerlogo.png"
    alt="Keller Williams"
    width={180}
    height={50}
    className="mb-4 w-28 md:w-44 lg:w-48 h-auto"
  />
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
                  
          <Footer></Footer>
        </div>
    );
}

export default Jeddah;