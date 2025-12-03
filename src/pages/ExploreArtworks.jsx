import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { getAuth } from "firebase/auth";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

  const handleViewDetails = (id) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    window.location.href = `/artworks/${id}`;
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await axios.get("https://artify-server-af6p.onrender.com/api/artworks");
        const publicArtworks = res.data.filter((art) => art.visibility === "Public");
        setArtworks(publicArtworks);


        const uniqueCategories = [...new Set(publicArtworks.map(art => art.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  const filteredArtworks = artworks.filter(
    (art) =>
      (art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.artist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || art.category === selectedCategory)
  );

  if (loading) return <Loader />;

  return (
    <section className="mt-1 py-8 px-6 md:px-28 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Explore Artworks</h2>

        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-end">
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 border border-purple-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-48 border border-purple-300 p-2 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {filteredArtworks.length === 0 ? (
          <p className="text-center text-gray-500">No artworks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {filteredArtworks.map((art) => (
              <div
                key={art._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm"
              >
                <img src={art.image} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{art.title}</h3>
                  <p className="text-gray-600 mb-1">Artist: {art.artist}</p>
                  <p className="text-gray-500 mb-1">Category: {art.category}</p>
                  <p className="text-gray-500 mb-4">Likes: {art.likes ? art.likes.length : 0}</p>

                  <button
                    onClick={() => handleViewDetails(art._id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreArtworks;