import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../authentication/firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setDisplayName(firebaseUser.displayName || "");
        setPhotoURL(firebaseUser.photoURL || "");

        try {
          await axios.post(
            "https://artify-server-af6p.onrender.com/api/users/google",
            {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || "No Name",
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL || "",
              isGoogleUser: true,
            }
          );
        } catch (err) {
          console.error("Error syncing user to MongoDB:", err);
        }
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      await updateProfile(user, { displayName, photoURL });

      const res = await axios.put(
        "https://artify-server-af6p.onrender.com/api/users/update",
        {
          uid: user.uid,
          name: displayName,
          email: user.email,
          photoURL,
        }
      );

      toast.success(res?.data?.message || "Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to update profile. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <h2 className="text-2xl font-bold mb-4 text-purple-600">Profile</h2>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Name</label>
          <input type="text"
            className="border px-3 py-2 rounded focus:outline-purple-500"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Email</label>
          <input type="email"
            className="border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
            value={user?.email || ""}
            disabled />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700">Photo URL</label>
          <input type="text"
            className="border px-3 py-2 rounded focus:outline-purple-500"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)} />
        </div>

        {photoURL && (
          <img src={photoURL}
            className="w-24 h-24 object-cover rounded-full mx-auto" />
        )}

        <button
          type="submit"
          disabled={updating}
          className={`bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 transition ${
            updating ? "opacity-50 cursor-not-allowed" : ""
          }`} >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
