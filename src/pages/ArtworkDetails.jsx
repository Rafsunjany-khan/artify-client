import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/artworks/${id}`);
        setArtwork(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading artwork details...</p>;
  }

  if (!artwork) {
    return <p className="text-center mt-10 text-gray-500">Artwork not found</p>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 pt-24 pb-12 px-80 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={artwork.image} className="w-full h-[500px] object-cover"/>

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-3">{artwork.title}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Artist:</strong> {artwork.artist || artwork.userName}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Medium:</strong> {artwork.medium || "N/A"}
          </p>
          <p className="text-gray-600 mb-4">
            {artwork.description || "No description available."}
          </p>

          <div className="grid grid-cols-2 gap-3 text-gray-600">
            <p><strong>Category:</strong> {artwork.category}</p>
            {artwork.dimensions && <p><strong>Dimensions:</strong> {artwork.dimensions}</p>}
            {artwork.price && <p><strong>Price:</strong> ${artwork.price}</p>}
            <p><strong>Visibility:</strong> {artwork.visibility}</p>
            <p><strong>Likes:</strong> {artwork.likes || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
