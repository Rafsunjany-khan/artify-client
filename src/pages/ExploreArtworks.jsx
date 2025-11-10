import React, { useEffect, useState } from "react";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/artworks")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading artworks...</p>;
  }

  return (
    <section className="mt-16 py-8 px-20 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm">
              <img src={art.image} className="w-full h-60 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{art.title}</h3>
                <p className="text-gray-600 mb-1">Artist: {art.artist}</p>
                <p className="text-gray-500 mb-1">Category: {art.category}</p>
                <p className="text-gray-500 mb-4">Likes: {art.likes || 0}</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreArtworks;
