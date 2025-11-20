import React from "react";
import {
  FaFacebookF, FaTwitter, FaGithub, FaYoutube, FaLinkedinIn,
  FaSkype, FaInstagram, FaPinterestP, FaTwitch, FaDiscord
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-6 py-10 w-full">

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
          <div className="grid grid-cols-5 gap-3 text-gray-700 dark:text-gray-300">
            <FaFacebookF />
            <FaTwitter />
            <FaGithub />
            <FaYoutube />
            <FaLinkedinIn />
            <FaSkype />
            <FaInstagram />
            <FaPinterestP />
            <FaTwitch />
            <FaDiscord />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 mt-3 py-4 text-center w-full">
        © 2025 Artify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
