import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const MyGallery = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/artworks?email=${user.email}`)
        .then((res) => {
          setArtworks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching artworks:", err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading your artworks...</p>
    );
  }

  if (artworks.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        You haven’t added any artworks yet.
      </p>
    );
  }

  return (
    <section className="mt-1 py-8 px-28 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">My Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm">
              <img src={art.image}
                className="w-full h-60 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{art.title}</h3>
                <p className="text-gray-600 mb-1">Category: {art.category}</p>
                <p className="text-gray-500 mb-4">Likes: {art.likes || 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyGallery;
