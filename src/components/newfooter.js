import Image from "next/image";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaTiktok, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

export default function Home() {
  const [open, setOpen] = useState(null);

  const toggleMenu = (menu) => {
    setOpen(open === menu ? null : menu);
  };
  
  const handleGoogleClick = () => {
    window.open("https://accounts.google.com/signin", "_blank", "width=500,height=600");
  };
  
  return (
    <div className="flex flex-col ">
      {/* Main Content */}
     

      {/* Footer */}
      <footer className="mt-auto md:mt-10">
        {/* Desktop Footer */}
        <div className="border-t border-gray-300 hidden md:block">
          {/* Top Footer */}
          <div className="md:mx-10 mx-4 py-10 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-6 gap-8">
            
            {/* Logo */}
            <div className="md:col-span-1">
              <Image
                src="/headerlogo.png"
                alt="Keller Williams"
                width={180}
                height={50}
                className="mb-4"
              />
            </div>

            {/* Column 1 */}
            <div>
              <h3 className="text-black font-semibold mb-3">OUR CULTURE</h3>
              <ul className="space-y-2 text-base text-gray-700">
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="/ourCulture/whyKW">Why KW</a></li>
                <li><a href="/training">Training</a></li>
                <li><a href="/ourCulture/technology">Technology</a></li>
                <li><a href="/ourCulture/news">News</a></li>
                <li><a href="/ourCulture/events">Events</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-black font-semibold mb-3">SEARCH</h3>
              <ul className="space-y-2 text-base text-gray-700">
                <li><a href="/properties">Properties</a></li>
                <li><a href="/agent">Agent</a></li>
                <li><a href="/agent">Market Center</a></li>
                <li>
                  <a 
                    href="https://www.kw.com/search/sale?viewport=56.41671222773751%2C120.63362495324327%2C-14.684966046563696%2C-6.807781296756721" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Worldwide
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-black font-semibold mb-3">OTHERS</h3>
              <ul className="space-y-2 text-base text-gray-700">
                <li><a href="/contactUs">Contact</a></li>
                <li><a href="/instantvaluation">Instant Valuation</a></li>
                <li><a href="/franchise">Open a Franchise</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-black font-semibold mb-3">KNOWLEDGE</h3>
              <ul className="space-y-2 text-base text-gray-700">
                <li><a href="/seller/sellerguid">Seller Guide</a></li>
                <li><a href="/buyer/buyerguid">Buyer Guide</a></li>
                <li><a href="/seller">Five Steps to Sell</a></li>
              </ul>
            </div>

            {/* Agent Portal Box */}
            <div className="bg-[rgb(206,32,39,255)] text-white p-5">
              <h3 className="text-lg font-semibold mb-4">AGENT PORTAL</h3>
              <p className="text-xs mb-3">
                Access your dashboard, tools and resources to grow your business.
              </p>
              <div className="relative w-full mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 pr-10 bg-white text-black text-sm outline-none border border-gray-300"
                />
                {/* Google logo button */}
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src="/googlelog.png"
                    alt="Google Logo"
                    width={22}
                    height={22}
                  />
                </button>
              </div>
              <a href='/signinagent' className="w-full flex justify-center bg-white text-[rgb(206,32,39,255)] py-2 text-sm font-medium hover:bg-gray-800 px-4">
                Sign In
              </a>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-300 mt-6">
            <div className="md:mx-8 mx-auto py-6">
              <div className="flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-600">
                
                {/* Left Text */}
                <div className="text-center md:text-left mb-3 md:mb-0">
                  <a href="https://www.kwsaudiarabia.com/termsofuse" className="mx-2">Terms of Use</a> | 
                  <a href="https://www.kwsaudiarabia.com/privacypolicy" className="mx-2">Privacy Policy</a> | 
                  <span className="mx-2">REGA License Number #1200018764</span> | 
                  <a href='#' className="mx-2">شركة المقيّمين لإدارة وتطوير العقارات</a>
                </div>

                {/* Social Icons */}
                <div className="flex space-x-4 text-xl">
                  
                <a href="https://www.snapchat.com/add/kwsaudiarabia?invite_id=uOPm-ny1&locale=en_SA%40calendar%3Dgregorian&share_id=AYEA3l8WSMqsIdDUTwPzow&sid=26f1fc0b18b4498197cf201797833561">
                <i className="fab fa-snapchat"></i></a>
                <a href="https://www.facebook.com/kellerwilliamssaudiarabia"><i className="fab fa-facebook"></i></a> <a href="https://www.instagram.com/kwsaudiarabia"><i className="fab fa-instagram"></i></a> <a href="https://www.youtube.com/@KWSaudiArabia"><i className="fab fa-youtube"></i></a> <a href="https://www.linkedin.com/company/kwsaudiarabia/" aria-label="LinkedIn" ><i className="fab fa-linkedin"></i></a>
                </div>
              </div>

              {/* Copyright */}
              <p className="text-xs mx-2 text-gray-500 mt-3 text-center md:text-left">
                Copyright © 1998-2025 Keller Williams Realty, LLC <br />
                Keller Williams Realty, LLC, a franchise company, is an Equal Opportunity Employer 
                and supports the Fair Housing Act. Each Keller Williams® office is independently owned and operated.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="bg-gray-900 text-white p-6 md:hidden">
          {/* Menu Sections */}
          <div className="space-y-3">
            {["kw.com", "Company", "Services", "Search", "KW® Agents"].map((item) => (
              <div key={item}>
                <button
                  className="flex justify-between items-center w-full text-left font-medium text-lg"
                  onClick={() => toggleMenu(item)}
                >
                  {item}
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      open === item ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {open === item && (
                  <div className="pl-4 mt-2 text-gray-400 text-sm">
                    <p>Submenu item 1</p>
                    <p>Submenu item 2</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* App Store Buttons */}
          <div className="flex justify-center gap-4 my-6">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzWsBI54m-P2FWahQ6CCqfip421XnaOfb_w&s"
              alt="App Store"
              width={135}
              height={40}
              className="h-10 w-auto"
            />
            <Image
              src="/googlepl.png"
              alt="Google Play"
              width={135}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <hr className="border-gray-500 my-6" />

          {/* Social Icons */}
        

                {/* Social Icons */}
                <div className="flex justify-center space-x-4 text-xl">
                  
                <a href="https://www.snapchat.com/add/kwsaudiarabia?invite_id=uOPm-ny1&locale=en_SA%40calendar%3Dgregorian&share_id=AYEA3l8WSMqsIdDUTwPzow&sid=26f1fc0b18b4498197cf201797833561">
                <i className="fab fa-snapchat"></i></a>
                <a href="https://www.facebook.com/kellerwilliamssaudiarabia"><i className="fab fa-facebook"></i></a> <a href="https://www.instagram.com/kwsaudiarabia"><i className="fab fa-instagram"></i></a> <a href="https://www.youtube.com/@KWSaudiArabia"><i className="fab fa-youtube"></i></a> <a href="https://www.linkedin.com/company/kwsaudiarabia/" aria-label="LinkedIn" ><i className="fab fa-linkedin"></i></a>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-1 text-gray-400 text-xs mt-6">
            <a href="https://www.kwsaudiarabia.com/termsofuse">Terms of Use</a>
            <a href="https://www.kwsaudiarabia.com/privacypolicy">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">DMCA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}