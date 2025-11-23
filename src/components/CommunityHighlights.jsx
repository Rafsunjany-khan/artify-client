import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart } from "react-icons/fa";

const CommunityHighlights = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/artworks");
        const artworks = res.data;

        const popularArtworks = artworks
          .filter(art => Array.isArray(art.likes) && art.likes.length > 0)
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 3);

        setHighlights(popularArtworks);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load highlights", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  if (loading) return <Loader />;

  if (highlights.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        No highlighted artworks yet.
      </p>
    );
  }

  return (
    <section className="py-10 bg-white dark:bg-gray-800 transition-colors duration-500">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-2 transition-colors duration-500">
          Community Highlights
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6 transition-colors duration-500">
          Most loved artworks by the community
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {highlights.map((artwork) => (
            <div
              key={artwork._id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-colors duration-500 hover:shadow-2xl">
              <img src={artwork.image}
                className="w-full h-48 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-500">
                  {artwork.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1 transition-colors duration-500">
                  By: {artwork.artist}
                </p>
                <p className="text-purple-600 dark:text-purple-400 font-semibold transition-colors duration-500 flex items-center gap-2">
                    <FaHeart /> {artwork.likes.length} Likes
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
