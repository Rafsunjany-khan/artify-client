import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";
import app from "../authentication/firebaseConfig";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const AddArtworks = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    category: "",
    image: "",
    description: "",
    medium: "",
    dimensions: "",
    year: "",
    price: "",
    visibility: "Public",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || "Anonymous",
          email: firebaseUser.email,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to add artwork!", { position: "top-center" });
      navigate("/login");
      return;
    }

    try {
      const updatedData = { ...formData, userName: user.displayName, userEmail: user.email };
      const res = await axios.post("http://localhost:5000/api/artworks", updatedData);
      toast.success(res.data.message, { position: "top-center" });

      setFormData({
        title: "",
        artist: "",
        category: "",
        image: "",
        description: "",
        medium: "",
        dimensions: "",
        year: "",
        price: "",
        visibility: "Public",
      });
    } catch (err) {
      console.error("POST Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to add artwork", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-purple-100 to-purple-50 dark:from-gray-800 dark:to-gray-900 flex justify-center items-start pt-24 transition-colors duration-500">
      <ToastContainer />

      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-400 mb-6 transition-colors duration-500">
          Add New Artwork
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" placeholder="Artwork Title" value={formData.title} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
            <input type="text" name="artist" placeholder="Artist Name" value={formData.artist} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
          </div>

          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />
          <input type="text" name="image" placeholder="Image URL (https://images.unsplash.com/photo-...)" value={formData.image} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="medium" placeholder="Medium / Tools" value={formData.medium} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            <input type="text" name="dimensions" placeholder="Dimensions" value={formData.dimensions} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          </div>

          <select name="visibility" value={formData.visibility} onChange={handleChange} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={4} className="w-full border border-purple-300 dark:border-purple-600 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />

          <input type="text" value={user?.displayName || ""} readOnly className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
          <input type="email" value={user?.email || ""} readOnly className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" />

          <button type="submit" className="w-full bg-purple-600 dark:bg-purple-500 text-white dark:text-gray-100 p-3 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300">
            Add Artwork
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArtworks;
