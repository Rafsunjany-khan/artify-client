import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import app from "./firebaseConfig";
import axios from "axios";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const saveUserToDB = async (userData) => {
    const res = await axios.post(
      "https://artify-server-af6p.onrender.com/api/users",
      userData,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  };

  const saveGoogleUser = async (userData) => {
    const res = await axios.post(
      "https://artify-server-af6p.onrender.com/api/users/google",
      userData,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain an uppercase letter");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain a lowercase letter");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name || "No Name", photoURL: photoURL || "" });

      await saveUserToDB({
        uid: userCredential.user.uid,
        name: name || "No Name",
        email,
        photoURL: photoURL || "",
        isGoogleUser: false,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        name: user.displayName || "No Name",
        email: user.email,
        photoURL: user.photoURL || "",
        isGoogleUser: true,
      };

      await saveGoogleUser(userData);

      toast.success("Google sign-up successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-100 to-purple-200 pt-18">
      <div className="w-full flex justify-center items-center py-8 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input type="text" name="name" placeholder="Full Name" required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <input type="email" name="email" placeholder="Email" required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <input type="text" name="photo" placeholder="Photo URL" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <input type="password" name="password" placeholder="Password" required className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-500 transition">
              Register
            </button>
          </form>

          <div className="my-4 text-center text-gray-400">OR</div>

          <button onClick={handleGoogleSignup} className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400 transition">
            Continue with Google
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-purple-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
