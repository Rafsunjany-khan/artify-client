import React from "react";
import {
         FaFacebookF, FaTwitter, FaGithub, FaYoutube, FaLinkedinIn,
         FaSkype, FaInstagram, FaPinterestP, FaTwitch, FaDiscord
         } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center md:items-start">

        <div className="flex-1 flex justify-center md:justify-start items-center mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer">Artify</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center mb-6 md:mb-0 text-center md:text-left space-y-1">
          <p>Email: info@artify.com</p>
          <p>Phone: +880 1701 983377</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="grid grid-cols-5 gap-3">
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaGithub />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaYoutube />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaLinkedinIn />
            </a>


            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaSkype />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaInstagram />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaPinterestP />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaTwitch />
            </a>
            <a href="#" className="bg-white text-black p-3 rounded-full flex justify-center items-center hover:bg-gray-200">
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-3 py-4 text-center">
        © 2025 Artify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;