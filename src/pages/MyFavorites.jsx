import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const MyFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/artworks");
        const userFavorites = res.data.filter((art) =>
          art.favorites.includes(user.email)
        );
        setFavorites(userFavorites);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load favorites", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user.email]);

  const handleUnfavorite = async (artId) => {
    try {
      await axios.put(`http://localhost:5000/api/artworks/${artId}/favorite`, {
        userEmail: user.email,
      });
      setFavorites((prev) => prev.filter((art) => art._id !== artId));
      toast.success("Removed from favorites!", { position: "top-center" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove favorite", { position: "top-center" });
    }
  };

   if (loading) return <Loader />;


  if (favorites.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No favorite artworks yet.</p>;
  }

  return (
    <section className="mt-1 py-8 px-6 md:px-28 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">My Favorites</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {favorites.map((art) => (
            <div
              key={art._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm">
              <img src={art.image} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{art.title}</h3>
                <p className="text-gray-600 mb-1">Artist: {art.artist}</p>
                <p className="text-gray-500 mb-1">Category: {art.category}</p>
                <p className="text-gray-500 mb-4">Likes: {art.likes.length || 0}</p>
                <div className="flex gap-2">
                  <Link to={`/artworks/${art._id}`}>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleUnfavorite(art._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyFavorites;
