import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const BASE_URL = "https://artify-server-af6p.onrender.com/api/artworks";

const MyGallery = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArtwork, setEditingArtwork] = useState(null);
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
    if (user?.email) {
      axios
        .get(`${BASE_URL}?email=${user.email}`)
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (art) => {
    setEditingArtwork(art);
    setFormData({
      title: art.title,
      artist: art.artist,
      category: art.category,
      image: art.image,
      description: art.description,
      medium: art.medium,
      dimensions: art.dimensions,
      year: art.year,
      price: art.price,
      visibility: art.visibility,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/${editingArtwork._id}`,
        { ...formData, userName: user.displayName, userEmail: user.email }
      );
      toast.success(res.data.message, { position: "top-center" });
      setEditingArtwork(null);
      setArtworks((prev) =>
        prev.map((art) => (art._id === editingArtwork._id ? res.data.artwork : art))
      );
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update artwork", {
        position: "top-center",
      });
    }
  };

// Delete functionality
const handleDelete = async (artId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this artwork?");
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(`${BASE_URL}/${artId}`);
    toast.success(res.data.message, { position: "top-center" });
    setArtworks((prev) => prev.filter((art) => art._id !== artId));
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to delete artwork", { position: "top-center" });
  }
};


  if (loading) return <Loader />;
  if (artworks.length === 0)
    return <p className="text-center mt-10 text-gray-500">You haven’t added any artworks yet.</p>;

  return (
    <section className="mt-1 py-8 px-6 md:px-28 bg-gray-100">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">My Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {artworks.map((art) => (
            <div key={art._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm">
              <img src={art.image} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{art.title}</h3>
                <p className="text-gray-600 mb-1">Category: {art.category}</p>
                <p className="text-gray-500 mb-4">Likes: {art.likes || 0}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEditClick(art)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(art._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500">
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>


        {editingArtwork && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-semibold mb-4 text-center text-purple-600">Edit Artwork</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Artwork Title"
                    className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required/>
                  <input type="text" name="artist" value={formData.artist} onChange={handleChange} placeholder="Artist Name"
                    className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    required/>
                </div>

                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category"
                  className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  required/>

                <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL"
                  className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  required/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="medium" value={formData.medium} onChange={handleChange} placeholder="Medium / Tools"
                    className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
                  <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="Dimensions"
                    className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year"
                    className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price"
                    className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>
                </div>

                <select name="visibility" value={formData.visibility} onChange={handleChange}
                  className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>

                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Description"
                  className="w-full border border-purple-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"/>

                <input type="text" value={user.displayName} readOnly
                  className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"/>
                <input type="email" value={user.email} readOnly
                  className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"/>

                <div className="flex justify-end gap-2 mt-4">
                  <button type="button"
                    onClick={() => setEditingArtwork(null)}
                    className="px-4 py-2 rounded border hover:bg-gray-200">
                    Cancel
                  </button>
                  <button type="submit"
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyGallery;
