import React, { useEffect } from "react"; // ✅ import useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExploreArtworks from "./pages/ExploreArtworks";
import ArtworkDetails from "./pages/ArtworkDetails";
import AddArtworks from "./pages/AddArtworks";
import Footer from "./components/Footer";
import app from "./authentication/firebaseConfig";
import Register from "./authentication/Register";

function App() {
  useEffect(() => {
    console.log("Firebase App Initialized:", app); // ✅ logs Firebase app
  }, []); // ✅ empty dependency array → runs once on mount

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<ExploreArtworks />} />
        <Route path="/artworks/:id" element={<ArtworkDetails />} />
        <Route path="/addArtwork" element={<AddArtworks />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
