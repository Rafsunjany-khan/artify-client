import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import app from "./firebaseConfig";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;

    if (!/[A-Z]/.test(password)) return setError("Password must contain an uppercase letter");
    if (!/[a-z]/.test(password)) return setError("Password must contain a lowercase letter");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL });
      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      toast.success("Google Sign-up Successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-200 px-48 pt-20">
  <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Full Name" required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          <input type="email" name="email" placeholder="Email" required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          <input type="text" name="photo" placeholder="Photo URL" required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          <input type="password" name="password" placeholder="Password" required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit"
            className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-500 transition">
            Register
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">OR</div>

        <button onClick={handleGoogleSignup}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400 transition">
          Continue with Google
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
