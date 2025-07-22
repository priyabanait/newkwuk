import React from 'react'
import Image from 'next/image';
export default function CeoTeam() {
    const teamMembers = [
        {
          name: "MUHANNAD AWAD",
          title: "CEO / OPERATING PRINCIPLE",
          email: "M.AWAD@KWSAUDIARABIA.COM",
          phone: "+966 56 505 7711",
          image: "https://static.wixstatic.com/media/36a881_c32aecbd35de48f1839a4c8b90be6196~mv2.jpg/v1/fill/w_365,h_365,fp_0.46_0.15,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pic48_edited.jpg", // Image must be in /public
        },
        {
          name: "HAIFA SDIRI",
          title: "REGIONAL MCA",
          email: "HSDIRI@KWSAUDIARABIA.COM",
          phone: "+966 55 469 1606",
          image: "https://static.wixstatic.com/media/36a881_1d8efa05d1da4efcbcdcfd4a99921c79~mv2.png/v1/fill/w_365,h_365,fp_0.49_0.23,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Haifa%20Sdiri.png", // Image must be in /public
        },
        {
          name: "ABDALLAH BAKEER",
          title: "REGIONAL DIRECTOR",
          email: "A.BAKEER@KWSAUDIARABIA.COM",
          phone: "+966 50 006 1897",
          image: "https://static.wixstatic.com/media/36a881_0ddd8c953b7b41509013bd8846239274~mv2.png/v1/fill/w_336,h_336,fp_0.51_0.24,lg_1,q_85,enc_avif,quality_auto/Abdullah%20Bakeer.png"
        },
        {
          name: "ALAA MOFTAH",
          title: "REGIONAL TECHNOLOGY MANAGER",
          email: "ALAA.MOFTAH@KWSAUDIARABIA.COM",
          phone: "+966 50 060 0592",
          image: "https://static.wixstatic.com/media/36a881_e0f85e7b86444035b1f97950b5574a74~mv2.png/v1/fill/w_365,h_365,fp_0.51_0.24,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Alaa%20Moftah.png", // Image must be in /public
        },
        {
          name: "AYAN HASSAN",
          title: "REGIONAL OPERATION MANAGER",
          email: "AYANH@KWSAUDIARABIA.COM",
          phone: "+966 56 754 8770",
          image: "https://static.wixstatic.com/media/36a881_2841965220f84b56b10665f5679c8081~mv2.png/v1/fill/w_365,h_365,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Nuha%20Alsubhi.png"
        },
        {
          name: "OSAMA HAMZE",
          title: "REGIONAL TECHNOLOGY",
          email: "OSAMA.HAMZE@KWSAUDIARABIA.COM",
          phone: "+966 59 848 0973",
          image: "https://static.wixstatic.com/media/36a881_da8c9c2ce26a4f6bb8c54774c402735f~mv2.png/v1/fill/w_365,h_365,fp_0.49_0.22,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Osama%20Hamza.png", // Image must be in /public
        },
      ];
  return (
    <div>
        <div className=" pt-4 md:pt-10 md:mx-10 mx-6 ">
  <div className="flex flex-col md:flex-row md:px-20 ">
    {/* Left Image */}
    <div className="  md:w-182 h-[40vh]  md:h-[500px] flex justify-center items-start">
  <Image
    src="https://static.wixstatic.com/media/36a881_b66311c7d0ce4bab88e85a84321bd1b0~mv2.jpg/v1/fill/w_798,h_934,fp_0.50_0.33,q_85,enc_avif,quality_auto/Pic153%20(4).jpg"
    alt="CEO"
    width={800}
    height={500}
    className="h-[40vh] md:h-[500px]   md:w-182 border rounded-[4rem] border-gray-400"
  />
</div>


    {/* Right Content - Changed to items-start */}
    <div className="w-full md:w-full flex flex-col justify-start items-center text-center mt-8 md:mt-12 px-2 md:px-10">
      <h1 className="text-4xl md:text-5xl font-normal tracking-wide">
        MEET OUR <span className="text-[rgba(202,3,32,255)] font-bold">CEO</span>
      </h1>

      <h2 className="text-[rgba(202,3,32,255)] py-4 md:py-4 mt-4 md:mt-14 text-[0.7rem] md:text-[0.9rem] font-semibold tracking-wider">
        CEO MESSAGE
      </h2>

      <p className="mt-4 md:text-[1rem] text-xs text-gray-700 md:leading-5 leading-normal max-w-md">
        More than ever, we want to thank and recognize our agents and partners
        for diligently bringing their very
        

 best when their clients need it most.
        As a company built by agents, and for agents, we wake up every day
      
         asking
        ourselves how we can best support them.
      </p>

      <p className="mt-6 md:text-[1rem] text-xs text-gray-700 md:leading-5 leading-normal max-w-md">
        KW has cultivated a agent-  

        centric, technology-driven, and

        education-based culture that rewards agents as stakeholders.
      
        Regional team members, market center team members, and 
      
        agent partners. No
        one succeeds alone, and  
      

        this is truly a shared moment in recognition of
        our continuous achievements together.</p>
     
    </div>
  </div>
</div>
     <div className="min-h-screen bg-white mt-4 md:mt-20">
  {/* Changed outer container to stack on mobile */}
  <div className="flex flex-col md:flex-row border-t border-b border-r border-black">
    
    {/* Left Section - Full width on mobile, sticky 50% on desktop */}
    <div className="w-full md:w-1/2 flex justify-center items-center 
                   md:sticky md:top-0 top-20 h-auto md:h-screen 
                   border-b md:border-b-0 md:border-r border-black
                   py-6 md:py-0">
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-4xl md:font-normal font-semibold mb-2">OUR TEAM</h2>
        <div className="w-30 h-0.5 bg-[rgba(202,3,32,255)] border-0 mb-2 mx-auto mt-4 md:mt-10"></div>
        <p className="text-sm tracking-wider mt-4 md:mt-10">REGION TEAM</p>
      </div>
    </div>

    {/* Right Section - Full width on mobile, 50% on desktop */}
    <div className="w-full md:w-1/2">
      {teamMembers.map((member, index) => (
        <div key={index}>
          <div className="flex flex-row gap-3 md:gap-6 p-6 md:p-6 items-start">
          <div className="flex-shrink-0 w-32 h-32 sm:w-32 sm:h-32 md:w-60 md:h-60">
  <Image
    src={member.image}
    alt={member.name}
    width={160}
    height={160}
    className="rounded-xl object-cover w-32 h-32 sm:w-32 sm:h-32 md:w-60 md:h-60"
  />
</div>

            <div className="flex-1 text-left">
            <p className="text-xs font-normal md:font-semibold md:text-base md:tracking-[0.2em] uppercase md:mb-2 break-all">
                {member.name}
              </p>
              <hr className="w-37 md:w-60 h-[1px] bg-[rgba(202,3,32,255)] border-0 my-2 mx-0"></hr>
              <p className="font-sans font-normal not-italic no-underline md:text-[0.8rem] text-[10px] leading-[1.6] tracking-normal">
 
                {member.title}
              </p>
              <p className="text-xs md:text-sm mb-1 text-gray-600 mt-8 md:mt-28 break-all">{member.email}</p>
              <p className="text-xs md:text-sm text-gray-600">{member.phone}</p>
            </div>
          </div>
          {index !== teamMembers.length - 1 && (
            <hr className="border-t border-black" />
          )}
        </div>
      ))}
    </div>
  </div>
</div>
    </div>
  )
}
