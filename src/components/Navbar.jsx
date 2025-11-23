import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../authentication/firebaseConfig";
import { ThemeContext } from "../context/ThemeContext";

const auth = getAuth(app);

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });
      } else setUser(null);
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
      console.error(err);
    }
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md z-50 px-4 md:px-10 py-4 flex justify-between items-center transition-colors duration-500">
      <div className="text-2xl font-bold text-purple-600 cursor-pointer">Artify</div>

      <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200 font-medium items-center">
        <li><Link to="/" className="hover:text-purple-500">Home</Link></li>
        <li><Link to="/explore" className="hover:text-purple-500">Explore Artworks</Link></li>
        {user && (
          <>
            <li><Link to="/addArtwork" className="hover:text-purple-500">Add Artwork</Link></li>
            <li><Link to="/my-gallery" className="hover:text-purple-500">My Gallery</Link></li>
            <li><Link to="/my-favorites" className="hover:text-purple-500">My Favorites</Link></li>
          </>
        )}
        <li>
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </li>
      </ul>

      {user ? (
        <div className="relative ml-4" ref={dropdownRef}>
          <img
            src={user.photoURL || "https://via.placeholder.com/40"}
            className="w-10 h-10 object-cover rounded-full cursor-pointer border-2 border-purple-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border rounded shadow-lg py-2 z-50 flex flex-col">
              <button onClick={() => navigate("/profile")} className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-600 text-left mb-1">
                Profile
              </button>
              <button onClick={handleLogout} className="w-full text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2">
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 text-sm font-medium">
            Login / Register
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
