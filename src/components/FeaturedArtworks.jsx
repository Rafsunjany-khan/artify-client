import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedArtworks = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/artworks?featured=true&limit=6")
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100 transition-colors duration-500">
          Featured Artworks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((art) => (
            <div
              key={art._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100 transition-colors duration-500">
                  {art.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-500">
                  Artist: {art.artist}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-500">
                  Category: {art.category}
                </p>
                <Link to={`/artworks/${art._id}`}>
                  <button className="bg-purple-600 dark:bg-purple-500 text-white dark:text-gray-100 px-4 py-2 rounded hover:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtworks;
