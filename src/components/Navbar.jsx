import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../authentication/firebaseConfig";

const auth = getAuth(app);

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const currentUser = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full bg-white shadow-md z-50 px-4 md:px-10 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-purple-600 cursor-pointer">Artify</div>

      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li className="hover:text-purple-500 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-purple-500 cursor-pointer">
          <Link to="/explore">Explore Artworks</Link>
        </li>

        {user && (
          <>
            <li className="hover:text-purple-500 cursor-pointer">
              <Link to="/addArtwork">Add Artwork</Link>
            </li>
            <li className="hover:text-purple-500 cursor-pointer">
              <Link to="/my-gallery">My Gallery</Link>
            </li>
            <li className="hover:text-purple-500 cursor-pointer">
              <Link to="/my-favorites">My Favorites</Link>
            </li>
          </>
        )}
      </ul>

      {user ? (
        <div className="relative" ref={dropdownRef}>
          <img src={user.photoURL || "https://via.placeholder.com/40"}
            className="w-10 h-10 object-cover rounded-full cursor-pointer border-2 border-purple-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}/>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-2 z-50 flex flex-col">
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-100 cursor-not-allowed mb-1">
                Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 text-sm font-medium">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
