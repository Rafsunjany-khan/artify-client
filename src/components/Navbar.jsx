import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 px-4 md:px-10 py-4 flex justify-between items-center">

      <div className="text-2xl font-bold text-purple-600 cursor-pointer"> Artify </div>

      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li className="hover:text-purple-500 cursor-pointer"><Link to="/">Home</Link></li>
        <li className="hover:text-purple-500 cursor-pointer"><Link to="/explore">Explore Artworks</Link></li>
        <li className="hover:text-purple-500 cursor-pointer"><Link to="/addArtwork">Add Artwork</Link></li>
        <li className="hover:text-purple-500 cursor-pointer">My Gallery</li>
        <li className="hover:text-purple-500 cursor-pointer">My Favorites</li>
      </ul>

      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 text-sm font-medium">
        Login
      </button>

    </nav>
  );
};

export default Navbar;
