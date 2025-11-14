import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";


const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artistArtworksCount, setArtistArtworksCount] = useState(0);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/artworks/${id}`);
        setArtwork(res.data);

        const artistRes = await axios.get(
          `http://localhost:5000/api/artworks?email=${res.data.userEmail}`
        );
        setArtistArtworksCount(artistRes.data.length);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load artwork", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/artworks/${id}/like`,
        { userEmail: user.email }
      );
      setArtwork(res.data);
      toast.success("Artwork liked!", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to like artwork", { position: "top-center" });
    }
  };

  const handleFavorite = async () => {
    try {
      if (artwork.favorites.includes(user.email)) {
        toast.info("Already in favorites!", { position: "top-center" });
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/api/artworks/${id}/favorite`,
        { userEmail: user.email }
      );
      setArtwork(res.data);
      toast.success("Added to favorites!", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to favorites", { position: "top-center" });
    }
  };

  if (loading) return <Loader />;
  if (!artwork)
    return <p className="text-center mt-10 text-gray-500">Artwork not found</p>;

  return (
    <div className="min-h-screen w-full bg-gray-100 pt-24 pb-12 px-6 md:px-80 flex justify-center">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={artwork.image} className="w-full h-[500px] object-cover" />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-3">{artwork.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={artwork.userPhoto || "/default-avatar.png"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{artwork.userName}</p>
              <p className="text-gray-500 text-sm">{artistArtworksCount} artworks</p>
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Medium:</strong> {artwork.medium || "N/A"}
          </p>
          <p className="text-gray-600 mb-4">{artwork.description || "No description."}</p>
          <div className="grid grid-cols-2 gap-3 text-gray-600 mb-4">
            <p><strong>Category:</strong> {artwork.category}</p>
            {artwork.dimensions && <p><strong>Dimensions:</strong> {artwork.dimensions}</p>}
            {artwork.price && <p><strong>Price:</strong> ${artwork.price}</p>}
            <p><strong>Visibility:</strong> {artwork.visibility}</p>
            <p><strong>Likes:</strong> {artwork.likes?.length || 0}</p>
            <p><strong>Favorites:</strong> {artwork.favorites?.length || 0}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLike}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              Like
            </button>
            <button
              onClick={handleFavorite}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500">
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetails;
